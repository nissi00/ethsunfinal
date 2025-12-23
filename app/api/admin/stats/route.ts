import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer toutes les statistiques
export async function GET() {
    try {
        const stats = await prisma.stat.findMany({
            orderBy: { sortOrder: "asc" },
        })
        return NextResponse.json(stats)
    } catch (error) {
        console.error("Error fetching stats:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des statistiques" },
            { status: 500 }
        )
    }
}

// POST - Créer une nouvelle statistique
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { value, labelFr, labelEn, labelEs, sortOrder } = body

        if (!value || !labelFr) {
            return NextResponse.json(
                { error: "Valeur et label FR requis" },
                { status: 400 }
            )
        }

        const stat = await prisma.stat.create({
            data: {
                value,
                labelFr,
                labelEn: labelEn || labelFr,
                labelEs: labelEs || labelFr,
                sortOrder: sortOrder || 0,
            },
        })

        return NextResponse.json(stat, { status: 201 })
    } catch (error) {
        console.error("Error creating stat:", error)
        return NextResponse.json(
            { error: "Erreur lors de la création" },
            { status: 500 }
        )
    }
}
