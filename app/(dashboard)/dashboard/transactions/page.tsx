"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Loader,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAccounts } from "@/lib/actions/account";
import { getCategories } from "@/lib/actions/category";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "@/lib/actions/transaction";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: "Credit" | "Debit";
  method: "Cash" | "Online";
  remarks?: string;
  date: Date | string;
  account?: { name: string };
  category?: { name: string };
}

interface Account {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: "",
    categoryId: "",
    amount: 0,
    type: "Debit" as "Debit" | "Credit",
    method: "Cash" as "Cash" | "Online",
    remarks: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [transRes, accRes, catRes] = await Promise.all([
      getTransactions(50),
      getAccounts(),
      getCategories(),
    ]);

    if (transRes.success && transRes.data?.transactions) {
      setTransactions(transRes.data.transactions);
    }
    if (accRes.success && accRes.data) {
      setAccounts(accRes.data);
    }
    if (catRes.success && catRes.data) {
      setCategories(catRes.data);
    }
    setLoading(false);
  };

  const handleCreateTransaction = async () => {
    if (!formData.accountId || !formData.categoryId || formData.amount <= 0) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const result = await createTransaction(
        formData.accountId,
        formData.categoryId,
        formData.amount,
        formData.type,
        formData.method,
        formData.remarks,
      );

      if (result.success) {
        alert("Transaction created successfully");
        setFormData({
          accountId: "",
          categoryId: "",
          amount: 0,
          type: "Debit",
          method: "Cash",
          remarks: "",
        });
        setIsCreateModalOpen(false);
        await loadData();
      } else {
        alert(result.message || "Failed to create transaction");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const result = await deleteTransaction(id);
      if (result.success) {
        alert("Transaction deleted successfully");
        await loadData();
      } else {
        alert(result.message || "Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setFormData({
      accountId: "",
      categoryId: "",
      amount: 0,
      type: "Debit",
      method: "Cash",
      remarks: "",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NRS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage all your financial transactions
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={cn(
            "flex items-center gap-2",
            "rounded-lg px-4 py-2",
            "bg-zinc-900 dark:bg-zinc-50",
            "text-zinc-50 dark:text-zinc-900",
            "font-medium text-sm",
            "hover:bg-zinc-800 dark:hover:bg-zinc-200",
            "transition-colors duration-200",
          )}
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </button>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin" />
        </div>
      ) : transactions.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-gray-200 border-b dark:border-gray-700">
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Method
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-900 text-sm dark:text-white">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-900 text-sm dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-gray-200 border-b transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-3">
                      <span className="text-gray-900 text-sm dark:text-white">
                        {formatDate(transaction.date)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-medium text-gray-900 text-sm dark:text-white">
                        {transaction.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-gray-600 text-sm dark:text-gray-400">
                        {transaction.account?.name}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium text-sm",
                          transaction.type === "Credit"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
                        )}
                      >
                        {transaction.type === "Credit" ? (
                          <ArrowDownLeft className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-gray-600 text-sm dark:text-gray-400">
                        {transaction.method}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span
                        className={cn(
                          "font-semibold text-sm",
                          transaction.type === "Credit"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="rounded-lg p-2 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <p className="text-gray-600 dark:text-gray-400">
            No transactions yet. Create one to get started.
          </p>
        </div>
      )}

      {/* Create Transaction Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 dark:bg-[#0F0F12]">
            <h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">
              Create Transaction
            </h2>

            <div className="space-y-4">
              {/* Account */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Account
                </label>
                <select
                  value={formData.accountId}
                  onChange={(e) =>
                    setFormData({ ...formData, accountId: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                >
                  <option value="">Select an account</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  min="0"
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "placeholder-gray-500 dark:placeholder-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                />
              </div>

              {/* Type */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "Debit" | "Credit",
                    })
                  }
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                >
                  <option value="Debit">Debit (Expense)</option>
                  <option value="Credit">Credit (Income)</option>
                </select>
              </div>

              {/* Method */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Method
                </label>
                <select
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      method: e.target.value as "Cash" | "Online",
                    })
                  }
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  placeholder="Add notes about this transaction"
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "placeholder-gray-500 dark:placeholder-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2",
                    "border border-gray-300 dark:border-gray-700",
                    "text-gray-900 dark:text-white",
                    "font-medium",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "transition-colors duration-200",
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTransaction}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2",
                    "bg-zinc-900 dark:bg-zinc-50",
                    "text-zinc-50 dark:text-zinc-900",
                    "font-medium",
                    "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                    "transition-colors duration-200",
                  )}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
