import { prisma } from "@/lib/prisma"
import { SubmissionList } from "./submission-list"

export const dynamic = "force-dynamic"

export default async function RecruitmentSubmissionsPage() {
    const data = await prisma.recruitmentSubmission.findMany({
        orderBy: { createdAt: "desc" },
    })

    const submissions = data.map(s => ({
        ...s,
        createdAt: s.createdAt.toISOString()
    }))

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[#0A2A43]">
                Candidatures Recrutement
            </h1>

            <SubmissionList initialSubmissions={submissions} />
        </div>
    )
}
