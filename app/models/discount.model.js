import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class DiscountModel {
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
    discountSchema.index({ code: 1 });
    discountSchema.plugin(mongoosePaginate);
    return discountSchema;
  }

  static getModel(modelName) {
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    return mongoose.model(modelName, this.getSchema());
  }
}

const Discount = DiscountModel.getModel("Discount");

export { Discount };
