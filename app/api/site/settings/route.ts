import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Récupérer les paramètres publics du site (pour le frontend)
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
        // Retourner des valeurs par défaut en cas d'erreur
        return NextResponse.json({
            primaryColor: "#0A2A43",
            secondaryColor: "#153D63",
            accentColor: "#C9A44A",
            textColor: "#4A4A4A",
            bgColor: "#F5F6F7",
            contactEmail: "info@ethsun-oxford.uk",
            contactPhone: "+44 74 2420 1585",
            address: "Oxford, United Kingdom",
        })
    }
}
