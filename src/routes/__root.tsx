/**
 * Node modules
 */
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

/**
 * Types
 */
import type { RouterContext } from '@/router';

const RootLayout = () => (
  <>
    <Outlet />

    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
