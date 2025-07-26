import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class CartModel {
  constructor() {}

  static getSchema() {
    const cartSchema = new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        items: {
          type: [
            {
              product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
              },
              quantity: { type: Number, required: true, min: 1 },
            },
          ],
          default: [],
        },
        status: {
          type: String,
          enum: ["active", "ordered", "inactive"],
          default: "active",
          index: true,
        },
      },
      {
        timestamps: true,
      }
    );

    cartSchema.plugin(mongoosePaginate);
    cartSchema.index({ user: 1 });
    return cartSchema;
  }

  static getModel(modelName) {
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    return mongoose.model(modelName, this.getSchema());
  }
}

const Cart = CartModel.getModel("Cart");

export { Cart };
