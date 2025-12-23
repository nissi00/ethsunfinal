import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer les paramètres du site
export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: "main" },
        })

        // Si aucun paramètre n'existe, créer les valeurs par défaut
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "main" },
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error fetching site settings:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des paramètres" },
            { status: 500 }
        )
    }
}

// PATCH - Mettre à jour les paramètres du site
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()

        const settings = await prisma.siteSettings.upsert({
            where: { id: "main" },
            update: body,
            create: { id: "main", ...body },
        })

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error updating site settings:", error)
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour des paramètres" },
            { status: 500 }
        )
    }
}
