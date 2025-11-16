import express from "express";
import { createCategory, deleteCategory, getListCategory, updateCategory } from "../controllers/categoryController.js";
const router = express.Router();

router.get('/list', getListCategory);
router.post('/create', createCategory);
router.post('/delete', deleteCategory);
router.post('/update', updateCategory);

export default router;