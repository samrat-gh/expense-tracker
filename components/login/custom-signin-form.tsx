"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

interface CustomSignInFormProps {
  onSuccess?: () => void;
}

export default function CustomSignInForm({ onSuccess }: CustomSignInFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSocialSignIn = async (provider: "google") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={() => handleSocialSignIn("google")}
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
