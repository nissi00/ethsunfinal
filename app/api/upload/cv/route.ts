import { NextRequest, NextResponse } from "next/server";

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

        // Dans une future version avec stockage reel (S3/Supabase Storage),
        // on uploaderait le fichier ici.
        // Pour l'instant on garde la logique Base64 comme pour les autres uploads.
        // L'url stockée est directement la string Base64.

        return NextResponse.json({ url: file }, { status: 200 });
    } catch (error) {
        console.error("[CV_UPLOAD]", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
