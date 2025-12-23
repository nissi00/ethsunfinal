import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// PATCH - Mettre à jour un témoignage
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        const testimonial = await prisma.testimonial.update({
            where: { id: params.id },
            data: body,
        })

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error("Error updating testimonial:", error)
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour" },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un témoignage
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.testimonial.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting testimonial:", error)
        return NextResponse.json(
            { error: "Erreur lors de la suppression" },
            { status: 500 }
        )
    }
}
