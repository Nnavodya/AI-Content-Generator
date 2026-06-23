"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Plus,
  FileText,
  MessageSquare,
  Mail,
  Package,
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecentItem {
  id: string;
  contentType: string;
  topic: string;
  createdAt: string;
}

const typeIcons: Record<string, typeof FileText> = {
  blog: FileText,
  article: FileText,
  social: MessageSquare,
  email: Mail,
  product: Package,
  caption: ImageIcon,
};

const typeLabels: Record<string, string> = {
  blog: "Blog",
  article: "Article",
  social: "Social",
  email: "Email",
  product: "Product",
  caption: "Caption",
};

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(dateString).toLocaleDateString();
}

export default function DashboardPage() {
  const { user } = useUser();
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [recentActivity, setRecentActivity] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard-stats");
        const data = await res.json();
        setTotalGenerated(data.totalGenerated ?? 0);
        setRecentActivity(data.recentActivity ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.firstName ?? "there"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s what&apos;s happening with your content workspace today.
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className={cn(
            buttonVariants(),
            "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 gap-2"
          )}
        >
          <Plus className="size-4" />
          Generate New Content
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-blue-50 p-6 mb-8 max-w-xs">
        <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white mb-3">
          <Sparkles className="size-4" />
        </span>
        <p className="text-3xl font-bold">{loading ? "—" : totalGenerated}</p>
        <p className="text-sm text-muted-foreground">Total Generated</p>
      </div>

      <div className="rounded-2xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-semibold">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">
              Your most recent AI generations.
            </p>
          </div>
          <Link
            href="/dashboard/history"
            className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            View History
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-muted-foreground">Loading...</p>
        ) : recentActivity.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t generated any content yet.
            </p>
            <Link
              href="/dashboard/generate"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Create your first piece of content →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recentActivity.map((item) => {
              const Icon = typeIcons[item.contentType] ?? Sparkles;
              return (
                <li key={item.id} className="flex items-center gap-3 p-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.topic}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {typeLabels[item.contentType] ?? item.contentType} •{" "}
                      {timeAgo(item.createdAt)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}