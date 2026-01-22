"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
  Crown,
  LogOut,
  Settings,
  Trophy,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "../loading-spinner";

export default function CustomUserMenu() {
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [openPricingModal, setOpenPricingModal] = useState(false);
  const [openLeaderboardModal, setOpenLeaderboardModal] = useState(false);
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

  if (!userLoaded) {
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

  const initials =
    user?.firstName?.[0] ||
    user?.username?.[0] ||
    user?.emailAddresses?.[0]?.emailAddress?.[0] ||
    "U";

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
              {user?.fullName ||
                user?.primaryEmailAddress?.emailAddress ||
                "Guest"}
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Menu Items */}
          <div className="flex flex-col">
            <UpgradeMenuItem
              icon={
                <div className="flex items-center gap-2 rounded-full bg-black/60 p-2 shadow-sm backdrop-blur-md">
                  <Crown size={14} className="text-amber-300" />
                </div>
              }
              label="Upgrade to Plus"
              onClick={() => {
                setOpenPricingModal(true);
                setOpen(false);
              }}
            />
            <MenuItem
              icon={
                <div className="flex items-center gap-2 rounded-full bg-black/20 p-2 shadow-sm backdrop-blur-md">
                  <Trophy size={14} className="text-blue-400" />
                </div>
              }
              label="Leaderboard"
              onClick={() => {
                setOpenLeaderboardModal(true);
                setOpen(false);
              }}
            />
            <MenuItem icon={<UserIcon size={14} />} label="Edit profile" />
            <MenuItem icon={<Settings size={14} />} label="App settings" />
            <MenuItem
              icon={<LogOut size={14} />}
              label="Log out"
              onClick={() =>
                signOut({
                  redirectUrl: "/focus",
                })
              }
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

/* Premium Upgrade Item with golden sweep animation */
function UpgradeMenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="group relative w-full justify-start overflow-hidden rounded-none p-3 py-2 text-white/90 transition-all duration-600 hover:bg-white/10 hover:text-white"
    >
      <div className="-translate-x-full absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transition-transform duration-1200 ease-in-out group-hover:translate-x-full"></div>
      <span className="shrink opacity-80">{icon}</span>
      <span className="text-sm">{label}</span>
    </Button>
  );
}
