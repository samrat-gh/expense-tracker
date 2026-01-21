"use client";

import {
  ArrowRight,
  BarChart3,
  Globe,
  LineChart,
  PieChart,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "@/components/login";
import { ModeToggle } from "@/components/theme-menu";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-border/40 border-b bg-purple-800 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlowTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Login />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 sm:pt-32 lg:px-8">
        {/* Background decorations */}
        <div className="-z-10 absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="-z-10 absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]"></div>
        <div className="-translate-x-1/2 -translate-y-1/2 -z-10 absolute top-1/2 left-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-primary/5 to-transparent"></div>

        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <div
            className={`mb-8 flex justify-center transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="inline-flex cursor-default items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-medium text-sm transition-colors hover:bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary">
                Built for freelancers & creators
              </span>
            </div>
          </div>

          {/* Heading */}
          <div
            className={`mb-8 text-center transition-all delay-100 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="mb-6 text-balance font-bold text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="mb-2 block">Know Exactly Where</span>
              <span className="gradient-text">Your Money Goes</span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-12 max-w-3xl text-balance text-lg text-muted-foreground leading-relaxed sm:text-xl lg:text-2xl">
              Stop the guesswork. Track every dollar in seconds, visualize your
              cash flow instantly, and make smarter financial decisions—no
              spreadsheets required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`mb-16 flex flex-col justify-center gap-4 transition-all delay-200 duration-700 sm:mb-20 sm:flex-row ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/dashboard"
              className="group hover:-translate-y-0.5 rounded-xl px-8 py-3 font-semibold text-base shadow-primary/25 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 dark:bg-purple-50 dark:text-black dark:hover:bg-white dark:hover:text-purple-900"
            >
              Start Tracking
              <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-xl px-8 font-semibold text-base transition-all duration-300 hover:bg-muted/50"
            >
              Watch Demo
            </Button> */}
          </div>

          {/* Hero Image */}
          <div
            className={`relative transition-all delay-300 duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-card via-muted/30 to-card">
                {/* Mock dashboard UI */}
                <div className="absolute inset-4 overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm sm:inset-8">
                  {/* Mock header */}
                  <div className="flex h-12 items-center gap-3 border-border/50 border-b px-4 sm:h-14">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-destructive/60"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500/60"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="flex flex-1 justify-center">
                      <div className="h-6 w-48 rounded-md bg-muted/50"></div>
                    </div>
                  </div>
                  {/* Mock content */}
                  <div className="grid grid-cols-3 gap-4 p-4 sm:p-6">
                    <div className="col-span-2 space-y-4">
                      <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 sm:h-40">
                        <BarChart3 className="h-12 w-12 text-primary/40 sm:h-16 sm:w-16" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 rounded-lg bg-muted/30"></div>
                        <div className="h-20 rounded-lg bg-muted/30"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-24 rounded-lg bg-muted/30"></div>
                      <div className="h-24 rounded-lg bg-muted/30"></div>
                      <div className="h-24 rounded-lg bg-muted/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-border/50 border-y bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {[
              { number: "50K+", label: "Active Users", icon: "👥" },
              { number: "$2.3B", label: "Money Tracked", icon: "💰" },
              { number: "10M+", label: "Transactions", icon: "📊" },
              { number: "99.9%", label: "Uptime", icon: "⚡" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group cursor-default text-center"
              >
                <div className="mb-2 text-2xl">{stat.icon}</div>
                <p className="mb-2 font-bold text-3xl text-foreground transition-colors group-hover:text-primary sm:text-4xl lg:text-5xl">
                  {stat.number}
                </p>
                <p className="font-medium text-muted-foreground text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              Features
            </span>
            <h2 className="mb-6 text-balance font-bold text-4xl sm:text-5xl">
              Everything You Need to
              <span className="gradient-text"> Master Your Money</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Powerful tools designed for real life, not spreadsheet experts
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Logging",
                description:
                  "Log income and expenses in under 3 seconds. No forms, no friction, just pure speed.",
                highlight: "3 seconds",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: PieChart,
                title: "Smart Categories",
                description:
                  "AI-powered suggestions learn from your patterns and categorize automatically.",
                highlight: "AI-Powered",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: LineChart,
                title: "Real-Time Insights",
                description:
                  "See your cash flow patterns instantly. Visual charts that actually tell you something useful.",
                highlight: "Live Data",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Wallet,
                title: "Flexible Budgeting",
                description:
                  "Built for variable income. No rigid budgets, just clear tracking and smart insights.",
                highlight: "Adaptive",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Hover gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`}
                  ></div>

                  <div className="relative flex items-start gap-5">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex flex-shrink-0 items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-bold text-xl transition-colors group-hover:text-primary sm:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <span
                        className={`inline-block rounded-full bg-gradient-to-r px-3 py-1.5 font-semibold text-xs ${feature.gradient} text-white shadow-sm`}
                      >
                        {feature.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              How It Works
            </span>
            <h2 className="mb-6 font-bold text-4xl sm:text-5xl">
              Three Steps to <span className="gradient-text">Clarity</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl">
              From chaos to control in minutes, not hours
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Log Your Transactions",
                description:
                  "Record income and expenses instantly. Works anywhere, anytime, even offline.",
                icon: "✏️",
              },
              {
                step: "2",
                title: "Watch Patterns Emerge",
                description:
                  "Our smart system organizes everything and reveals your spending habits automatically.",
                icon: "📈",
              },
              {
                step: "3",
                title: "Make Smarter Decisions",
                description:
                  "See the full picture and take control with confidence. No finance degree needed.",
                icon: "🎯",
              },
            ].map((item, index) => (
              <div key={item.step} className="group relative">
                {/* Connector line */}
                {index < 2 && (
                  <div className="-right-4 absolute top-16 z-10 hidden h-0.5 w-8 bg-gradient-to-r from-primary/50 to-transparent md:block"></div>
                )}

                <div className="relative h-full rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl">
                  {/* Step number badge */}
                  <div className="-top-4 absolute left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-bold text-sm text-white shadow-lg">
                    {item.step}
                  </div>

                  <div className="pt-4">
                    <span className="mb-4 block text-4xl">{item.icon}</span>
                    <h3 className="mb-3 font-bold text-xl transition-colors group-hover:text-primary sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              All-In-One
            </span>
            <h2 className="mb-6 text-balance font-bold text-4xl sm:text-5xl">
              Packed with <span className="gradient-text">Everything</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { text: "Instant transaction logging", icon: Zap },
              { text: "Smart expense categorization", icon: PieChart },
              { text: "Beautiful dashboards", icon: BarChart3 },
              { text: "Real-time cash flow charts", icon: LineChart },
              { text: "Flexible budget insights", icon: Wallet },
              { text: "One-click data export", icon: ArrowRight },
              { text: "Offline mode with sync", icon: Globe },
              { text: "Bank-level security", icon: Shield },
              { text: "Multi-currency support", icon: Globe },
              { text: "Recurring detection", icon: TrendingUp },
              { text: "Financial reports", icon: BarChart3 },
              { text: "Mobile-first design", icon: Sparkles },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.text}
                  className="group flex cursor-default items-center gap-3 rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              Testimonials
            </span>
            <h2 className="mb-6 font-bold text-4xl sm:text-5xl">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Join the community that's taken control of their finances
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Finally, a tool that gets variable income. No more end-of-month panic.",
                author: "Sarah Chen",
                role: "Freelance Designer",
                avatar: "👩‍🎨",
              },
              {
                quote:
                  "I can see exactly where every dollar goes. It's completely changed my relationship with money.",
                author: "Marcus Johnson",
                role: "Content Creator",
                avatar: "👨‍💻",
              },
              {
                quote:
                  "The simplicity is unreal. I actually stick with it and use it every single day.",
                author: "Elena Rodriguez",
                role: "Business Consultant",
                avatar: "👩‍💼",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.author}
                className="group rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl"
              >
                {/* Star rating */}
                <div className="mb-6 flex gap-1">
                  {Array.from(
                    { length: 5 },
                    (_, starIndex) => starIndex + 1,
                  ).map((star) => (
                    <span key={star} className="text-lg text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="mb-8 text-foreground text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
              FAQ
            </span>
            <h2 className="font-bold text-4xl sm:text-5xl">
              Got <span className="gradient-text">Questions?</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is my financial data secure?",
                a: "Absolutely. We use bank-level 256-bit encryption. Your data is never shared or sold. You maintain complete ownership and control.",
              },
              {
                q: "Can I import transactions from my bank?",
                a: "Bank import is on our roadmap! For now, our optimized interface makes logging take just seconds—many users prefer it.",
              },
              {
                q: "What if I have multiple income sources?",
                a: "FlowTrack was built exactly for this. Tag income sources, track multiple streams, and see your complete financial picture in one place.",
              },
              {
                q: "Is there a free version?",
                a: "Yes! Start free with unlimited transactions. Premium unlocks advanced analytics, insights, and priority support.",
              },
              {
                q: "Does it work offline?",
                a: "Yes. FlowTrack works fully offline and syncs automatically when you're back online. Never miss a transaction.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-colors hover:border-primary/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-foreground text-lg">
                  <span className="pr-4">{item.q}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted transition-transform group-open:rotate-180">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {/* Background gradient */}
        <div className="-z-10 absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"></div>
        <div className="-translate-x-1/2 -z-10 absolute top-0 left-1/2 h-[400px] w-[800px] rounded-full bg-primary/10 blur-[120px]"></div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
            Ready to start?
          </span>
          <h2 className="mb-6 text-balance font-bold text-4xl sm:text-5xl lg:text-6xl">
            Take Control of Your
            <span className="gradient-text"> Finances Today</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            Join 50,000+ freelancers and creators who've stopped guessing and
            started knowing exactly where their money goes.
          </p>
          <Login />
          {/* <Button
            size="lg"
            className="group hover:-translate-y-0.5 h-14 rounded-xl px-10 font-semibold text-lg shadow-primary/25 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button> */}
          <p className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Shield className="h-4 w-4" />
            No credit card required • Free forever plan
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">FlowTrack</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Financial clarity for freelancers, creators, and anyone with
                variable income.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-border border-t pt-8 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © 2026 FlowTrack. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
