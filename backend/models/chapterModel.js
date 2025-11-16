import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    viewsNumber: { type: Number, default: 0 },
    commentsNumber: { type: Number, default: 0 },
}, { timestamps: true });

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;