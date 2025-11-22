import express from "express";
import { createComment, deleteComment, getListCommentByChapter, getListCommentByStory } from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/list/chapter/:chapterId', getListCommentByChapter),
router.get('/list/story/:storyId', getListCommentByStory),

router.post('/create', authMiddleware, createComment);
router.post('/delete', authMiddleware, deleteComment);


export default router;