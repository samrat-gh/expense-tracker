"use client";

import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCustomAuth } from "@/hooks/useCustomAuth";
import { signOut } from "@/lib/auth-client";
import { LoadingSpinner } from "../loading-spinner";

export default function CustomUserMenu() {
  const { user, isLoaded } = useCustomAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

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

  const initials = user?.name?.[0] || user?.email?.[0] || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        type="button"
        aria-label="Open user menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 font-semibold text-white text-xs capitalize backdrop-blur-md hover:bg-white/20"
      >
        {initials.toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-9 right-0 mt-2 w-60 overflow-hidden rounded-xl border border-white/20 bg-black/50 text-sm text-white shadow-lg backdrop-blur-md">
          {/* User Info */}
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="truncate font-medium text-lg capitalize leading-tight">
              {user?.name || user?.email || "Guest"}
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Menu Items */}
          <div className="flex flex-col">
            <MenuItem icon={<UserIcon size={14} />} label="Edit profile" />
            <MenuItem icon={<Settings size={14} />} label="App settings" />
            <MenuItem
              icon={<LogOut size={14} />}
              label="Log out"
              onClick={async () => {
                await signOut();
                router.push("/");
                router.refresh();
              }}
            />
          </div>
        </div>
      )}

      {/* <PricingModal
        openPricingModal={openPricingModal}
        setOpenPricingModal={setOpenPricingModal}
      />
      <LeaderboardModal
        isOpen={openLeaderboardModal}
        onClose={() => setOpenLeaderboardModal(false)}
      /> */}
    </div>
  );
}

/* Default Menu Item with subtle left hover accent */
function MenuItem({
  icon,
  label,
  onClick,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <Button
      disabled={!onClick}
      onClick={onClick}
      variant="ghost"
      className="group relative flex w-full items-center justify-start gap-2 overflow-hidden rounded-none px-3 py-1.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
    >
      {/* Hover Accent Line */}
      <span className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-sky-400 to-blue-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <span>{icon}</span>
      <span className="truncate">{label}</span>
      {trailing && <span className="ml-auto opacity-70">{trailing}</span>}
    </Button>
  );
}
