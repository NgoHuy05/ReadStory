import express from "express";
import { createStoryCategory, deleteStoryCategory, getListStoryCategory } from "../controllers/storyCategoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/list', getListStoryCategory);

router.post('/create', createStoryCategory);

router.delete('/delete/:storyId/:categoryId', authMiddleware, deleteStoryCategory);

export default router;