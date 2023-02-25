import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";
import { Repository } from "../repositories/repository.interface";

@Service()
export class ProductsController {
  @Inject(() => ProductRepository)
  private readonly productRepository!: Repository<Product>;

  constructor(productRepository: Repository<Product>) {
    this.productRepository = productRepository;
  }

  async getAllProductsStatic(req: Request, res: Response, next: NextFunction) {
    /**
     * the productRepository.getAll() method is not implemented, therefore it throws an error.
     * However, using "express-async-errors" at the top of server.ts file does not fully solve the problem.
     * The only solution is to use the next() method like this => return next(error) in controller to allow
     * the middleware to handle it.
     */
    await this.productRepository.getAll();
    // throw new Error("testing async erros");
    // const error = new Error("testing async erros");
    // return next(error);
    res.status(200).json("All Static Products");
  }

  async getAllProducts(req: Request, res: Response) {
    res.status(200).json("All Products");
  }
}
