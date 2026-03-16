export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const type = searchParams.get("type")
        const slug = searchParams.get("slug")

        const where: any = { isActive: true }
        if (type) where.type = type
        if (slug) where.slug = slug

        const resources = await (prisma as any).resource.findMany({
            where: {
                isActive: true,
                ...where
            },
            orderBy: { sortOrder: 'asc' }
        })

        return NextResponse.json(resources)
    } catch (error) {
        console.error("GET Site Resources Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
