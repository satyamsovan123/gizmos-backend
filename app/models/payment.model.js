import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

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
const Payment = mongoose.model("Payment", paymentSchema);

export { Payment };
