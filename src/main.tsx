/**
 * Node modules
 */
import { RouterProvider } from '@tanstack/react-router';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router';

/**
 * Contexts
 */
import AuthProvider, { useAuth } from '@/context/auth/AuthContext';

/**
 * Styles
 */
import './index.css';

/**
 * Assets
 */
import { LoaderIcon } from 'lucide-react';

/**
 * Query Client
 */
import { queryClient } from '@/lib/query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

const AuthenticatedApp = () => {
  const auth = useAuth();

  if (auth.isLoading)
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoaderIcon className="animate-spin" />
      </div>
    );

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
    />
  );
};

const head = createHead();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </QueryClientProvider>
    </UnheadProvider>
  </StrictMode>
);
