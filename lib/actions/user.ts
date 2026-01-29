"use server";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function setDefaultCredit(initialAmount: number) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userId = session.user.id;

    // Validate initialAmount
    if (typeof initialAmount !== "number" || initialAmount < 0) {
      return {
        success: false,
        message: "Invalid initial amount",
      };
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found. Please complete registration.",
      };
    }

    // Update user balance
    const response = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        balance: initialAmount,
      },
    });

    return {
      success: true,
      message: "Default account created successfully",
      data: {
        accountId: response.id,
        balance: initialAmount,
        currency: response.currency,
      },
    };
  } catch (err) {
    console.error("Error creating default account:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}

export async function getUserBalance() {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        balance: true,
        currency: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (err) {
    console.error("Error fetching user balance:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}

export async function initializeUserDefaults(userId: string) {
  try {
    // Check if user already has defaults
    const existingCategories = await prisma.category.findFirst({
      where: { userId },
    });

    const existingAccount = await prisma.userAccount.findFirst({
      where: { userId },
    });

    // If user already has categories and account, don't create again
    if (existingCategories && existingAccount) {
      return {
        success: true,
        message: "User already has default categories and account",
        data: {
          categories: [],
          account: { id: existingAccount.id, name: existingAccount.name },
        },
      };
    }

    // Default categories
    const defaultCategories = [
      "Groceries",
      "Utilities",
      "Entertainment",
      "Dining",
      "Transportation",
      "Salary",
      "Investment",
      "Other",
    ];

    // Create categories only if they don't exist
    const categories = !existingCategories
      ? await Promise.all(
          defaultCategories.map((name) =>
            prisma.category.create({
              data: {
                userId,
                name,
                type: "expense",
              },
            }),
          ),
        )
      : [];

    // Create default Savings account only if it doesn't exist
    const account = existingAccount
      ? existingAccount
      : await prisma.userAccount.create({
          data: {
            userId,
            name: "Savings",
            type: "savings",
          },
        });

    return {
      success: true,
      message: "Default categories and account initialized successfully",
      data: {
        categories: categories.map((c) => ({ id: c.id, name: c.name })),
        account: { id: account.id, name: account.name },
      },
    };
  } catch (err) {
    console.error("Error initializing user defaults:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}
