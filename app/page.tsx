"use client";

import {
  ArrowRight,
  CheckCircle2,
  Globe,
  LineChart,
  PieChart,
  Shield,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Login from "@/components/login";
import Navbar from "@/components/nav";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 font-sans text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        {/* Spotlight Effect Background */}
        <div className="inset-0 h-full w-full overflow-hidden bg-background/95 bg-grid-foreground/[0.02] antialiased">
          <div className="pointer-events-none absolute top-0 left-0 z-0 h-[85vh] w-screen animate-spotlight opacity-0 transition-opacity duration-1000 md:left-60">
            <div className="h-full w-full bg-gradient-to-r from-primary/20 to-blue-900/40 blur-[100px]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div
            className={`transition-all delay-100 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <span className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/50 bg-accent/50 px-3 py-1 font-medium text-foreground/80 text-xs backdrop-blur-xl transition-colors hover:bg-accent">
              <Sparkles className="h-3.5 w-3.5 text-primary transition-colors group-hover:text-primary/80" />
              <span>Next-Gen Financial Intelligence</span>
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`mt-8 mb-6 max-w-4xl font-bold text-5xl text-foreground tracking-tight transition-all delay-200 duration-700 md:text-7xl ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Master Your Money <br />
            <span className="text-gradient-primary">With Precision</span>
          </h1>

          <p
            className={`mb-10 max-w-2xl text-lg text-muted-foreground transition-all delay-300 duration-700 md:text-xl ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Stop guessing. Start knowing. The first expense tracker designed for
            the digital economy—real-time, offline-capable, private by default.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex w-full flex-col gap-4 transition-all delay-400 duration-700 sm:w-auto sm:flex-row ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <Link
              href="/dashboard"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              <span className="mr-2">Start Tracking Free</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-accent/50 px-8 font-medium text-foreground backdrop-blur-sm transition-all hover:bg-accent"
            >
              How it Works
            </a>
          </div>

          {/* Floating Dashboard Interface */}
          <div
            className={`perspective-1000 relative mx-auto mt-20 w-full max-w-5xl transition-all delay-500 duration-1000 ${mounted ? "translate-y-0 rotate-x-12 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="group relative aspect-[16/10] animate-float-delayed overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-2xl ring-1 ring-border/20 backdrop-blur-md md:aspect-[21/9]">
              {/* Header */}
              <div className="flex h-10 items-center gap-2 border-border/50 border-b bg-accent/30 px-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
                  <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block h-5 w-48 rounded bg-accent/50" />
                </div>
              </div>

              {/* Grid content */}
              <div className="grid h-full grid-cols-12 gap-6 p-6">
                {/* Sidebar Mock */}
                <div className="col-span-2 hidden space-y-4 md:block">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-full animate-pulse rounded bg-accent/50"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>

                {/* Main Content */}
                <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-10 md:grid-cols-3">
                  {/* Chart Card */}
                  <div className="relative col-span-2 overflow-hidden rounded-lg border border-border/30 bg-card/30 p-4 transition-colors group-hover:border-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-4 h-6 w-32 rounded bg-accent/70" />
                    <div className="flex h-32 items-end justify-between gap-2">
                      {[40, 70, 45, 90, 60, 80, 50, 85].map((h, i) => (
                        <div
                          key={`idd-${i + 1}`}
                          className="w-full rounded-t-sm bg-primary/40 transition-colors duration-300 hover:bg-primary"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="space-y-4 rounded-lg border border-border/30 bg-card/30 p-4">
                    <div className="flex h-20 items-center justify-center rounded border border-green-500/10 bg-gradient-to-br from-green-500/10 to-green-500/5">
                      <span className="font-mono text-2xl text-green-400">
                        +$2,450.00
                      </span>
                    </div>
                    <div className="flex h-20 items-center justify-center rounded border border-red-500/10 bg-gradient-to-br from-red-500/10 to-red-500/5">
                      <span className="font-mono text-2xl text-red-400">
                        -$1,280.00
                      </span>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="col-span-3 flex h-24 flex-col gap-3 rounded-lg border border-border/30 bg-card/30 p-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-accent/70" />
                          <div className="h-4 w-32 rounded bg-accent/50" />
                        </div>
                        <div className="h-4 w-16 rounded bg-accent/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background glow base */}
        <div className="-translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] rounded-full bg-primary/20 blur-[120px]" />
      </section>

      {/* --- STATS TICKER --- */}
      <div className="w-full overflow-hidden border-border/20 border-y bg-accent/30 py-6 backdrop-blur-sm">
        <div className="flex w-[200%] animate-scroll items-center justify-around gap-10 whitespace-nowrap md:w-full">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Bank-Grade Encryption
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Globe className="h-5 w-5 text-purple-400" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Offline First Architecture
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Real-time Sync
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span className="font-mono text-sm uppercase tracking-wider">
              No Hidden Fees
            </span>
          </div>

          {/* Duplicate for seamless loop effect on smaller screens (concept only, requires marquee CSS) */}
          <div className="hidden items-center gap-3 text-muted-foreground md:flex">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Bank-Grade Encryption
            </span>
          </div>
        </div>
      </div>

      {/* --- BENTO FEATURES --- */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="mb-6 font-bold text-3xl md:text-5xl">
              Powered by{" "}
              <span className="text-gradient-primary">Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Every feature you need to control your wealth, reimagined for the
              modern era.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Large Card Left */}
            <div className="glass-card group relative overflow-hidden rounded-3xl p-8 md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col items-start justify-between">
                <div className="mb-6 rounded-xl border border-border/50 bg-accent/50 p-3 transition-colors group-hover:bg-primary/20">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-2xl">
                    Predictive Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your spending habits to forecast future cash
                    flow. Know you're safe before you spend.
                  </p>
                </div>
              </div>
              <div className="absolute top-20 right-0 opacity-20 transition-opacity group-hover:opacity-40">
                <div className="h-64 w-64 rounded-full border-[20px] border-primary/20 blur-2xl" />
              </div>
            </div>

            {/* Small Card Right Top */}
            <div className="glass-card group relative overflow-hidden rounded-3xl p-8">
              <div className="relative z-10">
                <div className="mb-6 w-fit rounded-xl border border-border/50 bg-accent/50 p-3 transition-colors group-hover:bg-purple-500/20">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 font-bold text-xl">Instant Capture</h3>
                <p className="text-muted-foreground text-sm">
                  Log transactions in under 3 seconds. Shortcuts, voice, or
                  widgets.
                </p>
              </div>
            </div>

            {/* Small Card Left Bottom */}
            <div className="glass-card group relative overflow-hidden rounded-3xl p-8">
              <div className="relative z-10">
                <div className="mb-6 w-fit rounded-xl border border-border/50 bg-accent/50 p-3 transition-colors group-hover:bg-green-500/20">
                  <PieChart className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="mb-2 font-bold text-xl">Smart Categories</h3>
                <p className="text-muted-foreground text-sm">
                  Auto-categorization that actually works. 99% accuracy rate.
                </p>
              </div>
            </div>

            {/* Large Card Right Bottom */}
            <div className="glass-card group relative overflow-hidden rounded-3xl p-8 md:col-span-2">
              <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  <div className="mb-6 w-fit rounded-xl border border-border/50 bg-accent/50 p-3 transition-colors group-hover:bg-blue-500/20">
                    <Wallet className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mb-2 font-bold text-2xl">
                    Multi-Currency Global Wallets
                  </h3>
                  <p className="text-muted-foreground">
                    Track unlimited accounts across 150+ currencies. Perfect for
                    digital nomads and global citizens. Real-time conversion
                    rates applied automatically.
                  </p>
                </div>
                <div className="relative flex aspect-square w-full animate-pulse items-center justify-center rounded-full border border-border/50 bg-accent/30 md:w-1/3">
                  <Globe className="h-16 w-16 text-muted-foreground/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Glass Shards) --- */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center font-bold text-3xl">
            Community <span className="text-gradient-primary">Trust</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                text: "The first finance app that doesn't feel like a spreadsheet. It actually makes me want to track my money. The design is impeccable.",
                author: "Alex V.",
                role: "Product Designer",
                avatar: "A",
              },
              {
                text: "Offline mode is a lifesaver. I travel constantly and need something that works on the plane, the subway, or in remote areas.",
                author: "Sarah K.",
                role: "Digital Nomad",
                avatar: "S",
              },
              {
                text: "Privacy focused, fast, and beautiful. Finally, an app that respects my data and looks good doing it.",
                author: "James R.",
                role: "Security Engineer",
                avatar: "J",
              },
            ].map((t, i) => (
              <div
                key={`feat-${i + 1}`}
                className="glass-panel hover:-translate-y-2 relative rounded-2xl p-6 transition-transform duration-300"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-accent/50 font-bold text-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.author}</h4>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <h2 className="mb-10 text-center font-bold text-3xl">
          Frequently Asked
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is it really free?",
              a: "Yes. Basic tracking is free forever. We only charge for advanced automation and team features.",
            },
            {
              q: "Is my data safe?",
              a: "Your data is encrypted locally on your device before it ever touches our servers. We cannot see your transactions.",
            },
            {
              q: "Does it connect to banks?",
              a: "Currently no. We focus on manual speed and privacy. Bank connections are coming in v2.0 as an optional plugin.",
            },
          ].map((faq, i) => (
            <details
              key={`faq-${i + 1}`}
              className="group glass-card rounded-xl"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium">
                {faq.q}
                <span className="transition-transform group-open:rotate-180">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative overflow-hidden px-4 py-32 text-center">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-8 font-bold text-5xl tracking-tighter md:text-7xl">
            Ready to <span className="text-gradient-primary">Ascend?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-xl">
            Join the new standard of personal finance. Fast, private, and
            unequivocally beautiful.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/dashboard"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              <span className="mr-2">Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-muted-foreground text-xs">
              No credit card required • Encrypted & Secure
            </p>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-full bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
