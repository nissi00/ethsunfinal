import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// PATCH - Mettre à jour le statut d'une soumission
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { status, statut_final } = body

        if (status && !["new", "in_progress", "completed"].includes(status)) {
            return NextResponse.json(
                { error: "Statut invalide" },
                { status: 400 }
            )
        }

        if (statut_final && !["Accepté", "Refusé"].includes(statut_final)) {
            return NextResponse.json(
                { error: "Statut final invalide" },
                { status: 400 }
            )
        }

        const dataToUpdate: any = {}
        if (status) dataToUpdate.status = status
        if (statut_final) dataToUpdate.statut_final = statut_final

        const submission = await prisma.contactSubmission.update({
            where: { id: params.id },
            data: dataToUpdate,
        })

        return NextResponse.json(submission)
    } catch (error) {
        console.error("Error updating contact submission:", error)
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour" },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer une soumission
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.contactSubmission.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting contact submission:", error)
        return NextResponse.json(
            { error: "Erreur lors de la suppression" },
            { status: 500 }
        )
    }
}
