import * as service from "./task.service.js";
import {
  createTaskSchema,
  updateTaskSchema
} from "./task.validation.js";

export const createTask = async (req, res, next) => {
  try {
    const data = createTaskSchema.parse(req.body);
    res.json(await service.createTask(data, req.user.userId));
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const data = updateTaskSchema.parse(req.body);
    res.json(
      await service.updateTask(req.params.id, req.user.userId, data)
    );
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    res.json(await service.getTasks(req.query.projectId));
  } catch (err) {
    next(err);
  }
};