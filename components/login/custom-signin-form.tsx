"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCustomSignIn } from "@/hooks/useCustomAuth";

interface CustomSignInFormProps {
  onSuccess?: () => void;
}

export default function CustomSignInForm({ onSuccess }: CustomSignInFormProps) {
  const { signInWithOAuth, isLoading } = useCustomSignIn();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithOAuth("oauth_google");
      onSuccess?.();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
      >
        <Image
          src="/google-icon.svg"
          width={20}
          height={20}
          alt="Google Icon"
        />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>

      <p className="text-center text-white/60 text-xs">
        By signing in, you agree to our
        <Link
          href="/terms-conditions"
          target="_blank"
          className="mx-1 underline"
        >
          Terms of Service
        </Link>
        and
        <Link href="/privacy-policy" target="_blank" className="mx-1 underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
