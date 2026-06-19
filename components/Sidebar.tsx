"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">AI Content Generator</h2>

      <Link href="/dashboard" className="hover:text-gray-300">
        Dashboard
      </Link>
      <Link href="/dashboard/blog" className="hover:text-gray-300">
        Blog Generator
      </Link>
      <Link href="/dashboard/youtube" className="hover:text-gray-300">
        YouTube Script
      </Link>
      <Link href="/dashboard/history" className="hover:text-gray-300">
        History
      </Link>
    </aside>
  );
}