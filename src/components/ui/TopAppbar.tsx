/**
 * Node modules
 */
import { useState, useEffect } from 'react';

/**
 * Components
 */
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Kbd from '@/components/ui/Kbd';

/**
 * Types
 */
type TopAppbarProps = {
  title: string;
  taskCount?: number;
};

/**
 * Utils
 */
import { cn } from '@/lib/utils';

const TopAppbar = ({ title, taskCount }: TopAppbarProps) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70);

    listener();
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-40 bg-background h-14 grid grid-cols-[40px_minmax(0,1fr)_40px] items-center px-4',
        showTitle && 'border-b'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className="flex flex-col gap-2 items-center">
          <p>Toggle sidebar</p>
          <Kbd kbdList={['Ctrl', 'b']} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'max-w-120 mx-auto text-center transition-all',
          showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        )}
      >
        <h1 className="font-semibold truncate">{title}</h1>
        {Boolean(taskCount) && (
          <div className="text-xs text-muted-foreground">{taskCount} tasks</div>
        )}
      </div>
    </div>
  );
};

export default TopAppbar;
