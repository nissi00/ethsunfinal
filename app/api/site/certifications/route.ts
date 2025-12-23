import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Liste publique des certifications actives
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const categorySlug = searchParams.get("category")
        const slug = searchParams.get("slug")

        // Si on demande une certification spécifique par slug
        if (slug) {
            const certification = await prisma.certification.findFirst({
                where: {
                    slug,
                    isActive: true,
                },
                include: {
                    category: true,
                    modules: {
                        orderBy: { sortOrder: "asc" },
                    },
                },
            })

            if (!certification) {
                return NextResponse.json({ error: "Certification non trouvée" }, { status: 404 })
            }

            return NextResponse.json(certification)
        }

        // Sinon liste des certifications (optionnellement filtrées par catégorie)
        const where: any = { isActive: true }
        if (categorySlug) {
            where.category = { slug: categorySlug }
        }

        const certifications = await prisma.certification.findMany({
            where,
            include: {
                category: true,
                modules: {
                    orderBy: { sortOrder: "asc" },
                },
            },
            orderBy: [
                { sortOrder: "asc" },
                { titleFr: "asc" },
            ],
        })

        return NextResponse.json(certifications)
    } catch (error) {
        console.error("Error fetching certifications:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
