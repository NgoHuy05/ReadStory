import express from "express";
import { createBookmark, deleteBookmark } from "../controllers/bookmarkController.js";
const router = express.Router();

router.post('/create', createBookmark);
router.post('/delete', deleteBookmark);


export default router;