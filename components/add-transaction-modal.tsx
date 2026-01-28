"use client";

import { useCallback, useEffect, useId, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      alert("Please fill in all required fields");
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
        alert("Transaction added successfully!");
      } else {
        alert(result.message || "Failed to create transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("An error occurred while creating the transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
        <DialogHeader>
          <DialogTitle className="font-bold text-gray-900 text-xl dark:text-white">
            Add Transaction
          </DialogTitle>
        </DialogHeader>

        {fetching ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor={amountId} className="font-medium text-sm">
                Amount
              </Label>
              <Input
                id={amountId}
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="bg-gray-50 dark:bg-input/50"
              />
            </div>

            {/* Account */}
            <div className="space-y-2">
              <Label htmlFor={accountId} className="font-medium text-sm">
                Account
              </Label>
              <Select
                value={formData.accountId}
                onValueChange={(value) =>
                  handleSelectChange("accountId", value)
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-input/50">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.id}
                      value={account.id}
                      className="text-white"
                    >
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor={categoryId} className="font-medium text-sm">
                Category
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  handleSelectChange("categoryId", value)
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-input/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor={typeId} className="font-medium text-sm">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="bg-gray-50 dark:bg-input/50 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Debit">Debit (Expense)</SelectItem>
                  <SelectItem value="Credit">Credit (Income)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Method */}
            <div className="space-y-2">
              <Label htmlFor={methodId} className="font-medium text-sm">
                Method
              </Label>
              <Select
                value={formData.method}
                onValueChange={(value) => handleSelectChange("method", value)}
              >
                <SelectTrigger className="bg-gray-50 dark:bg-input/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor={remarksId} className="font-medium text-sm">
                Remarks (Optional)
              </Label>
              <textarea
                id={remarksId}
                name="remarks"
                placeholder="Add notes..."
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:ring-[3px] focus:ring-ring/50 dark:border-[#1F1F23] dark:bg-input/50"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
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
                className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
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
