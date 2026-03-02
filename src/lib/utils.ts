/**
 * Node modules
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import type { TaskType } from '@/shemas/dbSchema';

/**
 * Types
 */
export type RawTaskType = Omit<TaskType, 'due_date'> & {
  due_date: string | null;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toTitleCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const formatCustomDate = (date: string | number | Date) => {
  const today = new Date();

  const relativeDay = toTitleCase(formatRelative(date, today).split(' at ')[0]);

  const days = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  if (days.includes(relativeDay)) return relativeDay;

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
};

export const getTaskDueDateColorClass = (
  dueDate: Date | null,
  completed?: boolean
): string | undefined => {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) return 'text-red-500';
  if (isToday(dueDate)) return 'text-emerald-500';
  if (isTomorrow(dueDate) && !completed) return 'text-amber-500';
};

export const toSupabaseDate = (date: Date | null): string | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fromSupabaseDate = (date: string | null): Date | null => {
  if (!date) return null;
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const mapTask = (task: RawTaskType): TaskType => ({
  ...task,
  due_date: fromSupabaseDate(task.due_date),
});

export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) return `${str.slice(0, maxLength - 1)} ...`;
  return str;
};
