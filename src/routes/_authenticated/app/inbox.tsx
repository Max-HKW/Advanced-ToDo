/**
 * Node modules
 */
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

/**
 * Components
 */
import TaskForm from '@/components/forms/TaskForm';
import { Page, PageHeader, PageList, PageTitle } from '@/components/ui/Page';
import TaskCreateButton from '@/components/ui/tasks/TaskCreateButton';
import TaskEmptyState from '@/components/ui/tasks/TaskEmptyState';
import TopAppbar from '@/components/ui/TopAppbar';
import TaskCard from '@/components/ui/tasks/TaskCard';

/**
 * Custom hooks
 */
import { useAuth } from '@/context/auth/AuthContext';
import { useCreateTask, useGetAllIncompleteTask } from '@/hooks/tasks/useTasks';
import { useHead } from '@unhead/react';

/**
 * Types
 */
import type { TaskFormType } from '@/shemas/dbSchema';

/**
 * Query keys
 */
import { taskKeys } from '@/services/queryKeys/task.keys';

/**
 * Services
 */
import { taskService } from '@/services/task.service';

export const Route = createFileRoute('/_authenticated/app/inbox')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: taskKeys.taskListByUser(context.auth.user!.id),
      queryFn: () => taskService.getIncompleteTasks(context.auth.user!.id),
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  useHead({
    title: 'Inbox - Tasky AI',
  });

  const { user } = useAuth();
  const { data: tasks } = useGetAllIncompleteTask(user!.id);

  console.log(tasks);

  const [taskFormShow, setTaskFormShow] = useState(false);

  const { mutate: createTask } = useCreateTask(user!.id);

  const onSubmit = (formData: TaskFormType) => {
    createTask(formData);
    setTaskFormShow(false);
  };

  return (
    <>
      <TopAppbar
        title="Inbox"
        taskCount={20}
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          {tasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!tasks?.length && !taskFormShow && <TaskEmptyState type="inbox" />}

          {taskFormShow && (
            <TaskForm
              mode="create"
              className="mt-3"
              onCancel={() => setTaskFormShow(false)}
              onSubmit={onSubmit}
            />
          )}
        </PageList>
      </Page>
    </>
  );
}
