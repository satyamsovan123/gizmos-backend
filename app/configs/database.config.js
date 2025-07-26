import mongoose from "mongoose";
class DatabaseConfig {
  constructor(databaseUrl) {
    this.databaseUrl = databaseUrl;
  }

  async connect() {
    try {
      if (!this.databaseUrl) {
        throw new Error("Database URL is not defined");
      }
      await mongoose.connect(this.databaseUrl);
    } catch (error) {
      throw error;
    }
  }
}

export { DatabaseConfig };
