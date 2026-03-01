/**
 * Node modules
 */

import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

/**
 * Error Pages
 */
import RootErrorBoundary from './errors/NotFound';

/**
 * QueryClient
 */
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '@/lib/query/queryClient';

/**
 * Types
 */
import type { User } from '@supabase/supabase-js';

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
  };
  queryClient: QueryClient;
}

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
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
