import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendSubmissionEmails } from "@/lib/email-service"

// POST - Créer une nouvelle inscription
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log("Incoming inscription body:", body)

        const { firstName, lastName, email, phone, country, program, profile, motivation } = body

        // Validation basique
        const missingFields = []
        if (!firstName) missingFields.push("firstName")
        if (!lastName) missingFields.push("lastName")
        if (!email) missingFields.push("email")
        if (!program) missingFields.push("program")

        if (missingFields.length > 0) {
            return NextResponse.json(
                { 
                    error: "Champs requis manquants", 
                    fields: missingFields,
                    message: `Les champs suivants sont obligatoires : ${missingFields.join(", ")}`
                },
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
    } catch (error: any) {
        console.error("Error creating inscription submission:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'envoi de l'inscription", detail: error.message },
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
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { program: { contains: search, mode: "insensitive" } },
            ]
        }

        const submissions = await prisma.inscriptionSubmission.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(submissions)
    } catch (error: any) {
        console.error("Error fetching inscription submissions:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des inscriptions", detail: error.message },
            { status: 500 }
        )
    }
}
