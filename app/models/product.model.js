import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class ProductModel {
  static modelName = "Product";
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
    productSchema.index({ purchaseType: 1 });
    return productSchema;
  }

  static getModel() {
    if (mongoose.models[this.modelName]) {
      return mongoose.models[this.modelName];
    }
    return mongoose.model(this.modelName, this.getSchema());
  }
}

const Product = ProductModel.getModel();

export { Product };
