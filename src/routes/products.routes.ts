import express, { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ProductsController } from "../controllers/products.controller";

const productsRouter = express.Router();

const productsController = Container.get(ProductsController);

productsRouter.get("/static", (req: Request, res: Response, next: NextFunction) => productsController.getAllProductsStatic(req, res, next));
productsRouter.get("/", (req: Request, res: Response) => productsController.getAllProducts(req, res));

export default productsRouter;
