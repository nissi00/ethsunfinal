import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const [contact, inscription, franchise, recruitment, event] = await Promise.all([
            prisma.contactSubmission.count({ where: { OR: [{ statut_final: null }, { statut_final: "" }] } }),
            prisma.inscriptionSubmission.count({ where: { OR: [{ statut_final: null }, { statut_final: "" }] } }),
            prisma.franchiseSubmission.count({ where: { OR: [{ statut_final: null }, { statut_final: "" }] } }),
            prisma.recruitmentSubmission.count({ where: { OR: [{ statut_final: null }, { statut_final: "" }] } }),
            prisma.eventSubmission.count({ where: { OR: [{ statut_final: null }, { statut_final: "" }] } }),
        ])

        return NextResponse.json({
            contact,
            inscription,
            franchise,
            recruitment,
            event,
            total: contact + inscription + franchise + recruitment + event
        })
    } catch (error) {
        console.error("Notifications count error:", error)
        // Retourner des zéros plutôt qu'une erreur 500 pour éviter de casser le sidebar
        return NextResponse.json({
            contact: 0,
            inscription: 0,
            franchise: 0,
            recruitment: 0,
            event: 0,
            total: 0
        })
    }
}
