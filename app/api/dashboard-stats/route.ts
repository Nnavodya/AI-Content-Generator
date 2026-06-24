import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { auth } from "@clerk/nextjs/server";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalGenerated = await prisma.content.count({
      where: { userId },
    });

    const recentActivity = await prisma.content.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        contentType: true,
        topic: true,
        createdAt: true,
      },
    });

    const byType = await prisma.content.groupBy({
      by: ["contentType"],
      where: { userId },
      _count: { _all: true },
    });

    const typeBreakdown = byType
      .map((t) => ({ contentType: t.contentType, count: t._count._all }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ totalGenerated, recentActivity, typeBreakdown });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}