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
