/**
 * Node modules
 */
import { createFileRoute, Outlet } from '@tanstack/react-router';

/**
 * Components
 */
import AppSidebar from '@/components/ui/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

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

        <main className="flex-1">
          <Outlet />
        </main>
        <Toaster position='top-center'/>
      </TooltipProvider>
    </SidebarProvider>
  );
}
