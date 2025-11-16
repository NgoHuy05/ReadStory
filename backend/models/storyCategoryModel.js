import mongoose from "mongoose";

const storyCategorySchema = new mongoose.Schema({
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

const StoryCategory = mongoose.model('StoryCategory', storyCategorySchema);
export default StoryCategory;