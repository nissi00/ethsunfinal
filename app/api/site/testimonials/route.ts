import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer les témoignages publics (pour le frontend)
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        })

        return NextResponse.json(testimonials)
    } catch (error) {
        console.error("Error fetching testimonials:", error)
        return NextResponse.json([])
    }
}
