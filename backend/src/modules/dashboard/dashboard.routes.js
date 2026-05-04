import express from "express";
import { getDashboard } from "./dashboard.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { requireMember } from "../../middleware/project.middleware.js";

const router = express.Router();

router.get("/:projectId", auth, requireMember, getDashboard);

export default router;