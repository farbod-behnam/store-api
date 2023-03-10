import { NextFunction, Request, Response } from "express"
import Logger from "../util/Logger"

export default async function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  Logger.error(err);
  return res.status(500).json({ msg: err });
}


