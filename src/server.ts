import 'reflect-metadata';

import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import requestLogger from './middleware/request-logger.middleware';
import Logging from './library/Logging';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorHandlerMiddleware from './middleware/error-handler..middleware';

// async errors


const server = express();

// middleware
server.use(requestLogger);
server.use(express.json());

// routes

server.get("/", (req: Request, res: Response) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products' >products route</a>")
})

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

dotenv.config();

const start = async () => {
    try {
        const port = process.env.PORT || 5000;
        // connect DB
        server.listen(port, () => {
            Logging.info("Server is listening on port: " + port);
        });
    } catch (error) {
        Logging.error(error);
    }
}

start();

