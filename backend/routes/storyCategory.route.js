import express from "express";
import { createStoryCategory, deleteStoryCategory } from "../controllers/storyCategoryController.js";
const router = express.Router();

router.post('/create', createStoryCategory);
router.post('/delete', deleteStoryCategory);

export default router;