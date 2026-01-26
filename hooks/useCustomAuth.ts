"use client";

import { useSession } from "@/lib/auth-client";

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}

export const useCustomAuth = () => {
  const { data: session, isPending } = useSession();

  return {
    isLoaded: !isPending,
    isSignedIn: !!session,
    userId: session?.user?.id,
    user: session?.user,
  };
};
