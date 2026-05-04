import express from "express";
import * as ctrl from "./project.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { requireMember } from "../../middleware/project.middleware.js";
import { requireAdmin } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/", auth, ctrl.createProject);
router.get("/", auth, ctrl.getProjects);

router.post(
  "/:projectId/add-member",
  auth,
  requireMember,
  requireAdmin,
  ctrl.addMember
);

export default router;