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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data.history || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading history...</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Content History</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No content generated yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
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
              <p className="whitespace-pre-wrap text-gray-800">
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