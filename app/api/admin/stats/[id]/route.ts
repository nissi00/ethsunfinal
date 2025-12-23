import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// PATCH - Mettre à jour une statistique
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        const stat = await prisma.stat.update({
            where: { id: params.id },
            data: body,
        })

        return NextResponse.json(stat)
    } catch (error) {
        console.error("Error updating stat:", error)
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour" },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer une statistique
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.stat.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting stat:", error)
        return NextResponse.json(
            { error: "Erreur lors de la suppression" },
            { status: 500 }
        )
    }
}
