import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json()
        const job = await prisma.jobOffer.update({
            where: {
                id: params.id
            },
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
        console.error("[JOBS_PUT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.jobOffer.delete({
            where: {
                id: params.id
            }
        })
        return new NextResponse(null, { status: 200 })
    } catch (error) {
        console.error("[JOBS_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
