import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const promptTemplates: Record<string, string> = {
  blog: "Write a detailed, well-structured blog post about:",
  article: "Write an informative article about:",
  social: "Write an engaging social media post about:",
  email: "Write a professional email about:",
  product: "Write a compelling product description for:",
  caption: "Write a catchy social media caption about:",
};

const lengthGuides: Record<string, string> = {
  short: "Keep it short and concise, around 50-100 words.",
  medium: "Keep it medium length, around 150-300 words.",
  long: "Make it detailed and comprehensive, around 400-600 words.",
};

export async function POST(req: NextRequest) {
  try {
    const { topic, contentType, tone, length } = await req.json();

    const instruction = promptTemplates[contentType] || promptTemplates.blog;
    const lengthGuide = lengthGuides[length] || lengthGuides.medium;
    const toneGuide = tone ? `Use a ${tone} tone.` : "";

    const finalPrompt = `${instruction} ${topic}. ${toneGuide} ${lengthGuide}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const text = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}