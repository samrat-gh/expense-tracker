import { NextResponse } from "next/server";
import { resetUserCategories } from "@/lib/actions/user";
import { getSession } from "@/lib/auth-server";

export async function POST() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const result = await resetUserCategories();

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error resetting categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reset categories" },
      { status: 500 },
    );
  }
}
