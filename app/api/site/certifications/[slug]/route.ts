import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const certification = await prisma.certification.findUnique({
            where: {
                slug: params.slug,
            },
            include: {
                category: true,
                modules: {
                    orderBy: {
                        sortOrder: 'asc'
                    }
                }
            }
        })

        if (!certification) {
            return new NextResponse("Certification not found", { status: 404 })
        }

        return NextResponse.json(certification)
    } catch (error) {
        console.error("[CERTIFICATION_GET]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
