import mongoose from "mongoose";
import dotenv from "dotenv";
import Logger from "../util/Logger";

export class DatabaseConnection {

  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    return mongoose.connect(this.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }

  async establishDatabaseConnection() {
    try {
      await this.connect();
      Logger.info("Database connection established");
    } catch (error) {
      throw error;
    }
  }

  getDatabaseUrl() {

    dotenv.config();
    const url = process.env.LOCAL_MONGO_URI;
    if (url === undefined) {
      throw new Error("url for database connection is undefined!");
    }
    return url;

  }

}


