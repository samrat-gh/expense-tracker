import { requireAuth } from "@/lib/auth-server";

const Page = async () => {
  const session = await requireAuth();
  const userId = session.user.id;
  console.log("User ID:", userId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/setdefaultcredit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initialAmount: 1000 }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.log("Request failed", res.statusText);
  }
  const data = await res.json();
  console.log("Response data:", data);

  return (
    <div>
      Test Page
      {JSON.stringify(data)}
    </div>
  );
};

export default Page;
