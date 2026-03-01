/**
 * Services
 */
import { http } from '@/lib/axios';
import { mapTask, toSupabaseDate } from '@/lib/utils';

/**
 * Types
 */
import type { TaskType, TaskFormType } from '@/shemas/dbSchema';
import type { RawTaskType } from '@/lib/utils';

/**
 * Constants
 */
const BASE_URL = '/rest/v1/tasks';
const TASK_SELECT =
  '*, project:projects(id, name, color_name, color_hex)' as const;

export const taskService = {
  getAllTasks: async (userId: string): Promise<TaskType[]> => {
    const { data } = await http.get<RawTaskType[]>(BASE_URL, {
      params: {
        user_id: `eq.${userId}`,
        select: TASK_SELECT,
        order: 'created_at.desc',
      },
    });

    return data.map(mapTask);
  },

  getIncompleteTasks: async (userId: string) => {
    const { data } = await http.get<RawTaskType[]>(BASE_URL, {
      params: {
        user_id: `eq.${userId}`,
        completed: 'eq.false',
        project_id: 'is.null',
        select: TASK_SELECT,
        order: 'created_at.desc',
      },
    });

    return data.map(mapTask);
  },

  getTaskById: async (id: string): Promise<TaskType> => {
    const { data } = await http.get<RawTaskType[]>(BASE_URL, {
      params: {
        id: `eq.${id}`,
        select: '*',
        limit: 1,
      },
    });

    return mapTask(data[0]);
  },

  getByProject: async (projectId: string): Promise<TaskType[]> => {
    const { data } = await http.get<RawTaskType[]>(BASE_URL, {
      params: {
        project_id: `eq.${projectId}`,
        select: TASK_SELECT,
        order: 'created_at.desc',
      },
    });

    return data.map(mapTask);
  },

  createTask: async (task: TaskFormType, userId: string): Promise<TaskType> => {
    const payload = {
      content: task.content,
      due_date: task.due_date ? toSupabaseDate(task.due_date) : null,
      project_id: task.projectId,
      completed: task.completed,
      user_id: userId,
    };

    const { data } = await http.post<RawTaskType[]>(BASE_URL, payload, {
      headers: {
        Prefer: 'return=representation',
      },
    });

    return mapTask(data[0]);
  },

  updateTask: async (
    id: string,
    task: Partial<TaskFormType>
  ): Promise<TaskType> => {
    const { projectId, due_date, ...rest } = task;

    const payload = {
      ...rest,
      ...(due_date !== undefined && { due_date: toSupabaseDate(due_date) }),
      ...(projectId !== undefined && { project_id: projectId }),
    };

    const { data } = await http.patch<RawTaskType[]>(BASE_URL, payload, {
      params: { id: `eq.${id}` },
      headers: { Prefer: 'return=representation' },
    });

    return mapTask(data[0]);
  },

  removeTask: async (id: string): Promise<void> => {
    await http.delete(BASE_URL, {
      params: {
        id: `eq.${id}`,
      },
    });
  },
};
