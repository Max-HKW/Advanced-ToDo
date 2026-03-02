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
import { taskKeys } from '@/services/queryKeys/task.keys';

/**
 * Types
 */
import type { TaskFormType, TaskType } from '@/shemas/dbSchema';

/**
 * Utils
 */
import { toast } from 'sonner';

export const useGetAllTask = (userId: string) => {
  return useQuery({
    queryKey: taskKeys.taskListByUser(userId),
    queryFn: () => taskService.getAllTasks(userId),
  });
};

export const useGetAllIncompleteTask = (userId: string) => {
  return useQuery({
    queryKey: taskKeys.incompleteTaskListByUser(userId),
    queryFn: () => taskService.getIncompleteTasks(userId),
  });
};

export const useCreateTask = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: TaskFormType) => taskService.createTask(task, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<TaskFormType> }) =>
      taskService.updateTask(id, task),

    onMutate: async ({ id: taskId, task: updatedFields }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });

      const cachedQueries = queryClient.getQueriesData({
        queryKey: taskKeys.all,
      });

      queryClient.setQueriesData(
        { queryKey: taskKeys.all },
        (cachedTasks: TaskType[] | undefined) =>
          cachedTasks?.map((cachedTask) =>
            cachedTask.id === taskId
              ? {
                  ...cachedTask,
                  ...updatedFields,
                  project: cachedTask.project,
                  due_date: updatedFields.due_date ?? cachedTask.due_date,
                }
              : cachedTask
          )
      );

      return { cachedQueries };
    },

    onError: (_err, _variables, context) => {
      context?.cachedQueries.forEach(([queryKey, cachedData]) => {
        queryClient.setQueryData(queryKey, cachedData);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskService.removeTask(taskId),

    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });

      const cachedQueries = queryClient.getQueriesData({ queryKey: taskKeys.all });

      queryClient.setQueriesData(
        { queryKey: taskKeys.all },
        (cachedTasks: TaskType[] | undefined) =>
          cachedTasks?.filter((task) => task.id !== taskId)
      );

      return { cachedQueries };
    },

    onError: (_err, _variables, context) => {
      context?.cachedQueries.forEach(([queryKey, cachedData]) => {
        queryClient.setQueryData(queryKey, cachedData);
      });
      toast.error('Errore durante l eliminazione. Riprova.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
