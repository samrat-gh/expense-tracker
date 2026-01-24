import Login from "./login";
import Logo from "./logo";
import { ModeToggle } from "./theme-menu";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-border/40 border-b bg-purple-800 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Login />
        </div>
      </div>
    </nav>
  );
}
