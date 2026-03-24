/**
 * useAuth — lightweight hook for Supabase auth state.
 * Wraps onAuthStateChange (set up before getSession) and exposes session, user, loading, and sign-out.
 */
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up listener BEFORE getSession per Supabase best practice
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Restore session, then validate with server to catch revoked tokens
    supabase.auth.getSession().then(async ({ data: { session: localSession } }) => {
      if (localSession) {
        const { data: { user: validUser }, error } = await supabase.auth.getUser();
        if (error || !validUser) {
          // Token was revoked server-side — clear local state
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
        } else {
          setSession(localSession);
          setUser(validUser);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, user, loading, signOut };
}
