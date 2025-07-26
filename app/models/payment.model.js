import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class PaymentModel {
  constructor() {}

  static getSchema() {
    const paymentSchema = new Schema(
      {
        amount: { type: Number, required: true, min: 0 },
        status: {
          type: String,
          enum: ["pending", "completed", "failed"],
          default: "pending",
        },
        transactionId: { type: String, required: true, unique: true },
        order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
      },
      {
        timestamps: true,
      }
    );

    paymentSchema.plugin(mongoosePaginate);
    paymentSchema.index({ order: 1 });
    return paymentSchema;
  }

  static getModel(modelName) {
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    return mongoose.model(modelName, this.getSchema());
  }
}

const Payment = PaymentModel.getModel("Payment");

export { Payment };
