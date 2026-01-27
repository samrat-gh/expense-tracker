"use server";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function createTransaction(
  accountId: string,
  categoryId: string,
  amount: number,
  type: "Credit" | "Debit",
  method: "Cash" | "Online",
  remarks?: string,
) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (typeof amount !== "number" || amount <= 0) {
      return {
        success: false,
        message: "Invalid amount",
      };
    }

    const userId = session.user.id;

    // Verify account and category belong to user
    const [account, category] = await Promise.all([
      prisma.bankAccount.findFirst({
        where: { id: accountId, userId },
      }),
      prisma.category.findFirst({
        where: { id: categoryId, userId },
      }),
    ]);

    if (!account || !category) {
      return {
        success: false,
        message: "Account or category not found",
      };
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        accountId,
        categoryId,
        amount,
        type,
        method,
        remarks,
      },
      include: {
        account: true,
        category: true,
      },
    });

    return {
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    };
  } catch (err) {
    console.error("Error creating transaction:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}

export async function getTransactions(limit = 10, offset = 0) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
      take: limit,
      skip: offset,
      include: {
        account: true,
        category: true,
      },
    });

    const total = await prisma.transaction.count({
      where: { userId: session.user.id },
    });

    return {
      success: true,
      data: {
        transactions,
        total,
        limit,
        offset,
      },
    };
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
      data: null,
    };
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: session.user.id,
      },
    });

    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found",
      };
    }

    await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return {
      success: true,
      message: "Transaction deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting transaction:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}
