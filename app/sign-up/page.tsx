"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeUserDefaults } from "@/lib/actions/user";
import { signIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        setError(result.error.message || "Sign up failed");
      } else {
        // Initialize default categories and account for new user
        if (result.data?.user?.id) {
          await initializeUserDefaults(result.data.user.id);
        }
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social sign up failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-white/20 bg-black/40 p-8 text-white shadow-xl backdrop-blur-md">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl">Sign Up</h1>
          <p className="text-sm text-white/60">
            Create an account to get started
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-white/20 border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black/40 px-2 text-white/60">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignUp("google")}
            disabled={isLoading}
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignUp("github")}
            disabled={isLoading}
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
