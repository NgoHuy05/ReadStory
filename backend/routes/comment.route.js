import express from "express";
import { createComment, deleteComment, getListCommentByChapter, getListCommentByStory } from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/list/chapter/:slugChapter', getListCommentByChapter);
router.get('/list/story/:slugStory', getListCommentByStory);

router.post('/create', authMiddleware, createComment);
router.delete('/delete/:commentId', authMiddleware, deleteComment);

export default router;
