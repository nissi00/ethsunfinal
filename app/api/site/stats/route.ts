import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer les stats publiques (pour le frontend)
export async function GET() {
    try {
        const stats = await prisma.stat.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        })

        return NextResponse.json(stats)
    } catch (error) {
        console.error("Error fetching stats:", error)
        // Retourner des valeurs par défaut en cas d'erreur
        return NextResponse.json([])
    }
}
