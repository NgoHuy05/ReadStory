import express from "express";
import { deleteUser, getListUser, getProfile, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.get('/me', authMiddleware ,getProfile);
router.get('/list-user', authMiddleware, roleMiddleware(["admin"]) ,getListUser);
router.post('/update', authMiddleware, updateProfile);
router.post('delete', authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;