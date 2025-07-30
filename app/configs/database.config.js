import mongoose from "mongoose";

/**
 * Establishes the initial connection to the MongoDB database using Mongoose.
 *
 * This function uses the `DATABASE_URL` from the environment variables.
 * If the initial connection fails, it logs the error to the console and
 * terminates the application process with an exit code of 1.
 *
 * @async
 * @function connectToDatabase
 * @returns {Promise<void>} A promise that resolves if the connection is successful.
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    throw new Error(`Failed to connect to the database: ${error.message}`);
  }
}

export { connectToDatabase };
