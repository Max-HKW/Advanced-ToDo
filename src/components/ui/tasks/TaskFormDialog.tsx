/**
 * Node modules
 */
import { useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

/**
 * Utils
 */
import { startOfToday } from 'date-fns';

/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from '@/components/forms/TaskForm';

/**
 * Types
 */
import { type PropsWithChildren } from 'react';
import type { TaskFormType } from '@/shemas/dbSchema';

/**
 * Custom hooks
 */
import { useAuth } from '@/context/auth/AuthContext';
import { useCreateTask } from '@/hooks/tasks/useTasks';

const TaskFormDialog = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const { mutate: createTask, isPending } = useCreateTask(user!.id);

  const onSubmit = (formData: TaskFormType) => {
    createTask(formData);
    setIsOpen(false);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        const target = event.target as HTMLElement;
        if (target.localName === 'textarea') return;

        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [setIsOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 border-0 rounded-xl">
        <DialogTitle className="sr-only">Task Form</DialogTitle>
        <DialogDescription className="sr-only">
          Fill in the fields below to add a new task. You can set a title, due
          date and assign it to a project.
        </DialogDescription>
        <TaskForm
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            projectId: null,
          }}
          mode="create"
          onCancel={() => setIsOpen(false)}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
