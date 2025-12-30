import express from "express";
import { createHistory, deleteHistory } from "../controllers/historyController.js";
const router = express.Router();

router.post('/create', createHistory);
router.delete('/delete/:storyId/:chapterId', deleteHistory);


export default router;