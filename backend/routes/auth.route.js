import express from "express";
const router = express.Router();
import { RefreshToken, SignIn, SignOut, SignUp } from "../controllers/authController.js";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware.js";

router.post('/sign-up', SignUp);
router.post('/sign-in', rateLimitMiddleware, SignIn);
router.post('/sign-out', SignOut);
router.post('/refresh-token', RefreshToken);

export default router;