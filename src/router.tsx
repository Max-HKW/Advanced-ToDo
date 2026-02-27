/**
 * Node modules
 */

import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

/**
 * Error Pages
 */
import RootErrorBoundary from './errors/NotFound';

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultNotFoundComponent: () => <RootErrorBoundary />,
  defaultPreload: 'intent',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
