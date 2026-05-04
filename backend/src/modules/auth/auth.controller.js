import * as service from "./auth.service.js";
import { signupSchema, loginSchema } from "./auth.validation.js";

export const signup = async (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);
    res.json(await service.signup(data));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    res.json(await service.login(data));
  } catch (err) {
    next(err);
  }
};