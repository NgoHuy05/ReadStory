import express from "express";
import { createComment, deleteComment } from "../controllers/commentController.js";
const router = express.Router();

router.post('/create', createComment);
router.post('/delete', deleteComment);


export default router;