import express from "express";
import { getMe, getUsers } from "./user.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", auth, getMe);
router.get("/", auth, getUsers);

export default router;