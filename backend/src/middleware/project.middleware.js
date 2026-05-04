import prisma from "../prisma/client.js";

export const requireMember = async (req, res, next) => {
  const projectId =
    req.params.projectId || req.body.projectId || req.query.projectId;

  if (!projectId) {
    return res.status(400).json({ message: "ProjectId required" });
  }

  const membership = await prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId: req.user.userId,
        projectId
      }
    }
  });

  if (!membership) {
    return res.status(403).json({ message: "Not a project member" });
  }

  req.membership = membership;
  next();
};