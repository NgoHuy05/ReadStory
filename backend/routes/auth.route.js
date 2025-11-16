import express from "express";
const router = express.Router();
import { SignIn, SignOut, SignUp } from "../controllers/authController.js";

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);
router.post('/sign-out', SignOut);


export default router;