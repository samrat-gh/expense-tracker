import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "FlowTrack - Know Where Your Money Goes",
  description:
    "Track income and expenses in seconds. Visualize your cash flow instantly. Built for freelancers and creators with variable income.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.25),transparent_70%)]" />

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
    </div>
  );
}
