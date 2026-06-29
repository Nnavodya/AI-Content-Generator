import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Cloud, Code2, Activity } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const gradientButton =
  "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 mb-6">
            <Sparkles className="size-3.5" />
            AI-powered content, in seconds
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
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

        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 p-6 shadow-sm">
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-border shadow-md overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
            </div>
            <div className="p-5 space-y-3">
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
              <div className="h-20 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20" />
              <div className="rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs p-3">
                &ldquo;Generating your campaign strategy for Q3 launch... Done.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-muted/30 scroll-mt-16">
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
              className="rounded-2xl border border-border bg-white dark:bg-slate-900 p-6 hover:shadow-md transition-shadow"
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
      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 font-semibold text-white mb-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <Activity className="size-3.5" />
              </span>
              ContentFlow AI
            </div>
            <p className="text-sm text-slate-400">
              An AI-powered content workspace built with Next.js, Groq, and
              Prisma.
            </p>
            <a
              href="https://github.com/Nnavodya/AI-Content-Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Code2 className="size-4" />
              View source on GitHub
            </a>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-3">
                Product
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-3">
                Account
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sign-in" className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-10 pt-6">
          <p className="text-center text-xs text-slate-500">
            © 2026 ContentFlow AI. Built by Nethmi as a portfolio project.
          </p>
        </div>
      </footer>
    </div>
  );
}