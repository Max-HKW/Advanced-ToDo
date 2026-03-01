// hooks/useProjects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/services/project.service';
import { projectKeys } from '@/services/queryKeys/project.keys';
import type { ProjectFormType } from '@/shemas/dbSchema';

export const useProjects = (userId: string) =>
  useQuery({
    queryKey: projectKeys.projectListByUser(userId),
    queryFn: () => projectService.getAll(userId),
  });

export const useProjectById = (id: string) =>
  useQuery({
    queryKey: projectKeys.projectById(id),
    queryFn: () => projectService.getById(id),
  });

export const useCreateProject = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: ProjectFormType) =>
      projectService.create(project, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectListByUser(userId),
      });
    },
  });
};

export const useUpdateProject = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<ProjectFormType> }) =>
      projectService.update(id, project),
    onSuccess: (updatedProject) => {
      // aggiorna la cache del singolo progetto
      queryClient.setQueryData(
        projectKeys.projectById(updatedProject.id!),
        updatedProject
      );
      // invalida la lista per sincronizzarla
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectListByUser(userId),
      });
    },
  });
};

export const useDeleteProject = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectListByUser(userId),
      });
    },
  });
};