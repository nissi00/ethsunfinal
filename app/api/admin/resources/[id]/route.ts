import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const resource = await (prisma as any).resource.findUnique({
            where: { id: params.id }
        })

        if (!resource) {
            return new NextResponse("Not Found", { status: 404 })
        }

        return NextResponse.json(resource)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { titleFr, titleEn, titleEs, descriptionFr, descriptionEn, descriptionEs, fileUrl, type, slug, category, author, date, pages, isActive, sortOrder } = body

        const processedSlug = slug && slug.trim() !== "" ? slug.trim() : null

        const resource = await (prisma as any).resource.update({
            where: { id: params.id },
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
                isActive,
                sortOrder: parseInt(sortOrder?.toString() || "0") || 0
            }
        })

        return NextResponse.json(resource)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        await (prisma as any).resource.delete({
            where: { id: params.id }
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
