import mongoose from "mongoose";

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

}


