import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", orderSchema);

export { Order };
