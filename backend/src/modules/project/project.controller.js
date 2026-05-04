import * as service from "./project.service.js";

export const createProject = async (req, res, next) => {
  try {
    res.json(await service.createProject(req.user.userId, req.body.name));
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    res.json(await service.getProjects(req.user.userId));
  } catch (err) {
    next(err);
  }
};

export const addMember = async (req, res, next) => {
  try {
    res.json(await service.addMember(req.params.projectId, req.body.userId));
  } catch (err) {
    next(err);
  }
};