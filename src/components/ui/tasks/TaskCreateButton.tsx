/**
 * Components
 */
import { Button } from '@/components/ui/button';

/**
 * Assets
 */
import { CirclePlus } from 'lucide-react';

/**
 * Types
 */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton = (props: TaskCreateButtonProps) => {
  return (
    <Button
      variant="link"
      className="w-full justify-start mb-4 px-0!"
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};

export default TaskCreateButton;
