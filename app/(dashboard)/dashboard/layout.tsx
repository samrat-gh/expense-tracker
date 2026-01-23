import type { ReactNode } from "react";
import Sidebar from "@/app/(dashboard)/dashboard/components/sidebar";
import TopNav from "@/app/(dashboard)/dashboard/components/top-nav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <header className="h-16 border-gray-200 border-b dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto bg-white p-6 dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}
