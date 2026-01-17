#!/usr/bin/env node

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedPartners() {
  console.log("🌱 Seeding partners...");

  const partners = [
    {
      id: "partner-oxford",
      name: "Oxford University",
      logoUrl:
        "https://images.unsplash.com/photo-1611271437281-a783a1ad4038?w=200&h=100&fit=crop",
      website: "https://ox.ac.uk",
      sortOrder: 0,
    },
    {
      id: "partner-business",
      name: "Business Excellence",
      logoUrl:
        "https://images.unsplash.com/photo-1611162617305-c69b3fa7fbe0?w=200&h=100&fit=crop",
      website: "https://example.com",
      sortOrder: 1,
    },
    {
      id: "partner-leaders",
      name: "Global Leaders",
      logoUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop",
      website: "https://example.com",
      sortOrder: 2,
    },
    {
      id: "partner-learning",
      name: "Learning Hub",
      logoUrl:
        "https://images.unsplash.com/photo-1620265635307-c4b65d7f7bb6?w=200&h=100&fit=crop",
      website: "https://example.com",
      sortOrder: 3,
    },
  ];

  for (const partner of partners) {
    try {
      const created = await prisma.partner.upsert({
        where: { id: partner.id },
        update: {},
        create: partner,
      });
      console.log("✅ Partner created:", created.name);
    } catch (error) {
      console.error("❌ Error creating partner:", error.message);
    }
  }

  console.log("\n🎉 Partners seeded successfully!");
  await prisma.$disconnect();
}

seedPartners().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
