import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { productConfig } from "@/data/config";

export const metadata: Metadata = {
  title: productConfig.metaTitle,
  description: productConfig.metaDescription,
};

const PatternGradient = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 dark:bg-[#020617] dark:text-white">
      {/* Light Mode - Purple Glow Top */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(173, 109, 244, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark Mode - Purple Radial Glow */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PatternGradient>
      <ClerkProvider
        appearance={{
          elements: {
            logo: "hidden",
            footer: "hidden",
            cardFooter: "hidden",
            userButtonPopoverFooter: "hidden",
          },
        }}
      >
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className="antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </PatternGradient>
  );
}
