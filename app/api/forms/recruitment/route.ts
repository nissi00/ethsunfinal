import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSubmissionEmails } from "@/lib/email-service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, role, cvUrl, coverLetterUrl, diplomaUrl } = body;

        if (!firstName || !lastName || !email || !role || !cvUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const submission = await prisma.recruitmentSubmission.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                role,
                cvUrl,
                coverLetterUrl,
                diplomaUrl,
                status: "new",
            },
        });

        // Envoyer les emails
        await sendSubmissionEmails(
            "Recrutement",
            submission,
            email,
            firstName,
            "Candidature"
        )

        return NextResponse.json(submission, { status: 201 });
    } catch (error) {
        console.error("[RECRUITMENT_FORM]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
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
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { role: { contains: search, mode: "insensitive" } },
            ]
        }

        const submissions = await prisma.recruitmentSubmission.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(submissions)
    } catch (error) {
        console.error("Error fetching recruitment submissions:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des candidatures" },
            { status: 500 }
        )
    }
}
