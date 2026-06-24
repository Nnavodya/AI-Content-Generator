"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Code2,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/use-dark-mode";

const gradientButton =
  "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg group">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Activity className="size-4.5" />
          </span>
          ContentFlow AI
        </Link>

        <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <a
            href="#features"
            className="rounded-lg px-3.5 py-2 hover:bg-muted hover:text-foreground transition-colors"
          >
            Features
          </a>
          <Link
            href="/sign-in"
            className="rounded-lg px-3.5 py-2 hover:bg-muted hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <a
            href="https://github.com/Nnavodya/AI-Content-Generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 hover:bg-muted hover:text-foreground transition-colors"
          >
            <Code2 className="size-4" />
            GitHub
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex size-9 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition-colors"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>

        <div className="hidden sm:block">
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "default" }),
              gradientButton,
              "shadow-sm shadow-blue-600/20"
            )}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 sm:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex size-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-white dark:bg-slate-950 px-6 py-4 flex flex-col gap-1">
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Features
          </a>
          <Link
            href="/sign-in"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Login
          </Link>
          <a
            href="https://github.com/Nnavodya/AI-Content-Generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Code2 className="size-4" />
            GitHub
          </a>
          <Link
            href="/sign-up"
            onClick={() => setMenuOpen(false)}
            className={cn(
              buttonVariants({ size: "default" }),
              gradientButton,
              "mt-2 gap-2"
            )}
          >
            Sign Up
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </header>
  );
}