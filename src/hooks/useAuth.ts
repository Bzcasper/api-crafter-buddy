// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseAuthReturn {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (session?.user?.id) {
        setUserId(session.user.id);
      } else {
        setUserId(null);
      }
    } catch (err: any) {
      console.error("Error fetching session:", err);
      setError("Failed to fetch user session.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchSession();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchSession]);

  return { userId, isLoading, error };
};
