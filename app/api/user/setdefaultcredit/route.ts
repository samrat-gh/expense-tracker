import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    console.log("Session found for user:", userId);

    // Parse request body
    const { initialAmount } = await request.json();

    // Validate initialAmount
    if (typeof initialAmount !== "number" || initialAmount < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid initial amount" },
        { status: 400 },
      );
    }

    // Find or create user in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found. Please complete registration.",
        },
        { status: 404 },
      );
    }

    const response = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        balance: initialAmount,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Default account created successfully",
      data: {
        accountId: response.id,
        balance: initialAmount,
        currency: response.currency,
      },
    });
  } catch (err) {
    console.error("Error creating default account:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Something went wrong!",
      },
      { status: 500 },
    );
  }
}
