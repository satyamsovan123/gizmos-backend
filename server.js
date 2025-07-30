import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./app/configs/index.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
};

startServer();
