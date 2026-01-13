"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-sm text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 mb-2">Completing authentication...</p>
        <p className="text-sm text-gray-500">
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
