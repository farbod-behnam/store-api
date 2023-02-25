import 'reflect-metadata';
import "express-async-errors";

import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import requestLogger from './middleware/request-logger.middleware';
import Logger from './library/Logging';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorHandlerMiddleware from './middleware/error-handler..middleware';
import { DataBase } from './db/DataBase';

import productsRouter from './routes/products.routes';

// async errors


const server = express();

// middleware
server.use(requestLogger);
server.use(express.json());

// routes

server.get("/", (req: Request, res: Response) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products' >products route</a>")
})

server.use("/api/v1/products", productsRouter);


server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

dotenv.config();

const start = async () => {
    try {
        const port = process.env.PORT || 5000;
        // connect DB
        // await establishDatabaseConnection();
        const url = getDatabaseUrl();
        const db = new DataBase(url);
        await db.establishDatabaseConnection();
        server.listen(port, () => {
            Logger.info("Server is listening on port: " + port + "...");
        });
    } catch (error) {
        Logger.error(error);
    }
}

start();


function getDatabaseUrl() {
    const url = process.env.LOCAL_MONGO_URI;
    if (url === undefined) {
        throw new Error("url for database connection is undefined!");
    }
    return url;
}
