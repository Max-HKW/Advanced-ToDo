/**
 * Node modules
 */
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Utils
 */
import { formatCustomData, getTaskDueDateColorClass, cn } from '@/lib/utils';

/**
 * Components
 */
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Assets
 */
import {
  CalendarIcon,
  X,
  Inbox,
  ChevronDown,
  Hash,
  SendHorizonal,
} from 'lucide-react';

/**
 * Types
 */
import type { ClassValue } from 'clsx';
import type { TaskForm } from '@/shemas/taskSchema';

/**
 * Schemas
 */
import { taskFormSchema } from '@/shemas/taskSchema';

type TaskFormProps = {
  defaultFormData?: TaskForm;
  className?: ClassValue;
  mode: 'create' | 'edit';
  onCancel?: () => void;
  onSubmit?: (formData: TaskForm) => void;
};

const DEFAULT_FORM_DATA: TaskForm = {
  content: '',
  due_date: null,
  projectId: null,
};

const TaskForm = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}: TaskFormProps) => {
  const { register, control, setValue, handleSubmit } = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      content: defaultFormData.content,
      due_date: defaultFormData.due_date,
      projectId: defaultFormData.projectId,
    },
  });

  const [projectName, setProjectName] = useState('');
  const [projectColorHex, setProjectColorHex] = useState('');

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  const dueDate = useWatch({ control, name: 'due_date' });
  const taskContent = useWatch({ control, name: 'content' });

  const _onSubmit = (values: TaskForm) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Card className="focus-within:border-foreground/30">
        <CardContent className="p-2">
          <Textarea
            className="border-0! ring-0! mb-2 p-1 mt-2"
            placeholder="After finishing the project, take a tour"
            autoFocus
            {...register('content')}
          />

          <div className="ring-1 ring-border rounded-md max-w-max">
            <Popover
              open={dueDateOpen}
              onOpenChange={setDueDateOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(getTaskDueDateColorClass(dueDate, false))}
                >
                  {' '}
                  <CalendarIcon />{' '}
                  {dueDate ? formatCustomData(dueDate) : 'Due date'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Controller
                  name="due_date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      mode="single"
                      autoFocus
                      disabled={{ before: new Date() }}
                      selected={field.value ?? undefined}
                      onSelect={(date) => {
                        field.onChange(date ?? null);
                        setDueDateOpen(false);
                      }}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>

            {dueDate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="px-2 -ms-2"
                    aria-label="Remove due date"
                    onClick={() => setValue('due_date', null)}
                  >
                    <X />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Remove due date</TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2 p-2">
          <Popover
            open={projectOpen}
            onOpenChange={setProjectOpen}
            modal
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={false}
                className="max-w-max"
              >
                <Inbox /> Inbox <ChevronDown />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-60 p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Search project..." />

                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No project found.</CommandEmpty>

                    <CommandGroup>
                      <CommandItem value="1">
                        <Hash /> Project 1
                      </CommandItem>
                      <CommandItem value="2">
                        <Hash /> Project 2
                      </CommandItem>
                      <CommandItem value="3">
                        <Hash /> Project 3
                      </CommandItem>
                      <CommandItem value="4">
                        <Hash /> Project 4
                      </CommandItem>
                      <CommandItem value="5">
                        <Hash /> Project 5
                      </CommandItem>
                      <CommandItem value="6">
                        <Hash /> Project 6
                      </CommandItem>
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              <span className="hidden md:block">Cancel</span>

              <X className="md:hidden" />
            </Button>

            <Button
              type="submit"
              aria-disabled={!taskContent}
              className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
            >
              <span className="hidden md:block">
                {mode === 'create' ? 'Add task' : 'Save'}
              </span>

              <SendHorizonal className="md:hidden" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TaskForm;
