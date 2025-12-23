import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    MessageSquare,
    GraduationCap,
    Handshake,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react"
import Link from "next/link"

async function getStats() {
    const [
        contactTotal,
        contactNew,
        inscriptionTotal,
        inscriptionNew,
        franchiseTotal,
        franchiseNew,
    ] = await Promise.all([
        prisma.contactSubmission.count(),
        prisma.contactSubmission.count({ where: { status: "new" } }),
        prisma.inscriptionSubmission.count(),
        prisma.inscriptionSubmission.count({ where: { status: "new" } }),
        prisma.franchiseSubmission.count(),
        prisma.franchiseSubmission.count({ where: { status: "new" } }),
    ])

    return {
        contact: { total: contactTotal, new: contactNew },
        inscription: { total: inscriptionTotal, new: inscriptionNew },
        franchise: { total: franchiseTotal, new: franchiseNew },
    }
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/admin/login")
    }

    const stats = await getStats()
    const totalNew = stats.contact.new + stats.inscription.new + stats.franchise.new

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-[#0A2A43]">
                    Tableau de bord
                </h1>
                <p className="text-[#4A4A4A] mt-1">
                    Bienvenue, {session.user?.name || session.user?.email}
                </p>
            </div>

            {/* Alert for new submissions */}
            {totalNew > 0 && (
                <div className="flex items-center gap-3 p-4 bg-[#C9A44A]/10 border border-[#C9A44A] rounded-lg">
                    <AlertCircle className="h-5 w-5 text-[#C9A44A]" />
                    <span className="text-[#0A2A43] font-medium">
                        Vous avez {totalNew} nouvelle{totalNew > 1 ? "s" : ""} soumission{totalNew > 1 ? "s" : ""} à traiter
                    </span>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/submissions/contact">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
                                Messages Contact
                            </CardTitle>
                            <MessageSquare className="h-5 w-5 text-[#C9A44A]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0A2A43]">{stats.contact.total}</div>
                            {stats.contact.new > 0 && (
                                <p className="text-sm text-[#C9A44A] font-medium mt-1">
                                    {stats.contact.new} nouveau{stats.contact.new > 1 ? "x" : ""}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/submissions/inscription">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
                                Inscriptions
                            </CardTitle>
                            <GraduationCap className="h-5 w-5 text-[#C9A44A]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0A2A43]">{stats.inscription.total}</div>
                            {stats.inscription.new > 0 && (
                                <p className="text-sm text-[#C9A44A] font-medium mt-1">
                                    {stats.inscription.new} nouvelle{stats.inscription.new > 1 ? "s" : ""}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/submissions/franchise">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
                                Candidatures Franchise
                            </CardTitle>
                            <Handshake className="h-5 w-5 text-[#C9A44A]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0A2A43]">{stats.franchise.total}</div>
                            {stats.franchise.new > 0 && (
                                <p className="text-sm text-[#C9A44A] font-medium mt-1">
                                    {stats.franchise.new} nouvelle{stats.franchise.new > 1 ? "s" : ""}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-serif font-semibold text-[#0A2A43] mb-4">
                    Actions rapides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/theme"
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0A2A43]/10 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#0A2A43] to-[#C9A44A]" />
                            </div>
                            <div>
                                <div className="font-medium text-[#0A2A43]">Modifier le thème</div>
                                <div className="text-xs text-[#4A4A4A]">Couleurs du site</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/content/stats"
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0A2A43]/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-[#0A2A43]" />
                            </div>
                            <div>
                                <div className="font-medium text-[#0A2A43]">Statistiques</div>
                                <div className="text-xs text-[#4A4A4A]">Page d'accueil</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/content/testimonials"
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0A2A43]/10 rounded-lg flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-[#0A2A43]" />
                            </div>
                            <div>
                                <div className="font-medium text-[#0A2A43]">Témoignages</div>
                                <div className="text-xs text-[#4A4A4A]">Avis clients</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0A2A43]/10 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-[#0A2A43]" />
                            </div>
                            <div>
                                <div className="font-medium text-[#0A2A43]">Paramètres</div>
                                <div className="text-xs text-[#4A4A4A]">Contact & infos</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
