"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SSOCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Set a flag for new tab authentication
    if (window.opener) {
      localStorage.setItem("clerk-auth-complete", "true");
    }

    // Add a timeout to handle blank screen issues
    const timeout = setTimeout(() => {
      if (isLoading) {
        setError("Authentication is taking longer than expected...");
        // Redirect to home page after timeout
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }, 15000); // 15 second timeout

    // Mark as not loading after a short delay to show the loading state
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(loadingTimeout);
    };
  }, [isLoading, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <p className="mb-4 text-red-500">{error}</p>
          <p className="text-gray-600 text-sm">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-blue-600 border-b-2"></div>
        <p className="mb-2 text-gray-700">Completing authentication...</p>
        <p className="text-gray-500 text-sm">
          Please wait while we sign you in.
        </p>

        <AuthenticateWithRedirectCallback
          afterSignInUrl="/"
          afterSignUpUrl="/"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
