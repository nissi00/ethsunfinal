"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, User, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Submission {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: string
    cvUrl: string | null
    coverLetterUrl: string | null
    diplomaUrl: string | null
    status: string
    createdAt: string
}

export function SubmissionList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const router = useRouter()

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch(`/api/admin/submissions/recruitment/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            })
            if (res.ok) {
                toast.success("Statut mis à jour")
                router.refresh()
            }
        } catch (error) {
            toast.error("Erreur update status")
        }
    }

    async function deleteSubmission(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")) return

        try {
            const res = await fetch(`/api/admin/submissions/recruitment/${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                toast.success("Candidature supprimée")
                router.refresh()
            } else {
                toast.error("Erreur lors de la suppression")
            }
        } catch (error) {
            toast.error("Erreur")
        }
    }

    async function deleteDocument(id: string, field: string) {
        if (!confirm("Supprimer ce document ?")) return

        try {
            const res = await fetch(`/api/admin/submissions/recruitment/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ field }),
            })
            if (res.ok) {
                toast.success("Document supprimé")
                router.refresh()
            }
        } catch (error) {
            toast.error("Erreur")
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {initialSubmissions.map((submission) => (
                <Card key={submission.id} className={submission.status === 'new' ? 'border-blue-200 bg-blue-50/20' : ''}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg font-medium">
                                {submission.firstName} {submission.lastName}
                            </CardTitle>
                            {submission.status === 'new' && (
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                                    Nouveau
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{submission.role}</Badge>
                            {submission.status === 'new' && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateStatus(submission.id, 'contacted')}
                                    className="text-xs h-8"
                                >
                                    Marquer comme vu
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => deleteSubmission(submission.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <User className="h-4 w-4" />
                                    {submission.email}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Tél: {submission.phone}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Reçu le {new Date(submission.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {submission.cvUrl && (
                                    <div className="flex justify-between items-center text-sm border p-2 rounded group">
                                        <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> CV</span>
                                        <div className="flex items-center">
                                            <a href={submission.cvUrl} download={`CV_${submission.lastName}.pdf`} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                                            </a>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => deleteDocument(submission.id, 'cvUrl')}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {submission.coverLetterUrl && (
                                    <div className="flex justify-between items-center text-sm border p-2 rounded group">
                                        <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Lettre</span>
                                        <div className="flex items-center">
                                            <a href={submission.coverLetterUrl} download={`Lettre_${submission.lastName}.pdf`} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                                            </a>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => deleteDocument(submission.id, 'coverLetterUrl')}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {submission.diplomaUrl && (
                                    <div className="flex justify-between items-center text-sm border p-2 rounded group">
                                        <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Diplôme</span>
                                        <div className="flex items-center">
                                            <a href={submission.diplomaUrl} download={`Diplome_${submission.lastName}.pdf`} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                                            </a>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => deleteDocument(submission.id, 'diplomaUrl')}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {initialSubmissions.length === 0 && (
                <p className="text-center text-gray-500 py-12">
                    Aucune candidature pour le moment.
                </p>
            )}
        </div>
    )
}
