import { NextFunction, Request, Response } from "express";
import Logger from "../library/Logging";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
    Logger.info(req.method + " " + req.url);
    next();
}