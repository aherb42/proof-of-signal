/**
 * AuthRedirect — handles magic link returns on the root route.
 * If authenticated, checks onboarding status and redirects accordingly.
 * Otherwise renders children (landing page).
 */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { isDemo } = useApp();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (loading || isDemo || !user) return;

    const check = async () => {
      setChecking(true);
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_complete')
          .eq('id', user.id)
          .single();

        setRedirectPath(profile?.onboarding_complete ? '/dashboard' : '/onboarding');
      } catch {
        setRedirectPath('/onboarding');
      } finally {
        setChecking(false);
      }
    };

    check();
  }, [user, loading, isDemo]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect;
