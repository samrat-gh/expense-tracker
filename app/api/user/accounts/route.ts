import { NextResponse } from "next/server";
import { initializeUserDefaults } from "@/lib/actions/user";
import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      console.log("no session found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    let accounts = await prisma.userAccount.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        isDefault: true,
      },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    // If user has no accounts, initialize defaults
    if (accounts.length === 0) {
      const initResult = await initializeUserDefaults(session.user.id);
      if (initResult.success) {
        // Fetch the newly created accounts
        accounts = await prisma.userAccount.findMany({
          where: { userId: session.user.id },
          select: {
            id: true,
            name: true,
            isDefault: true,
          },
          orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch accounts" },
      { status: 500 },
    );
  }
}
