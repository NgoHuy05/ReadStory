import express from "express";
import { deleteUser, getListUser, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.get('/list', authMiddleware, roleMiddleware(["admin"]) ,getListUser);

router.post('/update', authMiddleware, updateProfile);

router.delete('/delete/:userId', authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;