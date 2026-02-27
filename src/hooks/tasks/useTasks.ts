/**
 * Node modules
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Services
 */
import { taskService } from '@/services/task.service';

/**
 * Query keys
 */
import { taskKeys } from '@/services/queryKeys/task.key';

/**
 * Types
 */
import type { TaskFormType } from '@/shemas/dbSchema';

export const useGetAllTask = (userId: string) => {
  return useQuery({
    queryKey: taskKeys.taskListByUser(userId),
    queryFn: () => taskService.getAllTask(userId),
  });
};

export const useCreateTask = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: TaskFormType) => taskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.taskListByUser(userId),
      });
    },
  });
};

export const useUpdateTask = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<TaskFormType> }) =>
      taskService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.taskListByUser(userId),
      });
    },
  });
};

export const useDeleteTask = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.removeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.taskListByUser(userId),
      });
    },
  });
};
