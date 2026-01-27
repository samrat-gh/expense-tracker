"use client";

import { Edit2, Loader, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/actions/category";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  transactionCount: number;
  totalAmount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const result = await getCategories();
    if (result.success && result.data) {
      setCategories(result.data);
    }
    setLoading(false);
  };

  const handleCreateOrUpdate = async () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      if (editingId) {
        const result = await updateCategory(editingId, categoryName);
        if (result.success) {
          alert("Category updated successfully");
        }
      } else {
        const result = await createCategory(categoryName);
        if (result.success) {
          alert("Category created successfully");
        } else {
          alert(result.message || "Failed to create category");
        }
      }
      setCategoryName("");
      setEditingId(null);
      setIsCreateModalOpen(false);
      await loadCategories();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryName(category.name);
    setEditingId(category.id);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const result = await deleteCategory(id);
      if (result.success) {
        alert("Category deleted successfully");
        await loadCategories();
      } else {
        alert(result.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingId(null);
    setCategoryName("");
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
            Categories
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Organize your transactions by category
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
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin" />
        </div>
      ) : categories.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-gray-200 border-b dark:border-gray-700">
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm dark:text-white">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-900 text-sm dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-gray-200 border-b transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-sm dark:bg-blue-900/30 dark:text-blue-300">
                        {category.transactionCount}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(category.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="rounded-lg p-2 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
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
            No categories yet. Create one to organize your transactions.
          </p>
        </div>
      )}

      {/* Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-[#0F0F12]">
            <h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">
              {editingId ? "Edit Category" : "Create Category"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Groceries, Transportation, Entertainment"
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
