import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// PATCH: Mettre à jour l'image d'une certification
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl is required" },
        { status: 400 }
      );
    }

    const certification = await (prisma.certification.update as any)({
      where: { id: params.id },
      data: { imageUrl },
    });

    return NextResponse.json(certification);
  } catch (error) {
    console.error("[CERTIFICATION_IMAGE_PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update certification image" },
      { status: 500 }
    );
  }
}
