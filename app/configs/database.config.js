import mongoose from "mongoose";

async function connectToDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
}

export { connectToDatabase };
