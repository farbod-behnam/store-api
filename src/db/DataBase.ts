import mongoose from "mongoose";

export class DataBase {

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

}


