import express from "express";
import * as ctrl from "./task.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { requireMember } from "../../middleware/project.middleware.js";

const router = express.Router();

router.post("/", auth, requireMember, ctrl.createTask);
router.get("/", auth, requireMember, ctrl.getTasks);
router.patch("/:id", auth, ctrl.updateTask);

export default router;