"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  Activity,
  LayoutDashboard,
  Sparkles,
  History,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Content Generator", icon: Sparkles },
  { href: "/dashboard/history", label: "Content History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <aside className="w-64 h-screen bg-white border-r border-border flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <Activity className="size-4" />
          </span>
          ContentFlow AI
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-muted transition-colors"
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName ?? "User"}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {user?.firstName?.[0] ?? "U"}
            </span>
          )}
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-medium truncate">
              {user?.fullName ?? user?.firstName ?? "Account"}
            </span>
            <span className="block text-xs text-muted-foreground">Free Plan</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>

        <button
          type="button"
          onClick={() => signOut({ redirectUrl: "/" })}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}