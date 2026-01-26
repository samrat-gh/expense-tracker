"use client";

import { Bell, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productConfig } from "@/data/config";
import { useCustomAuth } from "@/hooks/useCustomAuth";
import Profile01 from "./profile-01";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function TopNav() {
  const { user } = useCustomAuth();
  // console.log(user);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: productConfig.name, href: "/" },
    { label: "dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="flex h-full items-center justify-between border-gray-200 border-b bg-white px-3 sm:px-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="hidden max-w-[300px] items-center space-x-1 truncate font-medium text-sm sm:flex">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4">
        <button
          type="button"
          className="rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2 dark:hover:bg-[#1F1F23]"
        >
          <Bell className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="User avatar"
              placeholder="blur"
              blurDataURL={"/spinner.webp"}
              width={28}
              height={28}
              className="cursor-pointer rounded-full ring-2 ring-gray-200 sm:h-8 sm:w-8 dark:ring-[#2B2B30]"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] rounded-lg border-border bg-background shadow-lg sm:w-80"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
