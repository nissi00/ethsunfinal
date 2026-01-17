const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Testing ContactSubmission...')
        const submission = await prisma.contactSubmission.create({
            data: {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test Message',
                status: 'new'
            }
        })
        console.log('Submission created:', submission.id)
    } catch (error) {
        console.error('Submission failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
