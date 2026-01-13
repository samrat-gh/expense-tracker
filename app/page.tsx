import { ModeToggle } from "@/components/theme-menu";
import Login from "@/components/login";

export default function Home() {
  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Expense Tracker</h1>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Login />
        </div>
      </header>
    </div>
  );
}
