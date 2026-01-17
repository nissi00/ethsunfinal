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
