import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// PATCH: Mettre à jour un événement
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
    const {
      titleFr,
      titleEn,
      titleEs,
      descriptionFr,
      descriptionEn,
      descriptionEs,
      contentFr,
      contentEn,
      contentEs,
      type,
      date,
      location,
      capacity,
      registrationUrl,
      imageUrl,
      isActive,
      sortOrder,
    } = body;

    const event = await (prisma as any).event.update({
      where: { id: params.id },
      data: {
        ...(titleFr && { titleFr }),
        ...(titleEn && { titleEn }),
        ...(titleEs && { titleEs }),
        ...(descriptionFr && { descriptionFr }),
        ...(descriptionEn && { descriptionEn }),
        ...(descriptionEs && { descriptionEs }),
        ...(contentFr && { contentFr }),
        ...(contentEn && { contentEn }),
        ...(contentEs && { contentEs }),
        ...(type && { type }),
        ...(date && { date }),
        ...(location && { location }),
        ...(capacity !== undefined && { capacity: capacity ? parseInt(capacity) : null }),
        ...(registrationUrl !== undefined && { registrationUrl }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[EVENTS_PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un événement
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await (prisma as any).event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[EVENTS_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
