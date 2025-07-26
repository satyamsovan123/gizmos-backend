import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class CartModel {
  static modelName = "Cart";
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

  static getModel() {
    if (mongoose.models[this.modelName]) {
      return mongoose.models[this.modelName];
    }
    return mongoose.model(this.modelName, this.getSchema());
  }
}

const Cart = CartModel.getModel();

export { Cart };
