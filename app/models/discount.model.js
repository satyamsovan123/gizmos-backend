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
