import express from "express";
import { createStory, deleteStory, getDetailStory, getListStory } from "../controllers/storyController.js";
const router = express.Router();

router.get('/list', getListStory);
router.get('/:slug', getDetailStory);
router.post('/create', createStory);
router.post('/delete', deleteStory);

export default router;