import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

const DEFAULT_RESOURCES = [
    {
        titleFr: "Catalogue Complet des Certificats 2025",
        titleEn: "Complete Certificate Catalog 2025",
        titleEs: "Catálogo Completo de Certificados 2025",
        descriptionFr: "36 programmes certifiants répartis en 8 domaines stratégiques",
        descriptionEn: "36 certification programs across 8 strategic domains",
        descriptionEs: "36 programas de certificación en 8 ámbitos estratégicos",
        pages: "120 pages",
        type: "catalogue",
        isActive: true,
        sortOrder: 1,
        fileUrl: "/pdf/catalog-2025.pdf"
    },
    {
        titleFr: "Guide des Académies d'Entreprise",
        titleEn: "Corporate Academies Guide",
        titleEs: "Guía de Academias Corporativas",
        descriptionFr: "Méthodologie complète de création d'académies digitales",
        descriptionEn: "Complete methodology for creating digital academies",
        descriptionEs: "Metodología completa para crear academias digitales",
        pages: "45 pages",
        type: "catalogue",
        isActive: true,
        sortOrder: 2,
        fileUrl: "/pdf/corporate-guide.pdf"
    },
    {
        titleFr: "Brochure Franchise ETHSUN",
        titleEn: "ETHSUN Franchise Brochure",
        titleEs: "Folleto de Franquicia ETHSUN",
        descriptionFr: "Modèle de franchise et opportunités d'investissement",
        descriptionEn: "Franchise model and investment opportunities",
        descriptionEs: "Modelo de franquicia y oportunidades de inversión",
        pages: "32 pages",
        type: "catalogue",
        isActive: true,
        sortOrder: 3,
        fileUrl: "/pdf/franchise-brochure.pdf"
    },
    {
        titleFr: "Transformation Numérique des Organisations Publiques",
        titleEn: "Digital Transformation of Public Organizations",
        titleEs: "Transformación Digital de las Organizaciones Públicas",
        category: "Innovation",
        author: "Dr. Jean Dupont",
        date: "2024",
        type: "whitepaper",
        isActive: true,
        sortOrder: 4,
        fileUrl: "/pdf/digital-transformation.pdf"
    },
    {
        titleFr: "Politique de Confidentialité",
        slug: "privacy-policy",
        type: "legal",
        isActive: true,
        fileUrl: "/pdf/privacy.pdf"
    },
    {
        titleFr: "Conditions Générales de Vente",
        slug: "terms-of-sale",
        type: "legal",
        isActive: true,
        fileUrl: "/pdf/terms.pdf"
    }
]

export async function POST() {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        // Create each resource
        for (const res of DEFAULT_RESOURCES) {
            // Check if already exists by title or slug
            const exists = await (prisma as any).resource.findFirst({
                where: {
                    OR: [
                        { titleFr: res.titleFr },
                        res.slug ? { slug: res.slug } : {}
                    ]
                }
            })

            if (!exists) {
                await (prisma as any).resource.create({ data: res })
            }
        }

        return NextResponse.json({ message: "Default resources seeded" })
    } catch (error) {
        console.error("Seed Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
