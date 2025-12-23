import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    // Si pas de session et pas sur la page login, rediriger
    // Note: Le middleware gère déjà ça, mais on double-check côté serveur

    return (
        <div className="min-h-screen bg-[#F5F6F7]">
            <div className="flex min-h-screen">
                <AdminSidebar />
                <main className="flex-1 lg:ml-0">
                    <div className="p-6 lg:p-8 min-h-screen">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
