import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupérer une certification par ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const certification = await prisma.certification.findUnique({
            where: { id: params.id },
            include: {
                category: true,
                modules: { orderBy: { sortOrder: "asc" } },
            },
        })

        if (!certification) {
            return NextResponse.json({ error: "Certification non trouvée" }, { status: 404 })
        }

        return NextResponse.json(certification)
    } catch (error) {
        console.error("Error fetching certification:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

// PUT - Modifier une certification
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        const data = await request.json()
        const { modules, ...certData } = data

        // Update certification
        await prisma.certification.update({
            where: { id: params.id },
            data: certData,
        })

        // Update modules if provided
        if (modules) {
            // Delete existing modules
            await prisma.certificationModule.deleteMany({
                where: { certificationId: params.id },
            })

            // Create new modules
            if (modules.length > 0) {
                await prisma.certificationModule.createMany({
                    data: modules.map((m: any, i: number) => ({
                        certificationId: params.id,
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
        }

        const result = await prisma.certification.findUnique({
            where: { id: params.id },
            include: {
                category: true,
                modules: { orderBy: { sortOrder: "asc" } },
            },
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error("Error updating certification:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

// DELETE - Supprimer une certification
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
        }

        await prisma.certification.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting certification:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
