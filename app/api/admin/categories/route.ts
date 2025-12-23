import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste toutes les catégories
export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const categories = await prisma.certificationCategory.findMany({
            include: {
                _count: {
                    select: { certifications: true },
                },
            },
            orderBy: { sortOrder: "asc" },
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error("Error fetching categories:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

// POST - Créer une catégorie
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const data = await request.json()

        // Generate slug if not provided
        if (!data.slug) {
            data.slug = data.nameFr
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
        }

        const category = await prisma.certificationCategory.create({
            data,
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error("Error creating category:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
