import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.recruitmentSubmission.delete({
            where: {
                id: params.id
            }
        })
        return new NextResponse(null, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json()

        // Update status or statut_final
        if (body.status || body.statut_final) {
            const dataToUpdate: any = {}
            if (body.status) dataToUpdate.status = body.status
            if (body.statut_final) dataToUpdate.statut_final = body.statut_final

            const submission = await prisma.recruitmentSubmission.update({
                where: { id: params.id },
                data: dataToUpdate
            })
            return NextResponse.json(submission)
        }

        // Delete document (set to null)
        const { field } = body // 'cvUrl', 'coverLetterUrl', 'diplomaUrl'

        if (!['cvUrl', 'coverLetterUrl', 'diplomaUrl'].includes(field)) {
            return new NextResponse("Invalid field", { status: 400 })
        }

        const submission = await prisma.recruitmentSubmission.update({
            where: {
                id: params.id
            },
            data: {
                [field]: null
            }
        })
        return NextResponse.json(submission)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
