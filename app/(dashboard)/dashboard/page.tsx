"use client";

import { useEffect, useState } from "react";

interface ContentItem {
  id: string;
  contentType: string;
  tone: string;
  length: string;
  topic: string;
  result: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ContentItem[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    fetchHistory();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory(search);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content History</h1>
          <p className="text-gray-500">
            Manage and revisit your AI-powered creations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-xs text-gray-500 uppercase">Total Generated</p>
          <p className="text-2xl font-bold">{totalGenerated}</p>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-xs text-gray-500 uppercase">This Month</p>
          <p className="text-2xl font-bold">{thisMonth}</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search by topic or keyword..."
          className="w-full border rounded-lg p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No content found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex gap-2 mb-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {item.contentType}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {item.tone}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {item.length}
                </span>
              </div>
              <p className="font-medium mb-2">Topic: {item.topic}</p>
              <p className="whitespace-pre-wrap text-gray-800 line-clamp-4">
                {item.result}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}