import mongoose from "mongoose";
import { slugMiddleware } from "../middlewares/slugMiddleware.js";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true },
}, { timestamps: true });

slugMiddleware(categorySchema, "name");

const Category = mongoose.model('Category', categorySchema);
export default Category;