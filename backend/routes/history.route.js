import express from "express";
import { createHistory, deleteHistory } from "../controllers/historyController.js";
const router = express.Router();

router.post('/create', createHistory);
router.post('/delete', deleteHistory);


export default router;