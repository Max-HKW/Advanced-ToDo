import { z } from 'zod';

const projectSchema = z.object({
  id: z.string().nullable(),
  name: z.string(),
  color_name: z.string(),
  color_hex: z.string(),
});

const projectFormSchema = projectSchema.extend({
  ai_task_gen: z.boolean(),
  task_gen_prompt: z.string(),
});

const taskSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  due_date: z.date().nullable(),
  completed: z.boolean().optional(),
  project: projectSchema.nullable(),
  userId: z.string(),
});

const taskFormSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  due_date: z.date().nullable(),
  completed: z.boolean().optional(),
  projectId: z.string().nullable(),
});

type Project = z.infer<typeof projectSchema>;
type ProjectForm = z.infer<typeof projectFormSchema>;
type Task = z.infer<typeof taskSchema>;
type TaskForm = z.infer<typeof taskFormSchema>;

export { projectSchema, projectFormSchema, taskSchema, taskFormSchema };
export type { Project, ProjectForm, Task, TaskForm };