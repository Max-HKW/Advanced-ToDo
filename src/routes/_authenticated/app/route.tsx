/**
 * Node modules
 */
import { createFileRoute, Outlet } from '@tanstack/react-router';

/**
 * Components
 */
import AppSidebar from '@/components/ui/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Assets
 */

export const Route = createFileRoute('/_authenticated/app')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider
        delayDuration={500}
        disableHoverableContent
      >
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
}
