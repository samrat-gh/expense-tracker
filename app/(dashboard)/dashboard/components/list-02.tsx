import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  type LucideIcon,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { getTransactions } from "@/lib/actions/transaction";
import { cn } from "@/lib/utils";

interface List02Props {
  className?: string;
}

const getCategoryIcon = (category: string): LucideIcon => {
  switch (category?.toLowerCase()) {
    case "shopping":
      return ShoppingCart;
    case "food":
      return CreditCard;
    case "transport":
      return Wallet;
    default:
      return CreditCard;
  }
};

export default async function List02({ className }: List02Props) {
  const result = await getTransactions(10);
  const transactions = result.success ? result.data?.transactions : [];
  const totalCount = result.success ? result.data?.total : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NRS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
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
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Recent Transactions
            <span className="ml-1 font-normal text-xs text-zinc-600 dark:text-zinc-400">
              ({totalCount} total)
            </span>
          </h2>
        </div>

        <div className="space-y-1">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction: any) => {
              const Icon = getCategoryIcon(transaction.category?.name);
              return (
                <div
                  key={transaction.id}
                  className={cn(
                    "group flex items-center gap-3",
                    "rounded-lg p-2",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                    "transition-all duration-200",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      "bg-zinc-100 dark:bg-zinc-800",
                      "border border-zinc-200 dark:border-zinc-700",
                    )}
                  >
                    <Icon className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                        {transaction.category?.name || "Uncategorized"}
                      </h3>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        {transaction.remarks || transaction.account?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pl-3">
                      <span
                        className={cn(
                          "font-medium text-xs",
                          transaction.type === "Credit"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                      {transaction.type === "Credit" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No transactions yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border-zinc-100 border-t p-2 dark:border-zinc-800">
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-center gap-2",
            "rounded-lg px-3 py-2",
            "font-medium text-xs",
            "bg-gradient-to-r from-zinc-900 to-zinc-800",
            "dark:from-zinc-50 dark:to-zinc-200",
            "text-zinc-50 dark:text-zinc-900",
            "hover:from-zinc-800 hover:to-zinc-700",
            "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
            "shadow-sm hover:shadow",
            "transform transition-all duration-200",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-500 dark:focus:ring-zinc-400",
            "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
          )}
        >
          <span>View All Transactions</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
