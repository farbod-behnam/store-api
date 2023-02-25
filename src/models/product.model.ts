import mongoose from "mongoose";

export interface Product extends mongoose.Document {
    name: string,
    price: number,
    featured: boolean,
    rating: number
    createdAt: Date
    company: string
}