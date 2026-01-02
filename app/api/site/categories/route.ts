import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.certificationCategory.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        nameFr: true,
        nameEn: true,
        nameEs: true,
        isActive: true,
        certifications: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            slug: true,
            titleFr: true,
            titleEn: true,
            titleEs: true,
            duration: true,
            level: true,
            price: true,
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
