"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const contentTypes = [
  { value: "blog", label: "Blog Post" },
  { value: "article", label: "Article" },
  { value: "social", label: "Social Media Post" },
  { value: "email", label: "Email" },
  { value: "product", label: "Product Description" },
  { value: "caption", label: "Caption" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
];

const lengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export default function GeneratePage() {
  const [contentType, setContentType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
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
        body: JSON.stringify({ topic, contentType, tone, length }),
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
      <h1 className="text-2xl font-bold mb-4">AI Content Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Content Type</label>
          <select
            className="w-full border rounded-lg p-2"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            {contentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Tone</label>
          <select
            className="w-full border rounded-lg p-2"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            {tones.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Length</label>
          <select
            className="w-full border rounded-lg p-2"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            {lengths.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="block mb-2 font-medium">Topic / Prompt</label>
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={3}
        placeholder="Enter your topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Content"}
      </Button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}