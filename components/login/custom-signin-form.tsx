"use client";

import { Button } from "@/components/ui/button";
import { useCustomSignIn } from "@/hooks/useCustomAuth";
import Image from "next/image";
import Link from "next/link";

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
        className="w-full h-12 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center gap-3 transition-colors">
        <Image
          src="/google-icon.svg"
          width={20}
          height={20}
          alt="Google Icon"
        />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>

      <p className="text-xs text-white/60 text-center">
        By signing in, you agree to our
        <Link
          href="/terms-conditions"
          target="_blank"
          className="underline mx-1">
          Terms of Service
        </Link>
        and
        <Link href="/privacy-policy" target="_blank" className="underline mx-1">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
