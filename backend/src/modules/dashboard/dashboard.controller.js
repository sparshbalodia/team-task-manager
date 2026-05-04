import prisma from "../../prisma/client.js";

export const getDashboard = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "projectId required" });
    }

    // Total Tasks
    const totalTasks = await prisma.task.count({
      where: { projectId }
    });

    // Tasks by Status
    const tasksByStatus = await prisma.task.groupBy({
      by: ["status"],
      where: { projectId },
      _count: true
    });

    // Tasks per User
    const tasksPerUser = await prisma.task.groupBy({
      by: ["assignedTo"],
      where: { projectId },
      _count: true
    });

    // Overdue Tasks
    const overdueTasks = await prisma.task.count({
      where: {
        projectId,
        dueDate: { lt: new Date() },
        status: { not: "DONE" }
      }
    });

    res.json({
      totalTasks,
      tasksByStatus,
      tasksPerUser,
      overdueTasks
    });

  } catch (err) {
    next(err);
  }
};