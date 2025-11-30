import express from "express";
import { createStory, deleteStory, getDetailStory, getListStory, getListStoryHot, getListStoryNew, getListStoryRecommend, getListStorySort, searchStory } from "../controllers/storyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.get("/search", searchStory);

router.get('/list', getListStory);
router.get('/list/new', getListStoryNew);
router.get('/list/hot', getListStoryHot);
router.get('/list/recommend', getListStoryRecommend);
router.get('/list/sort/:slugCategory', getListStorySort);
router.get('/detail/:slug', getDetailStory);
router.post('/create', authMiddleware, upload.single('bannerImage'), createStory);
router.post('/delete', authMiddleware, deleteStory);

export default router;