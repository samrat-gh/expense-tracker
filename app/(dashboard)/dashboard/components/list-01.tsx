import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
  QrCode,
  SendHorizontal,
  Wallet,
} from "lucide-react";
import { getAccounts } from "@/lib/actions/account";
import { cn } from "@/lib/utils";

interface List01Props {
  className?: string;
}

export default async function List01({ className }: List01Props) {
  const result = await getAccounts();
  const accounts = result.success && result.data ? result.data : [];

  const totalBalance = accounts.reduce(
    (
      sum: number,
      account: {
        id: string;
        name: string;
        type: string;
        balance: number;
      },
    ) => sum + account.balance,
    0,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NRS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-xl",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      {/* Total Balance Section */}
      <div className="border-zinc-100 border-b p-4 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Total Balance
        </p>
        <h1 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-50">
          {formatCurrency(totalBalance)}
        </h1>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
            Your Accounts
          </h2>
        </div>

        <div className="space-y-1">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <div
                key={account.id}
                className={cn(
                  "group flex items-center justify-between",
                  "rounded-lg p-2",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-all duration-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn("rounded-lg p-1.5", {
                      "bg-emerald-100 dark:bg-emerald-900/30":
                        account.type === "savings",
                      "bg-blue-100 dark:bg-blue-900/30":
                        account.type === "investment",
                      "bg-purple-100 dark:bg-purple-900/30":
                        account.type === "investment",
                    })}
                  >
                    {account.type === "savings" && (
                      <Wallet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {account.type === "investment" && (
                      <ArrowUpRight className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    )}
                    {!["savings", "investment"].includes(account.type) && (
                      <QrCode className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                      {account.name}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {account.type}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(account.balance)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No accounts yet. Create one to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-zinc-100 border-t p-2 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "rounded-lg px-3 py-2",
              "font-medium text-xs",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "rounded-lg px-3 py-2",
              "font-medium text-xs",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <SendHorizontal className="h-3.5 w-3.5" />
            <span>Send</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "rounded-lg px-3 py-2",
              "font-medium text-xs",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowDownLeft className="h-3.5 w-3.5" />
            <span>Top-up</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "rounded-lg px-3 py-2",
              "font-medium text-xs",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowRight className="h-3.5 w-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
