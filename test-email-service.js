// Mock the submission emails call
const { sendSubmissionEmails } = require('./lib/email-service')

async function main() {
    try {
        console.log('Testing sendSubmissionEmails...')
        await sendSubmissionEmails(
            'Test',
            { id: '123', name: 'Test User' },
            'test@example.com',
            'Test',
            'Test Label'
        )
        console.log('Test successful!')
    } catch (error) {
        console.error('Test failed:', error)
    }
}

main()
