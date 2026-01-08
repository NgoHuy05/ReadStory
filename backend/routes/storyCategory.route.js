import express from "express";
import { createStoryCategory, deleteStoryCategory, getListStoryCategory, getListStoryCategoryBySlugCategory } from "../controllers/storyCategoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/list', getListStoryCategory);
router.get('/listStory/:slugCategory', getListStoryCategoryBySlugCategory);

router.post('/create', createStoryCategory);

router.delete('/delete/:storyId/:categoryId', authMiddleware, deleteStoryCategory);

export default router;