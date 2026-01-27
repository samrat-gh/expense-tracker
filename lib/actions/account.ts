"use server";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function getAccounts() {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const accounts = await prisma.bankAccount.findMany({
      where: { userId: session.user.id },
      include: {
        transactions: {
          select: {
            amount: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate balance for each account
    const accountsWithBalance = accounts.map((account) => {
      const balance = account.transactions.reduce((sum: number, tx: any) => {
        return tx.type === "Credit" ? sum + tx.amount : sum - tx.amount;
      }, 0);

      return {
        id: account.id,
        name: account.name,
        type: account.type,
        balance,
        createdAt: account.createdAt,
      };
    });

    return {
      success: true,
      data: accountsWithBalance,
    };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return {
      success: false,
      message: "Failed to fetch accounts",
      data: null,
    };
  }
}

export async function createAccount(name: string, type: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!name || !type) {
      return {
        success: false,
        message: "Name and type are required",
      };
    }

    const account = await prisma.bankAccount.create({
      data: {
        userId: session.user.id,
        name,
        type,
      },
    });

    return {
      success: true,
      data: account,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Failed to create account",
    };
  }
}

export async function updateAccount(
  accountId: string,
  name: string,
  type: string,
) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const account = await prisma.bankAccount.findFirst({
      where: {
        id: accountId,
        userId: session.user.id,
      },
    });

    if (!account) {
      return {
        success: false,
        message: "Account not found",
      };
    }

    const updated = await prisma.bankAccount.update({
      where: { id: accountId },
      data: { name, type },
    });

    return {
      success: true,
      data: updated,
      message: "Account updated successfully",
    };
  } catch (error) {
    console.error("Error updating account:", error);
    return {
      success: false,
      message: "Failed to update account",
    };
  }
}

export async function deleteAccount(accountId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const account = await prisma.bankAccount.findFirst({
      where: {
        id: accountId,
        userId: session.user.id,
      },
    });

    if (!account) {
      return {
        success: false,
        message: "Account not found",
      };
    }

    await prisma.bankAccount.delete({
      where: { id: accountId },
    });

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting account:", error);
    return {
      success: false,
      message: "Failed to delete account",
    };
  }
}
