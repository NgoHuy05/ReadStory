import express from "express";
const router = express.Router();
import { SignUp } from "../controllers/authController.js";

// signUp
router.post('/sign-up', SignUp);

export default router;