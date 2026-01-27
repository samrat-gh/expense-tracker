"use client";

import { Edit2, Loader, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from "@/lib/actions/account";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", type: "savings" });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    const result = await getAccounts();
    if (result.success && result.data) {
      setAccounts(result.data);
    }
    setLoading(false);
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.type) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        const result = await updateAccount(
          editingId,
          formData.name,
          formData.type,
        );
        if (result.success) {
          alert("Account updated successfully");
        }
      } else {
        const result = await createAccount(formData.name, formData.type);
        if (result.success) {
          alert("Account created successfully");
        }
      }
      setFormData({ name: "", type: "savings" });
      setEditingId(null);
      setIsCreateModalOpen(false);
      await loadAccounts();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleEdit = (account: Account) => {
    setFormData({ name: account.name, type: account.type });
    setEditingId(account.id);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this account?")) {
      return;
    }

    try {
      const result = await deleteAccount(id);
      if (result.success) {
        alert("Account deleted successfully");
        await loadAccounts();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", type: "savings" });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NRS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
            Accounts
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your bank accounts and financial accounts
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
          Add Account
        </button>
      </div>

      {/* Accounts Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin" />
        </div>
      ) : accounts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]",
                "hover:border-gray-300 dark:hover:border-[#2F2F37]",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {account.name}
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                    {account.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="rounded-lg p-2 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4 border-gray-200 border-t pt-4 dark:border-gray-700">
                <p className="text-gray-600 text-xs dark:text-gray-400">
                  Balance
                </p>
                <h4 className="font-bold text-2xl text-gray-900 dark:text-white">
                  {formatCurrency(account.balance)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <p className="text-gray-600 dark:text-gray-400">
            No accounts yet. Create one to get started.
          </p>
        </div>
      )}

      {/* Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-[#0F0F12]">
            <h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">
              {editingId ? "Edit Account" : "Create Account"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Main Savings"
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

              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Account Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-lg border border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-900",
                    "px-3 py-2",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                >
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="checking">Checking</option>
                  <option value="other">Other</option>
                </select>
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
                  onClick={handleCreateOrUpdate}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2",
                    "bg-zinc-900 dark:bg-zinc-50",
                    "text-zinc-50 dark:text-zinc-900",
                    "font-medium",
                    "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                    "transition-colors duration-200",
                  )}
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
