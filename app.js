import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
  MetaInfo,
} from "pg-sdk-node";
import { randomUUID } from "crypto";

const availableShopItems = [
  {
    itemId: 1,
    name: "Phone Pro",
    priceInRupees: 120000,
    availableQuantity: 10,
    purchaseType: "one-time",
  },
  {
    itemId: 2,
    name: "Laptop Pro",
    priceInRupees: 200000,
    availableQuantity: 5,
    purchaseType: "one-time",
  },
  {
    itemId: 3,
    name: "Watch Ultra",
    priceInRupees: 90000,
    availableQuantity: 8,
    purchaseType: "one-time",
  },
  {
    itemId: 4,
    name: "Tablet Pro",
    priceInRupees: 100000,
    availableQuantity: 12,
    purchaseType: "one-time",
  },
  {
    itemId: 5,
    name: "Desktop Mini",
    priceInRupees: 50000,
    availableQuantity: 7,
    purchaseType: "one-time",
  },
  {
    itemId: 6,
    name: "Care Plan",
    priceInRupees: 2000,
    availableQuantity: 10000,
    purchaseType: "subscription",
  },
];

dotenv.config();
const app = express();
const clientId = process.env.PHONE_PE_MERCHANT_ID;
const clientSecret = process.env.PHONE_PE_API_KEY;
const clientVersion = 1;
const env = Env.SANDBOX;

const checkoutClient = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

app.use(cors());
app.use(express.json());

app.get("/api/v1", async (request, response, next) => {
  try {
    return response.json({ message: "Welcome!" });
  } catch (error) {
    error.message =
      error.message ||
      "Some error occured for base route. Please try again later.";
    return next(error);
  }
});

app.post("/api/v1/order", async (request, response, next) => {
  try {
    /** -------------- Validations -------------- */

    const askedItem = request?.body?.itemName;
    const itemQuantity = request?.body?.itemQuantity;

    if (!askedItem) {
      const error = new Error("Sorry, this item is not available.");
      error.status = 400;
      throw error;
    }

    if (!itemQuantity || itemQuantity <= 0) {
      const error = new Error("Please provide a valid item quantity.");
      error.status = 400;
      throw error;
    }

    const requestedItem = availableShopItems.filter((item) => {
      return item.name === askedItem;
    });

    if (
      requestedItem.length === 0 ||
      requestedItem[0]?.availableQuantity === 0
    ) {
      const error = new Error("Sorry, this item is not available.");
      error.status = 400;
      throw error;
    }

    if (requestedItem[0]?.availableQuantity < itemQuantity) {
      const error = new Error(
        `Sorry, we only have ${requestedItem[0].availableQuantity} ${askedItem} available.`
      );
      error.status = 400;
      throw error;
    }

    const amountInPaisa = requestedItem[0].priceInRupees * itemQuantity * 100; // Convert to Rupees (1 Rupee = 100 Paise)

    /** ------------------------------------------- */

    /** -------------- Process Order -------------- */

    const merchantOrderId = randomUUID();
    const redirectUrl =
      "http://localhost:3000/api/v1/order/success?merchantOrderId=" +
      encodeURIComponent(merchantOrderId);

    const orderMetaData = MetaInfo.builder()
      .udf1(
        JSON.stringify({
          createdAt: new Date().toISOString(),
          itemId: requestedItem[0].itemId,
        })
      ) // UDF is User Defined Field LOL!
      .build();
    const createdOrder = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amountInPaisa)
      .redirectUrl(redirectUrl)
      .metaInfo(orderMetaData)
      .build();

    const clientPaymentPageDetails = await checkoutClient.pay(createdOrder);

    /** ------------------------------------------- */

    return response.json({
      message: "Order processed successfully.",
      clientPaymentPageDetails: clientPaymentPageDetails,
    });
  } catch (error) {
    error.message =
      error.message ||
      "Some error occured while processing order. Please try again later.";
    return next(error);
  }
});

app.get("/api/v1/order/success/", async (request, response, next) => {
  try {
    /** -------------- Validations -------------- */

    const merchantOrderId = request.query?.merchantOrderId;
    if (!merchantOrderId) {
      const error = new Error("Please provide a valid Merchant Order ID.");
      error.status = 400;
      throw error;
    }

    const orderStatus = await checkoutClient.getOrderStatus(merchantOrderId);
    if (!orderStatus) {
      const error = new Error(
        "Order not found or invalid. Please try again later."
      );
      error.status = 400;
      throw error;
    }
    if (orderStatus.state !== "COMPLETED") {
      const error = new Error(
        `Order is not completed. It is currently in ${orderStatus.state} state. Please try again later.`
      );
      error.status = 400;
      throw error;
    }

    const parsedMetaDataInfo = JSON.parse(orderStatus.metaInfo?.udf1);

    /** ------------------------------------------- */

    /** -------------- Updated Database -------------- */

    const orderDetails = {
      merchantOrderId: merchantOrderId,
      orderId: orderStatus.orderId,
      amountInPaisa: orderStatus.amount,
      state: orderStatus.state,
      createdAt: parsedMetaDataInfo?.createdAt,
      itemId: parsedMetaDataInfo?.itemId,
    };

    /** ------------------------------------------- */

    return response.json({
      message: "Order created successfully.",
    });
  } catch (error) {
    error.message =
      error.message ||
      "Some error occured while creating order. Please try again later.";
    return next(error);
  }
});

app.use(async (error, request, response, next) => {
  console.error(error.stack);
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Something went wrong. Please try again later.",
    },
  });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
