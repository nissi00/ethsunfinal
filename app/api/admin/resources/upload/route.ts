import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const formData = await req.formData()
        const file = formData.get("file") as File
        
        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure the uploads directory exists
        const uploadDir = join(process.cwd(), "public", "uploads", "resources")
        await mkdir(uploadDir, { recursive: true })

        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`
        const path = join(uploadDir, fileName)
        await writeFile(path, buffer)

        const fileUrl = `/uploads/resources/${fileName}`
        return NextResponse.json({ url: fileUrl })
    } catch (error) {
        console.error("Upload Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
