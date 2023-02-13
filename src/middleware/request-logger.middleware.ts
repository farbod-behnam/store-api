import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
    Logging.info(req.method + " " + req.url);
    next();
}