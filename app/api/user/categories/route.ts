import { NextResponse } from "next/server";
import { initializeUserDefaults } from "@/lib/actions/user";
import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    let categories = await prisma.category.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // If user has no categories, initialize defaults
    if (categories.length === 0) {
      const initResult = await initializeUserDefaults(session.user.id);
      if (initResult.success) {
        // Fetch the newly created categories
        categories = await prisma.category.findMany({
          where: { userId: session.user.id },
          select: {
            id: true,
            name: true,
          },
          orderBy: { createdAt: "desc" },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
