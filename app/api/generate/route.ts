import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import { auth } from "@clerk/nextjs/server";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, contentType, tone, length, keywords, audience } =
      await req.json();

    const instruction = promptTemplates[contentType] || promptTemplates.blog;
    const lengthGuide = lengthGuides[length] || lengthGuides.medium;
    const toneGuide = tone ? `Use a ${tone} tone.` : "";
    const keywordGuide =
      Array.isArray(keywords) && keywords.length > 0
        ? `Naturally incorporate these target keywords: ${keywords.join(", ")}.`
        : "";
    const audienceGuide = audience
      ? `Write for this target audience: ${audience}.`
      : "";

    const finalPrompt = [
      `${instruction} ${topic}.`,
      toneGuide,
      audienceGuide,
      keywordGuide,
      lengthGuide,
    ]
      .filter(Boolean)
      .join(" ");

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

    // Save to database
    await prisma.content.create({
      data: {
        userId,
        contentType,
        tone,
        length,
        topic,
        result: text,
        keywords: Array.isArray(keywords) ? keywords : [],
        audience: audience || null,
      },
    });

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}