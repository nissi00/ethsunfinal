import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendSubmissionEmails } from "@/lib/email-service"

// POST - Créer une nouvelle soumission de contact
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { firstName, lastName, email, phone, organization, subject, message } = body

        // Validation basique
        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Champs requis manquants" },
                { status: 400 }
            )
        }

        // Créer la soumission
        const submission = await prisma.contactSubmission.create({
            data: {
                firstName,
                lastName,
                email,
                phone: phone || null,
                organization: organization || null,
                subject,
                message,
                status: "new",
            },
        })

        // Envoyer les emails
        await sendSubmissionEmails(
            "Contact",
            submission,
            email,
            firstName,
            "Prise de contact"
        )

        return NextResponse.json(
            { success: true, message: "Message envoyé avec succès", id: submission.id },
            { status: 201 }
        )
    } catch (error: any) {
        console.error("DETAILED ERROR creating contact submission:", {
            message: error.message,
            stack: error.stack,
            error: error
        })
        return NextResponse.json(
            { error: `Erreur lors de l'envoi du message: ${error.message || 'Unknown error'}` },
            { status: 500 }
        )
    }
}

// GET - Récupérer toutes les soumissions (admin only)
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
            ]
        }

        const submissions = await prisma.contactSubmission.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(submissions)
    } catch (error) {
        console.error("Error fetching contact submissions:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des messages" },
            { status: 500 }
        )
    }
}
