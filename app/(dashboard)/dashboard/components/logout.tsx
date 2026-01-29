import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function Logout() {
  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  };
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg p-2 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      onClick={logout}
    >
      <div className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Logout
        </span>
      </div>
    </button>
  );
}
