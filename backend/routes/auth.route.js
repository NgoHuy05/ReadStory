import express from "express";
const router = express.Router();
import { getProfile, RefreshToken, SignIn, SignOut, SignUp } from "../controllers/authController.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.get('/me', authMiddleware, getProfile);

router.post('/register', SignUp);
router.post('/login', rateLimitMiddleware, SignIn);
router.post('/logout', SignOut);
router.post('/refreshtoken', RefreshToken);

export default router;