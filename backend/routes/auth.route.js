import express from "express";
const router = express.Router();
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfile, Login, Logout, RefreshToken, Register } from "../controllers/authController.js";

router.get('/me', authMiddleware, getProfile);

router.post('/register', Register);
router.post('/login', rateLimitMiddleware, Login);
router.post('/logout', Logout);
router.post('/refreshtoken', RefreshToken);

export default router;