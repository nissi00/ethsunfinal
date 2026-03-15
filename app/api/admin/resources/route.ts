import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const resources = await (prisma as any).resource.findMany({
            orderBy: { sortOrder: 'asc' }
        })
        return NextResponse.json(resources)
    } catch (error) {
        console.error("GET Resources Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { titleFr, titleEn, titleEs, descriptionFr, descriptionEn, descriptionEs, fileUrl, type, slug, category, author, date, pages, isActive, sortOrder } = body

        if (!titleFr || !fileUrl) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const processedSlug = slug && slug.trim() !== "" ? slug.trim() : null

        const resource = await (prisma as any).resource.create({
            data: {
                titleFr,
                titleEn,
                titleEs,
                descriptionFr,
                descriptionEn,
                descriptionEs,
                fileUrl,
                type,
                slug: processedSlug,
                category,
                author,
                date,
                pages,
                isActive: isActive !== undefined ? isActive : true,
                sortOrder: parseInt(sortOrder?.toString() || "0") || 0
            }
        })

        return NextResponse.json(resource)
    } catch (error) {
        console.error("POST Resource Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
