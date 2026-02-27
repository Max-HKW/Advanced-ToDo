/**
 * Services
 */
import { http } from '@/lib/axios';

/**
 * Types
 */
import type { TaskType, TaskFormType } from '@/shemas/dbSchema';

const BASE_URL = '/rest/v1/tasks';

export const taskService = {
  getAllTask: async (userId: string): Promise<TaskType[]> => {
    const { data } = await http.get(BASE_URL, {
      params: {
        userId: `eq.${userId}`,
        select: '*, project:projects(id, name, color_name, color_hex)',
        order: 'created_at.desc',
      },
    });

    return data;
  },

  getTaskById: async (id: string): Promise<TaskType> => {
    const { data } = await http.get(BASE_URL, {
      params: {
        id: `eq.${id}`,
        select: '*',
        limit: 1,
      },
    });

    return data[0];
  },

  createTask: async (task: TaskFormType): Promise<TaskType> => {
    const { data } = await http.post(BASE_URL, task, {
      headers: {
        Prefer: 'return=representation',
      },
    });

    return data[0];
  },

  updateTask: async (
    id: string,
    task: Partial<TaskFormType>
  ): Promise<TaskType> => {
    const { data } = await http.patch(BASE_URL, task, {
      params: {
        id: `eq.${id}`,
      },
      headers: {
        Prefer: 'return=representation',
      },
    });

    return data[0];
  },

  removeTask: async (id: string): Promise<void> => {
    await http.delete(BASE_URL, {
      params: {
        id: `eq.${id}`,
      },
    });
  },
};
