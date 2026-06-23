"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  Calendar,
  ChevronDown,
  Copy,
  Check,
  Trash2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  contentType: string;
  tone: string;
  length: string;
  topic: string;
  result: string;
  createdAt: string;
}

const dateFilters = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

function isWithinFilter(dateString: string, filter: string) {
  if (filter === "all") return true;
  const date = new Date(dateString);
  const now = new Date();

  if (filter === "today") {
    return date.toDateString() === now.toDateString();
  }
  if (filter === "week") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return date >= weekAgo;
  }
  if (filter === "month") {
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }
  return true;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ContentItem[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchHistory = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/history?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setHistory(data.history || []);
      setTotalGenerated(data.totalGenerated || 0);
      setThisMonth(data.thisMonth || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchHistory(search);
      },
      search ? 400 : 0
    );
    return () => clearTimeout(timer);
  }, [search]);

  const handleCopy = async (item: ContentItem) => {
    await navigator.clipboard.writeText(item.result);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this generated content? This cannot be undone.")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/history/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
        setTotalGenerated((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const visibleHistory = history.filter((item) =>
    isWithinFilter(item.createdAt, dateFilter)
  );

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and revisit your AI-powered creations.
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          <Plus className="size-4" />
          New Generation
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6 max-w-md">
        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Generated</p>
            <Layers className="size-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold mt-1">{totalGenerated}</p>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">This Month</p>
            <Calendar className="size-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold mt-1">{thisMonth}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            className="w-full border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm"
            placeholder="Search by topic or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border border-border rounded-lg px-3 py-2.5 text-sm"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          {dateFilters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading history...</p>
      ) : visibleHistory.length === 0 ? (
        <div className="rounded-2xl border border-border p-10 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            {history.length === 0
              ? "No content generated yet."
              : "No results match your search or filter."}
          </p>
          {history.length === 0 && (
            <Link
              href="/dashboard/generate"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Generate your first piece of content →
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleHistory.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium uppercase tracking-wide rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5">
                        {item.contentType}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wide rounded-full bg-purple-50 text-purple-700 px-2.5 py-0.5">
                        {item.tone}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-medium truncate">{item.topic}</p>
                    <p
                      className={cn(
                        "text-sm text-muted-foreground mt-1 whitespace-pre-wrap",
                        !isExpanded && "line-clamp-2"
                      )}
                    >
                      {item.result}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="flex size-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform", isExpanded && "rotate-180")}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(item)}
                      className="flex size-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
                      aria-label="Copy"
                    >
                      {copiedId === item.id ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="flex size-8 items-center justify-center rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}