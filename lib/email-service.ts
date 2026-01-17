import { resend } from "@/lib/resend"
import { AdminNotificationEmail, VisitorConfirmationEmail } from "@/components/emails/templates"

export async function sendSubmissionEmails(
    type: string,
    data: any,
    visitorEmail: string,
    visitorName: string,
    visitorTypeLabel: string
) {
    try {
        console.log(`[EMAIL] Sending emails for ${type} submission (MOCK)...`)

        // Email to Admin
        await resend.emails.send({
            from: 'Ethsun <onboarding@resend.dev>',
            to: ['admin@ethsun-oxford.uk'],
            subject: `Nouvelle soumission : ${type}`,
            react: AdminNotificationEmail({ type, data }),
        })

        // Email to Visitor
        await resend.emails.send({
            from: 'Ethsun <onboarding@resend.dev>',
            to: [visitorEmail],
            subject: `Confirmation de réception - ${visitorTypeLabel}`,
            react: VisitorConfirmationEmail({ firstName: visitorName, type: visitorTypeLabel }),
        })

        console.log("[EMAIL] Emails sent successfully (MOCK)")
    } catch (error) {
        console.error("Error sending emails (MOCK):", error)
        // We don't throw to prevent blocking the response if email fails
    }
}
