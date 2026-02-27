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

const TaskFormDialog = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

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
          mode='create'
          onCancel={() => setIsOpen(false)}
          onSubmit={() => {
            
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
