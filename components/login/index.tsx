"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { User, CheckCircle, BarChart3, Music } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useCustomAuth } from "@/hooks/useCustomAuth";
import CustomSignInForm from "@/components/login/custom-signin-form";

import { LoadingSpinner } from "@/components/loading-spinner";

export default function Login() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useCustomAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const handleAuthSuccess = () => {
    setOpen(false);
  };

  // Loading state
  if (!isLoaded || !userLoaded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80"
        disabled>
        <LoadingSpinner size="sm" text="" />
      </Button>
    );
  }

  // User menu when logged in
  if (isSignedIn) {
    // Show user profile button or menu
    return <User />;
  }

  // Login button + tooltip + dialog
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={700}>
          {/* Tooltip wraps ONLY the trigger button */}
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full cursor-pointer bg-black/30 backdrop-blur-xl border border-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 to-pink-500/0 group-hover:from-blue-500/10 transition-all duration-500" />
                <User
                  size={20}
                  className="relative z-10 transition-transform group-hover:scale-110 duration-300"
                />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-white dark:text-black">
            Sign in
          </TooltipContent>
        </Tooltip>

        {/* The actual Dialog content */}
        <DialogContent className="sm:max-w-md border border-white/20 bg-black/40 backdrop-blur-md shadow-xl text-white">
          <div className="absolute inset-0 animate-gradient-shift" />
          <div className="relative z-10">
            <DialogHeader className="space-y-3 text-center pb-2">
              <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Login to PomoFocus
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm leading-relaxed">
                Unlock your productivity potential with personalized features
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              <div className="space-y-3">
                <div className="grid gap-3">
                  <FeatureItem
                    icon={CheckCircle}
                    color="emerald"
                    title="Sync & Save Progress"
                    desc="Never lose your productivity streak"
                  />
                  <FeatureItem
                    icon={BarChart3}
                    color="blue"
                    title="Advanced Analytics"
                    desc="Track your focus patterns"
                  />
                  <FeatureItem
                    icon={Music}
                    color="purple"
                    title="Custom Playlists"
                    desc="Curate your focus soundtrack"
                  />
                </div>
              </div>

              <div className="pt-2">
                <CustomSignInForm onSuccess={handleAuthSuccess} />
              </div>
            </div>
          </div>
        </DialogContent>
      </TooltipProvider>
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
    <div className="flex items-center gap-3 text-white/90 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-300 group">
      <div
        className={`w-8 h-8 rounded-full bg-${color}-500/20 flex items-center justify-center group-hover:bg-${color}-500/30 transition-colors`}>
        <Icon className={`text-${color}-400`} size={16} />
      </div>
      <div>
        <span className="text-sm font-medium">{title}</span>
        <p className="text-xs text-white/50">{desc}</p>
      </div>
    </div>
  );
}
