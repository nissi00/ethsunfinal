const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const eventCount = await prisma.eventSubmission.count()
    console.log('Event submissions count:', eventCount)
    
    if (eventCount > 0) {
      const first = await prisma.eventSubmission.findFirst()
      console.log('First event submission fields:', Object.keys(first || {}))
    }
    
    const inscriptionCount = await prisma.inscriptionSubmission.count()
    console.log('Inscription submissions count:', inscriptionCount)

    if (inscriptionCount > 0) {
      const first = await prisma.inscriptionSubmission.findFirst()
      console.log('First inscription submission fields:', Object.keys(first || {}))
    }
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
