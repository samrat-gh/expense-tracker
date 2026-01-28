"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddTransactionModal from "@/components/add-transaction-modal";
import { Button } from "@/components/ui/button";

export default function AddTransactionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon-lg"
        className="fixed right-8 bottom-8 z-40 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-all hover:scale-110 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
      >
        <Plus className="h-6 w-6" />
      </Button>
      <AddTransactionModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
