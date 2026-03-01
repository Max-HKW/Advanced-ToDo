export const taskKeys = {
  all: ['tasks'] as const,
  taskLists: () => [...taskKeys.all, 'list'] as const,
  taskListByUser: (userId: string) =>
    [...taskKeys.taskLists(), userId] as const,
  incompleteTaskListByUser: (userId: string) => [...taskKeys.all, 'incomplete', userId] as const,
  taskById: (id: string) => [...taskKeys.all, 'detail', id] as const,
};
