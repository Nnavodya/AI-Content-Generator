import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { auth } from "@clerk/nextjs/server";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const history = await prisma.content.findMany({
      where: {
        userId,
        ...(search && {
          topic: { contains: search, mode: "insensitive" },
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    const totalGenerated = await prisma.content.count({ where: { userId } });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = await prisma.content.count({
      where: { userId, createdAt: { gte: startOfMonth } },
    });

    return NextResponse.json({ history, totalGenerated, thisMonth });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}