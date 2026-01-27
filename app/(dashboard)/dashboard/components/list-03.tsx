import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { getCategories } from "@/lib/actions/category";
import { cn } from "@/lib/utils";

interface List03Props {
  className?: string;
}

export default async function List03({ className }: List03Props) {
  const result = await getCategories();
  const categories = result.success ? result.data : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NRS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total spending
  const totalSpending = categories.reduce(
    (sum, cat) => sum + cat.totalAmount,
    0,
  );

  // Sort by spending
  const sortedCategories = [...categories].sort(
    (a, b) => b.totalAmount - a.totalAmount,
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        {/* Summary Card */}
        {categories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Total Spending */}
            <div
              className={cn(
                "rounded-xl p-6",
                "bg-white dark:bg-zinc-900/70",
                "border border-zinc-100 dark:border-zinc-800",
                "shadow-sm backdrop-blur-xl",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Total Across Categories
                  </p>
                  <h2 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(totalSpending)}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {categories.length} categories
                  </p>
                </div>
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Average Spending */}
            <div
              className={cn(
                "rounded-xl p-6",
                "bg-white dark:bg-zinc-900/70",
                "border border-zinc-100 dark:border-zinc-800",
                "shadow-sm backdrop-blur-xl",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Average Per Category
                  </p>
                  <h2 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(
                      categories.length > 0
                        ? totalSpending / categories.length
                        : 0,
                    )}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    Across all categories
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div
          className={cn(
            "rounded-xl",
            "bg-white dark:bg-zinc-900/70",
            "border border-zinc-100 dark:border-zinc-800",
            "shadow-sm backdrop-blur-xl",
          )}
        >
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Category Breakdown
            </h3>

            {categories.length > 0 ? (
              <div className="space-y-3">
                {sortedCategories.map((category, index) => {
                  const percentage =
                    totalSpending > 0
                      ? (category.totalAmount / totalSpending) * 100
                      : 0;
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                              {category.name}
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              {category.transactionCount} transaction
                              {category.transactionCount !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {formatCurrency(category.totalAmount)}
                          </p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No categories yet. Create one to track spending.
                </p>
              </div>
            )}
          </div>

          {categories.length > 0 && (
            <div className="border-zinc-100 border-t p-3 dark:border-zinc-800">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-center gap-2",
                  "rounded-lg px-3 py-2.5",
                  "font-medium text-xs",
                  "text-zinc-600 dark:text-zinc-400",
                  "hover:text-zinc-900 dark:hover:text-zinc-100",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-colors duration-200",
                )}
              >
                View All Categories
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
