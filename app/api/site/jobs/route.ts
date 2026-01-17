import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const jobs = await prisma.jobOffer.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                sortOrder: 'asc'
            }
        })
        return NextResponse.json(jobs)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
