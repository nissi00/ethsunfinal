import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const jobs = await prisma.jobOffer.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(jobs)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const job = await prisma.jobOffer.create({
            data: {
                titleFr: body.titleFr,
                titleEn: body.titleEn,
                titleEs: body.titleEs,
                descriptionFr: body.descriptionFr,
                descriptionEn: body.descriptionEn,
                descriptionEs: body.descriptionEs,
                startDate: body.startDate,
                qualificationsFr: body.qualificationsFr,
                qualificationsEn: body.qualificationsEn,
                qualificationsEs: body.qualificationsEs,
                whyJoinUsFr: body.whyJoinUsFr,
                whyJoinUsEn: body.whyJoinUsEn,
                whyJoinUsEs: body.whyJoinUsEs,
                isActive: body.isActive,
                sortOrder: body.sortOrder
            }
        })
        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOBS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
