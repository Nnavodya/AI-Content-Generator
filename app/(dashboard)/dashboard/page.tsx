"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  contentType: string;
  topic: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard-stats");
        const data = await res.json();
        setTotalGenerated(data.totalGenerated || 0);
        setRecentActivity(data.recentActivity || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-gray-500">
            Here's what's happening with your content workspace today.
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="bg-black text-white px-4 py-2 rounded-lg font-medium"
        >
          + Generate New Content
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">Total Generated</p>
          <p className="text-3xl font-bold">{totalGenerated}</p>
          <p className="text-sm text-gray-500 mt-1">items all time</p>
        </div>
        <div className="border rounded-lg p-6 bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">Quick Action</p>
          <Link
            href="/dashboard/history"
            className="text-blue-600 font-medium"
          >
            View All History →
          </Link>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Link href="/dashboard/history" className="text-sm text-blue-600">
            View History →
          </Link>
        </div>

        {recentActivity.length === 0 ? (
          <p className="text-gray-500">No content generated yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-sm text-gray-500">
                    {item.contentType} •{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  completed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}