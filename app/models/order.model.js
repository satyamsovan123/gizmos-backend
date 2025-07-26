import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class OrderModel {
  static modelName = "Order";
  constructor() {}

  static getSchema() {
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
    orderSchema.index({ user: 1 });
    return orderSchema;
  }

  static getModel() {
    if (mongoose.models[this.modelName]) {
      return mongoose.models[this.modelName];
    }
    return mongoose.model(this.modelName, this.getSchema());
  }
}

const Order = OrderModel.getModel();

export { Order };
