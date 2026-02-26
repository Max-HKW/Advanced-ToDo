/**
 * Node modules
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { RouterProvider } from '@tanstack/react-router';
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
        <LoaderIcon className="spin" />
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
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </UnheadProvider>
  </StrictMode>
);
