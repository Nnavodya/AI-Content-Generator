import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Sparkles,
  Zap,
  Cloud,
  BarChart3,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-border">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <Activity className="size-4" />
            </span>
            ContentFlow AI
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <Link href="/sign-in" className="hover:text-foreground">
              Login
            </Link>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
            <Sparkles className="size-3.5" />
            New: AI-Powered Multi-Platform Scheduling
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Unlock Unlimited Creativity with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            The ultimate workspace for creators. Generate high-converting
            copy, stunning visuals, and full-length articles in seconds.
            Built for the modern content pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <button type="button">Watch Demo</button>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Joined by <span className="font-semibold text-foreground">10k+</span>{" "}
            creators this month
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm">
          <div className="rounded-xl bg-white border border-border shadow-md overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
            </div>
            <div className="p-5 space-y-3">
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
              <div className="h-20 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100" />
              <div className="rounded-lg bg-slate-900 text-white text-xs p-3">
                &ldquo;Generating your campaign strategy for Q3 launch... Done.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-t border-border bg-muted/30 py-10">
        <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground mb-6">
          Trusted by 10,000+ creators and forward-thinking teams
        </p>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground/70">
          <span>TechFlow</span>
          <span>GlobalAi</span>
          <span>ContentX</span>
          <span>Vertex</span>
          <span>Pulse</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              scale
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Stop juggling multiple tools. ContentFlow AI brings your entire
            content creation workflow into a single, intelligent workspace.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              color: "from-blue-600 to-blue-500",
              title: "AI Precision",
              desc: "Fine-tuned models for various industries ensure your content sounds human, professional, and on-brand every time.",
            },
            {
              icon: Zap,
              color: "from-purple-600 to-purple-500",
              title: "Lightning Fast",
              desc: "Go from an idea to a published post in under 60 seconds. Our parallel generation engine works as fast as you do.",
            },
            {
              icon: Cloud,
              color: "from-blue-500 to-purple-500",
              title: "Cloud Sync",
              desc: "Never lose a draft again. Your history, templates, and generated assets are securely stored and synced across devices.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <span
                className={`inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${f.color} text-white mb-4`}
              >
                <f.icon className="size-5" />
              </span>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl border border-border p-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Optimized for conversion, designed for growth.
            </h3>
            <p className="text-muted-foreground mb-6">
              Our AI doesn&apos;t just write; it analyzes top-performing
              content in your niche to ensure every word serves a purpose.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-3xl font-bold text-blue-600">85%</p>
                <p className="text-xs text-muted-foreground">
                  Faster Content Production
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">3.5x</p>
                <p className="text-xs text-muted-foreground">
                  Higher Engagement Rate
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">120+</p>
                <p className="text-xs text-muted-foreground">
                  Supported Languages
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">24/7</p>
                <p className="text-xs text-muted-foreground">
                  AI Availability
                </p>
              </div>
            </div>
            <a
              href="#features"
              className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              See how it works <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-blue-50 p-5">
              <BarChart3 className="size-5 text-blue-600 mb-3" />
              <div className="h-2 w-3/4 rounded bg-blue-200 mb-2" />
              <div className="h-2 w-1/2 rounded bg-blue-200" />
            </div>
            <div className="rounded-xl bg-purple-50 p-5">
              <Globe2 className="size-5 text-purple-600 mb-3" />
              <div className="h-2 w-3/4 rounded bg-purple-200 mb-2" />
              <div className="h-2 w-1/2 rounded bg-purple-200" />
            </div>
            <div className="rounded-xl bg-purple-50 p-5">
              <Sparkles className="size-5 text-purple-600 mb-3" />
              <div className="h-2 w-3/4 rounded bg-purple-200 mb-2" />
              <div className="h-2 w-1/2 rounded bg-purple-200" />
            </div>
            <div className="rounded-xl bg-blue-50 p-5">
              <CheckCircle2 className="size-5 text-blue-600 mb-3" />
              <div className="h-2 w-3/4 rounded bg-blue-200 mb-2" />
              <div className="h-2 w-1/2 rounded bg-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 text-white text-center py-16 px-6">
          <h3 className="text-3xl font-bold mb-3">
            Ready to transform your content strategy?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Join thousands of creators who are using ContentFlow AI to build
            their brand, grow their audience, and save hundreds of hours
            every year.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
          >
            <Link href="/sign-up">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Activity className="size-3.5" />
              </span>
              ContentFlow AI
            </div>
            <p className="text-muted-foreground text-xs">
              Empowering creators with AI-driven precision and boundless
              inspiration.
            </p>
          </div>
          <div>
            <p className="font-medium mb-3 text-xs uppercase tracking-wide text-muted-foreground">
              Product
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Features</li>
              <li>Templates</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3 text-xs uppercase tracking-wide text-muted-foreground">
              Company
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3 text-xs uppercase tracking-wide text-muted-foreground">
              Legal
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">
          © 2026 ContentFlow AI. Designed for the future of content.
        </p>
      </footer>
    </div>
  );
}