import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class ProductModel {
  constructor() {}

  static getSchema() {
    const productSchema = new Schema(
      {
        name: {
          unique: true,
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
        },
        stock: {
          type: Number,
          required: true,
        },
        images: {
          type: [String],
        },
        purchaseType: {
          type: String,
          enum: ["one-time", "subscription"],
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    productSchema.plugin(mongoosePaginate);
    productSchema.index({ name: 1 });
    return productSchema;
  }

  static getModel(modelName) {
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    return mongoose.model(modelName, this.getSchema());
  }
}

const Product = ProductModel.getModel();

export { Product };
