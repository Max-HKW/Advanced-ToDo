/**
 * Node modules
 */
import { useState } from 'react';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import TaskForm from '@/components/forms/TaskForm';

/**
 * Custom hooks
 */
import { useUpdateTask } from '@/hooks/tasks/useTasks';
import { useAuth } from '@/context/auth/AuthContext';

/**
 * Utils
 */
import { cn, getTaskDueDateColorClass } from '@/lib/utils';
import { formatCustomDate } from '@/lib/utils';
import { toast } from 'sonner';

/**
 * Assets
 */
import {
  Check,
  CalendarDays,
  Hash,
  Inbox,
  Edit,
  Trash2,
  LoaderIcon,
} from 'lucide-react';

/**
 * Types
 */
import type { TaskFormType, TaskType } from '@/shemas/dbSchema';

type TaskCardProps = {
  task: TaskType;
};

const TaskCard = ({
  task: { id, content, due_date, project, completed },
}: TaskCardProps) => {
  const [taskFormShow, setTaskFormShow] = useState(false);

  const { mutate: updateTask, isPending } = useUpdateTask();

  const onSubmit = (formData: TaskFormType) => {
    updateTask({ id: id!, task: formData });
    setTaskFormShow(false);
  };

  return (
    <>
      {!taskFormShow && (
        <div className="group/card relative grid grid-cols-[max-content_minmax(0,1fr)] gap-3 border-b">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'group/button rounded-full size-5 mt-2 aria-disabled:opacity-50 aria-disabled:pointer-events-none',
              completed && 'bg-border'
            )}
            role="checkbox"
            aria-checked={completed}
            aria-label={`Mark task as ${completed ? 'incomplete' : 'complete'}`}
            aria-describedby="task-content"
            aria-disabled={isPending}
            onClick={() => {
              const previousCompletedValue = completed;

              updateTask({ id: id!, task: { completed: !completed } });
              toast(`1 task ${!completed ? 'completed' : 'reopened'}`, {
                action: {
                  label: 'Undo',
                  onClick: () => {
                    updateTask({
                      id: id!,
                      task: { completed: previousCompletedValue },
                    });
                  },
                },
              });
            }}
          >
            <Check
              strokeWidth={4}
              className={cn(
                'size-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                completed ? 'opacity-100' : 'opacity-0'
              )}
            />
          </Button>

          <Card className="p-0 gap-0 rounded-none py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  'text-sm max-md:me-16',
                  completed && 'text-muted-foreground line-through'
                )}
              >
                {content}
              </p>
            </CardContent>

            <CardFooter className="p-0 flex gap-4">
              {due_date && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(due_date, completed)
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(due_date)}
                </div>
              )}

              <div className="grid grid-cols-[minmax(0,180px)_max-content] items-center gap-1 text-xs text-muted-foreground ms-auto">
                <div className="truncate text-right">
                  {project?.name || 'Inbox'}
                </div>

                {project ? <Hash size={14} /> : <Inbox size={14} />}
              </div>
            </CardFooter>
          </Card>

          <div className="absolute top-1.5 right-0 ps-1 flex items-center gap-1 md:opacity-0 group-hover/card:opacity-100 transition-opacity focus-within:opacity-100">
            {!completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-muted-foreground"
                    aria-label="Edit task"
                    onClick={() => setTaskFormShow(true)}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 text-muted-foreground"
                  aria-label="Delete task"
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {taskFormShow && (
        <TaskForm
          className="my-3"
          defaultFormData={{
            id,
            content,
            due_date,
            projectId: project && project?.id,
          }}
          mode="edit"
          onCancel={() => setTaskFormShow(false)}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default TaskCard;
