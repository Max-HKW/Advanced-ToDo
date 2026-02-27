export const projectKeys = {
  all: ['projects'] as const,
  projectLists: () => [...projectKeys.all, 'list'] as const,
  projectListByUser: (userId: string) =>
    [...projectKeys.projectLists(), userId] as const,
  projectById: (id: string) => [...projectKeys.all, 'detail', id] as const,
};
