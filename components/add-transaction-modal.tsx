"use client";

import type React from "react";
import { useCallback, useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTransaction } from "@/lib/actions/transaction";

interface BankAccount {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddTransactionModal({
  isOpen,
  onOpenChange,
}: AddTransactionModalProps) {
  const amountId = useId();
  const accountId = useId();
  const categoryId = useId();
  const typeId = useId();
  const methodId = useId();
  const remarksId = useId();

  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [formData, setFormData] = useState({
    accountId: "",
    categoryId: "",
    amount: "",
    type: "Debit",
    method: "Online",
    remarks: "",
  });

  // Fetch accounts and categories when modal opens
  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const [accountsRes, categoriesRes] = await Promise.all([
        fetch("/api/user/accounts"),
        fetch("/api/user/categories"),
      ]);

      if (accountsRes.ok) {
        const data = await accountsRes.json();
        setAccounts(data.data || []);
      }

      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value ? parseFloat(value) : "") : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.accountId || !formData.categoryId || !formData.amount) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await createTransaction(
        formData.accountId,
        formData.categoryId,
        typeof formData.amount === "string"
          ? parseFloat(formData.amount)
          : formData.amount,
        formData.type as "Credit" | "Debit",
        formData.method as "Cash" | "Online",
        formData.remarks || undefined,
      );

      if (result.success) {
        // Reset form and close modal
        setFormData({
          accountId: "",
          categoryId: "",
          amount: "",
          type: "Debit",
          method: "Online",
          remarks: "",
        });
        onOpenChange(false);
        // Optionally show success message
        toast.success("Transaction added successfully!");
      } else {
        toast.error(result.message || "Failed to create transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("An error occurred while creating the transaction");
    } finally {
      setLoading(false);
    }
  };
  console.log("accounts", accounts);
  console.log("categories", categories);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm bg-neutral-800">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        {fetching ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor={amountId}>Amount</Label>
              <Input
                id={amountId}
                name="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Account */}
            <div className="space-y-2">
              <label htmlFor={accountId}>Account</label>
              <select
                id={accountId}
                name="accountId"
                value={formData.accountId}
                onChange={(e) =>
                  handleSelectChange("accountId", e.target.value)
                }
                className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                required
              >
                <option value="" disabled>
                  Select account
                </option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor={categoryId}>Category</label>
              <select
                id={categoryId}
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) =>
                  handleSelectChange("categoryId", e.target.value)
                }
                className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label htmlFor={typeId}>Type</label>
              <select
                id={typeId}
                name="type"
                value={formData.type}
                onChange={(e) => handleSelectChange("type", e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Credit">Credit (Income)</option>
                <option value="Debit">Debit (Expense)</option>
              </select>
            </div>

            {/* Method */}
            <div className="space-y-2">
              <label htmlFor={methodId}>Method</label>
              <select
                id={methodId}
                name="method"
                value={formData.method}
                onChange={(e) => handleSelectChange("method", e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Online">Online</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor={remarksId}>Remarks (Optional)</Label>
              <textarea
                id={remarksId}
                name="remarks"
                placeholder="Add notes..."
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-700"
              >
                {loading ? "Adding..." : "Add Transaction"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
