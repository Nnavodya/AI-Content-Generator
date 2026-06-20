"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a detailed blog post about: ${topic}`,
        }),
      });

      const data = await res.json();
      setResult(data.result || "Something went wrong.");
    } catch (error) {
      console.error(error);
      setResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Blog Generator</h1>

      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={3}
        placeholder="Enter your blog topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Blog"}
      </Button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}