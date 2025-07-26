import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class DiscountModel {
  static modelName = "Discount";
  constructor() {}

  static getSchema() {
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
    return discountSchema;
  }

  static getModel() {
    if (mongoose.models[this.modelName]) {
      return mongoose.models[this.modelName];
    }
    return mongoose.model(this.modelName, this.getSchema());
  }
}

const Discount = DiscountModel.getModel();

export { Discount };
