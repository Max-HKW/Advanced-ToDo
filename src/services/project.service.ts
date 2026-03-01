// services/project.service.ts
import { http } from '@/lib/axios';
import type { ProjectType, ProjectFormType } from '@/shemas/dbSchema';

const BASE_URL = '/rest/v1/projects';

export const projectService = {
  getAll: async (userId: string): Promise<ProjectType[]> => {
    const { data } = await http.get(BASE_URL, {
      params: {
        user_id: `eq.${userId}`,
        select: '*',
        order: 'created_at.asc',
      },
    });
    return data;
  },

  getById: async (id: string): Promise<ProjectType> => {
    const { data } = await http.get(BASE_URL, {
      params: {
        id: `eq.${id}`,
        select: '*',
        limit: 1,
      },
    });
    return data[0];
  },

  create: async (project: ProjectFormType, userId: string): Promise<ProjectType> => {
    const { data } = await http.post(
      BASE_URL,
      { ...project, user_id: userId },
      { headers: { Prefer: 'return=representation' } }
    );
    return data[0];
  },

  update: async (id: string, project: Partial<ProjectFormType>): Promise<ProjectType> => {
    const { data } = await http.patch(BASE_URL, project, {
      params: { id: `eq.${id}` },
      headers: { Prefer: 'return=representation' },
    });
    return data[0];
  },

  remove: async (id: string): Promise<void> => {
    await http.delete(BASE_URL, {
      params: { id: `eq.${id}` },
    });
  },
};