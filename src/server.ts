import 'reflect-metadata';

import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import requestLogger from './middleware/request-logger.middleware';
import Logging from './library/Logging';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorHandlerMiddleware from './middleware/error-handler..middleware';
import { DataBase } from './db/DataBase';

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
        await establishDatabaseConnection();
        server.listen(port, () => {
            Logging.info("Server is listening on port: " + port + "...");
        });
    } catch (error) {
        Logging.error(error);
    }
}

start();


async function establishDatabaseConnection() {
    const url = getDatabaseUrl();
    const db: DataBase = new DataBase(url);
    await db.connect();
    Logging.info("Database connection established");
}

function getDatabaseUrl() {
    const url = process.env.LOCAL_MONGO_URI;
    if (url === undefined) {
        throw new Error("url for database connection is undefined!");
    }
    return url;
}
