"use client";

import { useState } from "react";
import {
  Sparkles,
  X,
  ChevronDown,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [tone, setTone] = useState("professional");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [length, setLength] = useState("medium");
  const [audience, setAudience] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const addKeyword = () => {
    const value = keywordInput.trim();
    if (value && !keywords.includes(value)) {
      setKeywords([...keywords, value]);
    }
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          contentType,
          tone,
          length,
          keywords,
          audience,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult(data.result || "");
    } catch (err) {
      console.error(err);
      setError("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
      {/* Generator Controls */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-4 text-blue-600" />
          <h1 className="font-semibold">Generator Controls</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Configure your AI parameters to craft the perfect message.
        </p>

        <label className="block mb-2 text-sm font-medium">Content Type</label>
        <select
          className="w-full border border-border rounded-lg p-2.5 mb-5 text-sm"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          {contentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium">Topic or Prompt</label>
        <textarea
          className="w-full border border-border rounded-lg p-3 mb-5 text-sm"
          rows={3}
          placeholder="Describe what you want to write about in detail..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Target Keywords</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1"
            >
              {kw}
              <button
                type="button"
                onClick={() => removeKeyword(kw)}
                aria-label={`Remove ${kw}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          className="w-full border border-border rounded-lg p-2.5 mb-5 text-sm"
          placeholder="Type keyword and press Enter"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addKeyword();
            }
          }}
        />

        <label className="block mb-2 text-sm font-medium">Brand Tone</label>
        <select
          className="w-full border border-border rounded-lg p-2.5 mb-5 text-sm"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          {tones.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setAdvancedOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm font-medium mb-5"
        >
          Advanced Parameters
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              advancedOpen && "rotate-180"
            )}
          />
        </button>

        {advancedOpen && (
          <div className="mb-5 space-y-4 rounded-lg bg-muted/50 p-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Length</label>
              <select
                className="w-full border border-border rounded-lg p-2.5 text-sm bg-white"
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
            <div>
              <label className="block mb-2 text-sm font-medium">
                Target Audience{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                className="w-full border border-border rounded-lg p-2.5 text-sm bg-white"
                placeholder="e.g. small business owners, students..."
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Generate Content
            </>
          )}
        </button>
      </div>

      {/* Draft Preview */}
      <div className="rounded-2xl border border-border bg-white overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">
            Draft Preview
          </span>
          {result && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> Copy
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-16">
              <Loader2 className="size-6 animate-spin mb-3" />
              <p className="text-sm">Generating your content...</p>
            </div>
          ) : result ? (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {result}
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                <Sparkles className="size-5 text-blue-600" />
              </span>
              <p className="font-medium mb-1">Your masterpiece begins here...</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Fill in the details on the left and hit Generate to watch
                ContentFlow AI work its magic.
              </p>
            </div>
          )}
        </div>

        {result && (
          <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground">
            {result.split(/\s+/).filter(Boolean).length} Words
          </div>
        )}
      </div>
    </div>
  );
}