import mongoose from "mongoose";


const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
}, { timestamps: true });

const History = mongoose.model('History', historySchema);
export default History;