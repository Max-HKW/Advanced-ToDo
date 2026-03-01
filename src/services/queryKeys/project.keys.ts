export const projectKeys = {
  all: ['projects'] as const,
  projectListByUser: (userId: string) =>
    [...projectKeys.all, 'list', userId] as const,
  projectById: (id: string) => [...projectKeys.all, 'detail', id] as const,
};
