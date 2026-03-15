import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { file } = body;

        if (!file) {
            return NextResponse.json(
                { error: "File is required" },
                { status: 400 }
            );
        }

        // Vérifier si c'est déjà une data URI base64
        if (typeof file === "string" && file.startsWith("data:")) {
            // Extraire le type MIME et les données base64
            const matches = file.match(/^data:([^;]+);base64,(.+)$/);
            if (!matches) {
                return NextResponse.json({ error: "Format de fichier invalide" }, { status: 400 });
            }

            const mimeType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, "base64");

            // Déterminer l'extension selon le type MIME
            const extensionMap: Record<string, string> = {
                "application/pdf": ".pdf",
                "application/msword": ".doc",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
            };
            const ext = extensionMap[mimeType] || ".pdf";

            // Créer le dossier si nécessaire
            const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
            await mkdir(uploadDir, { recursive: true });

            // Générer un nom de fichier unique
            const fileName = `cv_${randomUUID()}${ext}`;
            const filePath = path.join(uploadDir, fileName);

            // Sauvegarder le fichier
            await writeFile(filePath, buffer);

            // Retourner l'URL publique
            const publicUrl = `/uploads/cv/${fileName}`;
            return NextResponse.json({ url: publicUrl }, { status: 200 });
        }

        // Si c'est juste une chaîne (URL existante), la retourner telle quelle
        return NextResponse.json({ url: file }, { status: 200 });
    } catch (error) {
        console.error("[CV_UPLOAD]", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
