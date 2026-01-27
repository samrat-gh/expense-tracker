import { getCurrency } from "@/lib/actions/get-currency";
import { getUserBalance, setDefaultCredit } from "@/lib/actions/user";
import { requireAuth } from "@/lib/auth-server";

const Page = async () => {
  const session = await requireAuth();
  const userId = session.user.id;

  const currency = getCurrency();
  console.log("User ID:", userId);

  const data = await setDefaultCredit(1000);
  console.log("Response data:", data);

  // Fetch current balance
  const userBalance = await getUserBalance();
  const totalBalance = userBalance.data?.balance ?? `${currency} 0.00`;
  console.log("Balance:", totalBalance);

  return (
    <div className="p-8">
      <h1 className="mb-4 font-bold text-2xl">Test Page</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Set Default Credit Result:</h2>
          <pre className="rounded bg-gray-100 p-4 text-black">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <div>
          <h2 className="font-semibold">Current Balance:</h2>
          <pre className="rounded bg-gray-100 p-4 text-black">
            {JSON.stringify(totalBalance, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Page;
