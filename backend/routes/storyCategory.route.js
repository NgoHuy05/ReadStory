import express from "express";
import { createStoryCategory, deleteStoryCategory, getListStoryCategory } from "../controllers/storyCategoryController.js";
const router = express.Router();

router.get('/list', getListStoryCategory);
router.post('/create', createStoryCategory);
router.post('/delete', deleteStoryCategory);

export default router;