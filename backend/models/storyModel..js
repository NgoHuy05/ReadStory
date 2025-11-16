import mongoose from "mongoose";
import { slugMiddleware } from "../middlewares/slugMiddleware.js";

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    author: { type: String },
    viewsCount: { type: Number, default: 0 },
    followsCount: { type: Number, default: 0 },
    totalChapters: { type: Number, default: 0 },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    
}, { timestamps: true });

slugMiddleware(storySchema, "title");

const Story = mongoose.model('Story', storySchema);
export default Story;