import prisma from "../../prisma/client.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";

export const signup = async (data) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("User exists");

  const hashed = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: { ...data, password: hashed }
  });
};

export const login = async (data) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return { token: generateToken(user.id) };
};