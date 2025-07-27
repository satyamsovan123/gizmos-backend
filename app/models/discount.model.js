import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

discountSchema.plugin(mongoosePaginate);
const Discount = mongoose.model("Discount", discountSchema);

export { Discount };
