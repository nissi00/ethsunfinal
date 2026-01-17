import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendSubmissionEmails } from "@/lib/email-service"

// POST - Créer une nouvelle inscription
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { firstName, lastName, email, phone, country, program, profile, motivation } = body

        // Validation basique
        if (!firstName || !lastName || !email || !program) {
            return NextResponse.json(
                { error: "Champs requis manquants" },
                { status: 400 }
            )
        }

        // Créer la soumission
        const submission = await prisma.inscriptionSubmission.create({
            data: {
                firstName,
                lastName,
                email,
                phone: phone || null,
                country: country || null,
                program,
                profile: profile || null,
                motivation: motivation || null,
                cvUrl: body.cvUrl || null,
                lastDiploma: body.lastDiploma || null,
                status: "new",
            },
        })

        // Envoyer les emails
        await sendSubmissionEmails(
            "Inscription",
            submission,
            email,
            firstName,
            "Demande d'inscription"
        )

        return NextResponse.json(
            { success: true, message: "Inscription envoyée avec succès", id: submission.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating inscription submission:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'envoi de l'inscription" },
            { status: 500 }
        )
    }
}

// GET - Récupérer toutes les inscriptions (admin only)
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
                { program: { contains: search } },
            ]
        }

        const submissions = await prisma.inscriptionSubmission.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(submissions)
    } catch (error) {
        console.error("Error fetching inscription submissions:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des inscriptions" },
            { status: 500 }
        )
    }
}
