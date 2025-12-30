import express from "express";
import { createChapter, deleteChapter, getDetailChapter, getListChapterByStory } from "../controllers/chapterController.js";
const router = express.Router();

router.get('/list/:slugStory', getListChapterByStory);
router.get('/detail/:slugChapter', getDetailChapter);

router.post('/create', createChapter);

router.delete('/delete/:chapterId', deleteChapter);


export default router;