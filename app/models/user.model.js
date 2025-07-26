import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

class UserModel {
  static modelName = "User";
  constructor() {}

  static getSchema() {
    const userSchema = new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ["user", "admin"],
          default: "user",
        },
        refreshToken: {
          type: String,
          default: "",
        },
      },
      {
        timestamps: true,
      }
    );

    userSchema.plugin(mongoosePaginate);
    return userSchema;
  }

  static getModel() {
    if (mongoose.models[this.modelName]) {
      return mongoose.models[this.modelName];
    }
    return mongoose.model(this.modelName, this.getSchema());
  }
}

const User = UserModel.getModel();

export { User };
