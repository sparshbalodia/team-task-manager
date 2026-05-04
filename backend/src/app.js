import express from "express";
import cors from "cors";

import auth from "./modules/auth/auth.routes.js";
import project from "./modules/project/project.routes.js";
import task from "./modules/task/task.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import dashboard from "./modules/dashboard/dashboard.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/projects", project);
app.use("/api/tasks", task);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboard);

app.use(errorHandler);

export default app;