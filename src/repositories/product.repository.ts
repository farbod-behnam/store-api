import "express-async-errors";
import mongoose, { Schema } from "mongoose";

import { Service } from "typedi";
import { CompanyName } from "../enums/product.enum";
import { Product } from "../models/product.model";
import { Repository } from "./repository.interface";


const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: [true, "product name must be provided"],
    },
    price: {
        type: Number,
        required: [true, "product price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        // enum: Object.values(CompanyName),
        enum: {
            values: Object.values(CompanyName),
            message: "{VALUE} is not supported",
        },
    },
});

const ProductModel = mongoose.model<Product>("Product", ProductSchema);


@Service()
export class ProductRepository implements Repository<Product> {

    async getAll(): Promise<Product[] | Error> {
        throw new Error("Method not implemented.");
        ProductModel.create();
    }

}