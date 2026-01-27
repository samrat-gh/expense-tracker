"use server";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function getCategories() {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const categories = await prisma.category.findMany({
      where: { userId: session.user.id },
      include: {
        transactions: {
          select: {
            id: true,
            amount: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Add transaction count and total amount
    const categoriesWithStats = categories.map((category) => ({
      id: category.id,
      name: category.name,
      transactionCount: category.transactions.length,
      totalAmount: category.transactions.reduce(
        (sum, tx) => sum + tx.amount,
        0,
      ),
      createdAt: category.createdAt,
    }));

    return {
      success: true,
      data: categoriesWithStats,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
      data: null,
    };
  }
}

export async function createCategory(name: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!name || name.trim().length === 0) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    // Check if category already exists
    const existing = await prisma.category.findFirst({
      where: {
        userId: session.user.id,
        name: name.toLowerCase(),
      },
    });

    if (existing) {
      return {
        success: false,
        message: "Category already exists",
      };
    }

    const category = await prisma.category.create({
      data: {
        userId: session.user.id,
        name,
      },
    });

    return {
      success: true,
      data: category,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      message: "Failed to create category",
    };
  }
}

export async function updateCategory(categoryId: string, name: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: session.user.id,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });

    return {
      success: true,
      data: updated,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      message: "Failed to update category",
    };
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: session.user.id,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    // Check if category has transactions
    const transactionCount = await prisma.transaction.count({
      where: { categoryId },
    });

    if (transactionCount > 0) {
      return {
        success: false,
        message: "Cannot delete category with transactions",
      };
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message: "Failed to delete category",
    };
  }
}
