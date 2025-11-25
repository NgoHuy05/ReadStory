import express from "express";
import { createStory, deleteStory, getDetailStory, getListStory, getListStoryHot, getListStoryNew, getListStoryRecommend, getListStorySort } from "../controllers/storyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/list', getListStory);
router.get('/list/new', getListStoryNew);
router.get('/list/hot', getListStoryHot);
router.get('/list/recommend', getListStoryRecommend);
router.get('/list/sort/:slugCategory', getListStorySort);
router.get('/:slug', getDetailStory);
router.post('/create', authMiddleware, createStory);
router.post('/delete', authMiddleware, deleteStory);

export default router;