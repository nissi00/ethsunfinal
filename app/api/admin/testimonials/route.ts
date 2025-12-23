import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer tous les témoignages
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { sortOrder: "asc" },
        })
        return NextResponse.json(testimonials)
    } catch (error) {
        console.error("Error fetching testimonials:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des témoignages" },
            { status: 500 }
        )
    }
}

// POST - Créer un nouveau témoignage
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { textFr, textEn, textEs, author, role, rating } = body

        if (!textFr || !author) {
            return NextResponse.json(
                { error: "Texte FR et auteur requis" },
                { status: 400 }
            )
        }

        const testimonial = await prisma.testimonial.create({
            data: {
                textFr,
                textEn: textEn || null,
                textEs: textEs || null,
                author,
                role: role || null,
                rating: rating || 5,
            },
        })

        return NextResponse.json(testimonial, { status: 201 })
    } catch (error) {
        console.error("Error creating testimonial:", error)
        return NextResponse.json(
            { error: "Erreur lors de la création" },
            { status: 500 }
        )
    }
}
