"use client";

import {
  BarChart2,
  Flag,
  HelpCircle,
  Home,
  Menu,
  Receipt,
  Settings,
  Ungroup,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/logo";

function NavItem({
  href,
  icon: Icon,
  onClick,
  children,
}: {
  href: string;
  icon: typeof BarChart2;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center rounded-md px-3 py-2 text-gray-600 text-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1F1F23] dark:hover:text-white"
    >
      <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-[70] rounded-lg bg-white p-2 shadow-md lg:hidden dark:bg-[#0F0F12]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 transform border-gray-200 border-r bg-white transition-transform duration-200 ease-in-out lg:static lg:w-64 lg:translate-x-0 dark:border-[#1F1F23] dark:bg-[#0F0F12] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="flex h-full flex-col">
          <Link
            href="/"
            className="flex h-16 items-center border-gray-200 border-b px-6 dark:border-[#1F1F23]"
            passHref
          >
            <Logo />
          </Link>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-6">
              <div>
                <div className="mb-2 px-3 font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="/dashboard"
                    icon={Home}
                    onClick={handleNavItemClick}
                  >
                    Dashboard
                  </NavItem>
                  <NavItem
                    href="/analytics"
                    icon={BarChart2}
                    onClick={handleNavItemClick}
                  >
                    Analytics
                  </NavItem>
                  <NavItem
                    href="/categories"
                    icon={Ungroup}
                    onClick={handleNavItemClick}
                  >
                    Categories
                  </NavItem>
                  {/* <NavItem href="#" icon={Folder} onClick={handleNavItemClick}>
                    Projects
                  </NavItem> */}
                </div>
              </div>

              <div>
                <div className="mb-2 px-3 font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-gray-400">
                  Finance
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="/transactions"
                    icon={Wallet}
                    onClick={handleNavItemClick}
                  >
                    Transactions
                  </NavItem>
                  <NavItem
                    href="/invoices"
                    icon={Receipt}
                    onClick={handleNavItemClick}
                  >
                    Invoices
                  </NavItem>
                  <NavItem
                    href="goals"
                    icon={Flag}
                    onClick={handleNavItemClick}
                  >
                    Goals
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="border-gray-200 border-t px-4 py-4 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings} onClick={handleNavItemClick}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle} onClick={handleNavItemClick}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-65 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMobileMenuOpen(false);
            }
          }}
          aria-label="Close mobile menu"
        />
      )}
    </>
  );
}
