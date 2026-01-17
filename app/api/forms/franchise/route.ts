import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendSubmissionEmails } from "@/lib/email-service"

// POST - Créer une nouvelle candidature franchise
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { firstName, lastName, email, phone, country, city, organization, motivation, project } = body

        // Validation basique
        if (!firstName || !lastName || !email || !country || !city) {
            return NextResponse.json(
                { error: "Champs requis manquants" },
                { status: 400 }
            )
        }

        // Créer la soumission
        const submission = await prisma.franchiseSubmission.create({
            data: {
                firstName,
                lastName,
                email,
                phone: phone || null,
                country,
                city,
                organization: organization || null,
                motivation: motivation || null,
                project: project || null,
                status: "new",
            },
        })

        // Envoyer les emails
        await sendSubmissionEmails(
            "Franchise",
            submission,
            email,
            firstName,
            "Demande de franchise"
        )

        return NextResponse.json(
            { success: true, message: "Candidature envoyée avec succès", id: submission.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating franchise submission:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'envoi de la candidature" },
            { status: 500 }
        )
    }
}

// GET - Récupérer toutes les candidatures (admin only)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")
        const search = searchParams.get("search")

        const where: any = {}

        if (status && status !== "all") {
            where.status = status
        }

        if (search) {
            where.OR = [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { email: { contains: search } },
                { city: { contains: search } },
                { country: { contains: search } },
            ]
        }

        const submissions = await prisma.franchiseSubmission.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(submissions)
    } catch (error) {
        console.error("Error fetching franchise submissions:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des candidatures" },
            { status: 500 }
        )
    }
}
