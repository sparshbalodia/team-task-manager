import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string(),
  assignedTo: z.string(),
  dueDate: z.string(),
  priority: z.string()
});

export const updateTaskSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  title: z.string().optional(),
  description: z.string().optional()
});