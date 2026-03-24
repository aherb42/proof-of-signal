/**
 * ProtectedRoute — allows access if the user is authenticated OR in demo mode.
 * Redirects unauthenticated non-demo users to /auth.
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { isDemo } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user && !isDemo) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
