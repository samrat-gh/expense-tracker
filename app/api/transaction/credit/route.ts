import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.BACKEND_URL}/endpoint`, {
      method: "GET",
      headers: {
        Authorization: `Bearer token`,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      console.log("fetch failed", res.statusText);
    }

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "fetch failed");
    }
  } catch (err: any) {
    console.log("Error", err);
    return {
      success: false,
      messsage: err?.message || "something went wrong!",
    };
  }
}
