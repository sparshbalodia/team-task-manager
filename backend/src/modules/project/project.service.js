import prisma from "../../prisma/client.js";

export const createProject = async (userId, name) => {
  return prisma.project.create({
    data: {
      name,
      adminId: userId,
      memberships: {
        create: { userId, role: "ADMIN" }
      }
    }
  });
};

export const getProjects = async (userId) => {
  return prisma.project.findMany({
    where: {
      memberships: { some: { userId } }
    }
  });
};

export const addMember = async (projectId, userId) => {
  const exists = await prisma.membership.findUnique({
    where: { userId_projectId: { userId, projectId } }
  });

  if (exists) throw new Error("Already member");

  return prisma.membership.create({
    data: { projectId, userId, role: "MEMBER" }
  });
};