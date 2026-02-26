/**
 * Node modules
 */
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const { register, control } = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      content: DEFAULT_FORM_DATA.content,
      due_date: DEFAULT_FORM_DATA.due_date,
      projectId: DEFAULT_FORM_DATA.projectId,
    },
  });

  const [projectName, setProjectName] = useState('');
  const [projectColorHex, setProjectColorHex] = useState('');

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  const dueDate = useWatch({ control, name: 'due_date' });

  return (
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
              >
                {' '}
                <CalendarIcon />{' '}
                {dueDate ? new Date(dueDate).toDateString() : 'Due date'}
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

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 -ms-2"
                aria-label="Remove due date"
              >
                <X />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Remove due date</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2 p-2">
        <Popover modal>
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
          <Button variant="secondary">
            <span className="hidden md:block">Cancel</span>

            <X className="md:hidden" />
          </Button>

          <Button>
            <span className="hidden md:block">Add task</span>

            <SendHorizonal className="md:hidden" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
