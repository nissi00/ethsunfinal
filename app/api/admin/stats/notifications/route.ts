import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const [contact, inscription, franchise, recruitment] = await Promise.all([
            prisma.contactSubmission.count({ where: { status: "new" } }),
            prisma.inscriptionSubmission.count({ where: { status: "new" } }),
            prisma.franchiseSubmission.count({ where: { status: "new" } }),
            prisma.recruitmentSubmission.count({ where: { status: "new" } }),
        ])

        return NextResponse.json({
            contact,
            inscription,
            franchise,
            recruitment,
            total: contact + inscription + franchise + recruitment
        })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
