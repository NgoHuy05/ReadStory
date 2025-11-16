import mongoose from "mongoose";
import { slugMiddleware } from "../middlewares/slugMiddleware.js";

const chapterSchema = new mongoose.Schema({
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    viewsNumber: { type: Number, default: 0 },
    commentsNumber: { type: Number, default: 0 },
}, { timestamps: true });

slugMiddleware(chapterSchema, "title");

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;