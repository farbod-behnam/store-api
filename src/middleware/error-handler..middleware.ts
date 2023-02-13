import { NextFunction, Request, Response } from "express"
import Logging from "../library/Logging"

export default async function errorHandlerMiddleware (err: Error, req: Request, res: Response, next: NextFunction)  {
  Logging.log(err);
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

