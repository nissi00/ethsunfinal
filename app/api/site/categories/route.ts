import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Liste publique des catégories actives avec leurs certifications actives
export async function GET() {
    try {
        const categories = await prisma.certificationCategory.findMany({
            where: { isActive: true },
            include: {
                certifications: {
                    where: { isActive: true },
                    orderBy: { sortOrder: "asc" },
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
