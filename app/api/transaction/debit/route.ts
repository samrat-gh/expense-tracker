import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: Implement debit transaction endpoint
  return NextResponse.json(
    { success: false, message: "Not implemented" },
    { status: 501 },
  );
}
