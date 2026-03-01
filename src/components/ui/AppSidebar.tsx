/**
 * Node modules
 */
import { Link, useNavigate } from '@tanstack/react-router';

/**
 * Contexts
 */
import { useAuth } from '@/context/auth/AuthContext';

/**
 * Components
 */
import Logo from '@/components/logo/Logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import TaskFormDialog from '@/components/ui/tasks/TaskFormDialog';

/**
 * Assets
 */
import {
  CirclePlus,
  ChevronsUpDown,
  LogOutIcon,
  Plus,
  ChevronRight,
} from 'lucide-react';

/**
 * Constants
 */
import { SIDEBAR_LINKS } from '@/contants';

const AppSidebar = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/login' });
  };

  const email = user?.email ?? '';
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="/app/inbox"
          className="p-2"
        >
          <Logo title="Tasky AI" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task create button */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className="text-primary">
                        <CirclePlus /> Add task
                      </SidebarMenuButton>
                    </TooltipTrigger>

                    <TooltipContent side="right">q</TooltipContent>
                  </Tooltip>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* Sidebar links */}
              {SIDEBAR_LINKS.map(({ href, icon: Icon, label }, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={href}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All projects */}
        <Collapsible
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <ChevronRight className="me-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />{' '}
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label="Add project">
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>

              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className="text-muted-foreground text-sm p-2">
                      Click + to add some projects
                    </p>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col text-left text-sm leading-tight">
                    <span className="truncate font-medium">{email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col text-left text-sm leading-tight">
                      <span className="truncate font-medium">{email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOutIcon className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
