import Link from "next/link";
import { Activity, ArrowRight, Sparkles, Zap, Cloud } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const gradientButton =
  "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90";

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
            <Link href="/sign-in" className="hover:text-foreground">
              Login
            </Link>
          </div>
          <Link href="/sign-up" className={cn(buttonVariants({ size: "default" }), gradientButton)}>
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-6">
            <Sparkles className="size-3.5" />
            AI-powered content, in seconds
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Unlock Unlimited Creativity with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Generate high-converting blog posts, social captions, emails, and
            product descriptions in seconds. Built for the modern content
            pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ size: "lg" }), gradientButton, "gap-2")}
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
          </div>
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

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              create faster
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            One workspace for generating, organizing, and refining your AI
            content.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              color: "from-blue-600 to-blue-500",
              title: "Multiple Content Types",
              desc: "Blog posts, articles, social captions, emails, and product descriptions — pick a type, tone, and length.",
            },
            {
              icon: Zap,
              color: "from-purple-600 to-purple-500",
              title: "Lightning Fast",
              desc: "Powered by Groq's Llama 3.3 model, generating a full draft takes just a few seconds.",
            },
            {
              icon: Cloud,
              color: "from-blue-500 to-purple-500",
              title: "Saved History",
              desc: "Every generation is saved to your account so you can search and revisit past content anytime.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
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

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 text-white text-center py-16 px-6">
          <h3 className="text-3xl font-bold mb-3">
            Ready to transform your content workflow?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Create a free account and start generating content in minutes.
          </p>
          <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), gradientButton)}>
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <Activity className="size-3.5" />
            </span>
            ContentFlow AI
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <Link href="/sign-in" className="hover:text-foreground">
              Login
            </Link>
            <Link href="/sign-up" className="hover:text-foreground">
              Sign Up
            </Link>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 ContentFlow AI.
        </p>
      </footer>
    </div>
  );
}