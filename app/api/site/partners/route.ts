import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: Récupérer tous les partenaires
export async function GET() {
  try {
    const partners = await (prisma as any).partner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("[PARTNERS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

// POST: Créer un nouveau partenaire
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, logoUrl, website, sortOrder = 0 } = body;

    if (!name || !logoUrl) {
      return NextResponse.json(
        { error: "Name and logoUrl are required" },
        { status: 400 }
      );
    }

    const partner = await (prisma as any).partner.create({
      data: {
        name,
        logoUrl,
        website: website || null,
        sortOrder,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("[PARTNERS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}
