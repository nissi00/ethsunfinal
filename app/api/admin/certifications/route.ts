import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Liste toutes les certifications
export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const certifications = await prisma.certification.findMany({
            include: {
                category: true,
                modules: {
                    orderBy: { sortOrder: "asc" },
                },
            },
            orderBy: [
                { sortOrder: "asc" },
                { createdAt: "desc" },
            ],
        })

        return NextResponse.json(certifications)
    } catch (error) {
        console.error("Error fetching certifications:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

// POST - Créer une nouvelle certification
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const data = await request.json()
        const { modules, ...certData } = data

        // Generate slug if not provided
        if (!certData.slug) {
            certData.slug = certData.titleFr
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
        }

        const certification = await prisma.certification.create({
            data: certData,
        })

        // Create modules if provided
        if (modules && modules.length > 0) {
            await prisma.certificationModule.createMany({
                data: modules.map((m: any, i: number) => ({
                    certificationId: certification.id,
                    titleFr: m.titleFr,
                    titleEn: m.titleEn || null,
                    titleEs: m.titleEs || null,
                    descriptionFr: m.descriptionFr,
                    descriptionEn: m.descriptionEn || null,
                    descriptionEs: m.descriptionEs || null,
                    sortOrder: i,
                })),
            })
        }

        const result = await prisma.certification.findUnique({
            where: { id: certification.id },
            include: {
                category: true,
                modules: { orderBy: { sortOrder: "asc" } },
            },
        })

        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        console.error("Error creating certification:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
