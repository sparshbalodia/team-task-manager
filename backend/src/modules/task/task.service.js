import prisma from "../../prisma/client.js";

export const createTask = async (data, userId) => {
  const member = await prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId: data.assignedTo,
        projectId: data.projectId
      }
    }
  });

  if (!member) throw new Error("User not in project");

  return prisma.task.create({
    data: {
      ...data,
      dueDate: new Date(data.dueDate)
    }
  });
};

export const updateTask = async (taskId, userId, updates) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  const membership = await prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: task.projectId
      }
    }
  });

  if (!membership) throw new Error("Not in project");

  const isOwner = task.assignedTo === userId;
  const isAdmin = membership.role === "ADMIN";

  if (!isOwner && !isAdmin) throw new Error("Not allowed");

  return prisma.task.update({
    where: { id: taskId },
    data: updates
  });
};

export const getTasks = async (projectId) => {
  return prisma.task.findMany({ where: { projectId } });
};