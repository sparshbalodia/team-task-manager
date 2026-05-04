import * as service from "./user.service.js";

export const getMe = async (req, res, next) => {
  try {
    const user = await service.getMe(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers =async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};