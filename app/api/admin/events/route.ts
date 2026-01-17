import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: Récupérer tous les événements
export async function GET() {
  try {
    const events = await (prisma as any).event.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("[EVENTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST: Créer un nouvel événement
export async function POST(request: NextRequest) {
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
      sortOrder = 0,
    } = body;

    if (!titleFr || !descriptionFr || !type || !date || !location) {
      return NextResponse.json(
        { error: "titleFr, descriptionFr, type, date, and location are required" },
        { status: 400 }
      );
    }

    const event = await (prisma as any).event.create({
      data: {
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
        capacity: capacity ? parseInt(capacity) : null,
        registrationUrl,
        imageUrl,
        sortOrder,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[EVENTS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
