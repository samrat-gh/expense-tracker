"use client";

import { BarChart3, CheckCircle, Goal, type User } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import CustomSignInForm from "@/components/login/custom-signin-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCustomAuth } from "@/hooks/useCustomAuth";
import CustomUserMenu from "./user-menu";

export default function Login() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useCustomAuth();

  const handleAuthSuccess = () => {
    setOpen(false);
  };

  // Loading state
  if (!isLoaded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md"
        disabled
      >
        <LoadingSpinner size="sm" text="" />
      </Button>
    );
  }

  if (isSignedIn) {
    return <CustomUserMenu />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hidden cursor-pointer bg-white text-black shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-purple-500 hover:text-white sm:inline-flex">
          Get Started
        </Button>
      </DialogTrigger>

      <DialogContent className="border border-purple/20 bg-purple/80 text-white shadow-xl backdrop-blur-md sm:max-w-md">
        <div className="absolute inset-0 animate-gradient-shift" />
        <div className="relative z-10">
          <DialogHeader className="space-y-3 pb-2 text-center">
            <DialogTitle className="bg-gradient-to-r from-white to-white/80 bg-clip-text font-semibold text-2xl text-transparent">
              Login to Transact
            </DialogTitle>
            <DialogDescription className="text-sm text-white/60 leading-relaxed">
              Manage your financials with personalized features
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <div className="grid gap-3">
                <FeatureItem
                  icon={CheckCircle}
                  color="emerald"
                  title="Record and Track Expenses"
                  desc="Never lose your financial streak"
                />
                <FeatureItem
                  icon={BarChart3}
                  color="blue"
                  title="Advanced Analytics"
                  desc="Track your financial trends"
                />
                <FeatureItem
                  icon={Goal}
                  color="purple"
                  title="Budget Planning"
                  desc="Plan and manage your budgets effectively"
                />
              </div>
            </div>

            <div className="pt-2">
              <CustomSignInForm onSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({
  icon: Icon,
  color,
  title,
  desc,
}: {
  icon: typeof User;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
      <div
        className={`h-8 w-8 rounded-full bg-${color}-500/20 flex items-center justify-center group-hover:bg-${color}-500/30 transition-colors`}
      >
        <Icon className={`text-${color}-400`} size={16} />
      </div>
      <div>
        <span className="font-medium text-sm">{title}</span>
        <p className="text-white/50 text-xs">{desc}</p>
      </div>
    </div>
  );
}
