import express from "express";
import { deleteUser, getListUser, getProfile, updateProfile } from "../controllers/userController.js";
const router = express.Router();

router.get('/me', getProfile);
router.get('/list-user', getListUser);
router.post('/update', updateProfile);
router.post('delete', deleteUser);

export default router;