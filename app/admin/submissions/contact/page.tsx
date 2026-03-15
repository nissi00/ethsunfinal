"use client"

import React, { useState, useEffect } from "react"
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Trash2,
    CheckCircle,
    Clock,
    AlertCircle,
    Download,
    Mail,
    Phone,
    Building2,
    ChevronDown,
    ChevronUp,
    XCircle,
    Check,
    User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import * as XLSX from 'xlsx'

interface ContactSubmission {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    organization: string | null
    subject: string
    message: string
    status: string
    statut_final: string | null
    createdAt: string
}

const statusConfig = {
    new: { label: "Nouveau", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
    in_progress: { label: "En cours", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    completed: { label: "Traité", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

export default function ContactSubmissionsPage() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedRows(newExpanded)
    }

    async function fetchSubmissions() {
        try {
            const params = new URLSearchParams()
            if (statusFilter !== "all") params.set("status", statusFilter)
            if (search) params.set("search", search)

            const res = await fetch(`/api/forms/contact?${params}`)
            const data = await res.json()
            setSubmissions(data)
        } catch (error) {
            toast.error("Erreur lors du chargement")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubmissions()
    }, [statusFilter])

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        fetchSubmissions()
    }

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch(`/api/forms/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (res.ok) {
                toast.success("Statut mis à jour")
                fetchSubmissions()
            }
        } catch (error) {
            toast.error("Erreur")
        }
    }

    async function updateStatutFinal(id: string, statut_final: string) {
        try {
            const res = await fetch(`/api/forms/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ statut_final }),
            })

            if (res.ok) {
                setSubmissions(prev => prev.map(s => s.id === id ? { ...s, statut_final } : s))
                toast.success("Statut final mis à jour")
                fetchSubmissions()
            } else {
                const errorData = await res.json().catch(() => ({}))
                toast.error(`Erreur: ${errorData.error || res.statusText}`)
                console.error("updateStatutFinal error:", errorData)
            }
        } catch (error) {
            console.error("updateStatutFinal catch:", error)
            toast.error("Erreur de connexion")
        }
    }

    async function deleteSubmission(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return

        try {
            const res = await fetch(`/api/forms/contact/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                toast.success("Message supprimé")
                fetchSubmissions()
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    function exportExcel() {
        const dataForExport = submissions.map(s => ({
            "Prénom": s.firstName,
            "Nom": s.lastName,
            "Email": s.email,
            "Téléphone": s.phone || "",
            "Organisation": s.organization || "",
            "Sujet": s.subject,
            "Message": s.message,
            "Statut": statusConfig[s.status as keyof typeof statusConfig]?.label || s.status,
            "Statut Final": s.statut_final || "En attente",
            "Date": new Date(s.createdAt).toLocaleDateString("fr-FR")
        }))

        const worksheet = XLSX.utils.json_to_sheet(dataForExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts")
        
        XLSX.writeFile(workbook, `contacts_${new Date().toISOString().split("T")[0]}.xlsx`)
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#0A2A43]">
                        Messages de Contact
                    </h1>
                    <p className="text-[#4A4A4A] text-sm">
                        {submissions.length} message{submissions.length > 1 ? "s" : ""}
                    </p>
                </div>
                <Button onClick={exportExcel} variant="outline" className="gap-2 text-[#0A2A43] border-[#0A2A43] hover:bg-[#0A2A43] hover:text-white">
                    <Download className="h-4 w-4" />
                    Exporter Excel
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-none">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher par nom, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" variant="secondary" onClick={handleSearch}>
                            Rechercher
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="border-none">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Chargement...</div>
                    ) : submissions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Aucun message trouvé
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-10"></th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Contact
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Sujet
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Statut Traitement
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Statut Final
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {submissions.map((submission) => {
                                        const status = statusConfig[submission.status as keyof typeof statusConfig]
                                        const isExpanded = expandedRows.has(submission.id)
                                        return (
                                            <React.Fragment key={submission.id}>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4 text-center cursor-pointer" onClick={() => toggleRow(submission.id)}>
                                                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                                                        {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                                                    </Button>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[#0A2A43]">
                                                            {submission.firstName} {submission.lastName}
                                                            {submission.status === "new" && (
                                                                <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                                                                    Nouveau
                                                                </Badge>
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {submission.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-[#4A4A4A]">
                                                        {submission.subject}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Badge className={status?.color || "bg-gray-100"}>
                                                        {status?.label || submission.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {submission.statut_final === "Accepté" ? (
                                                        <Badge className="bg-green-100 text-green-800 border-none"><Check className="w-3 h-3 mr-1"/> Accepté</Badge>
                                                    ) : submission.statut_final === "Refusé" ? (
                                                        <Badge className="bg-red-100 text-red-800 border-none"><XCircle className="w-3 h-3 mr-1"/> Refusé</Badge>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">En attente</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500">
                                                    {formatDate(submission.createdAt)}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Traitement</div>
                                                            <DropdownMenuItem onClick={() => updateStatus(submission.id, "in_progress")}>
                                                                <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                                                                Marquer en cours
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatus(submission.id, "completed")}>
                                                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                                Marquer traité
                                                            </DropdownMenuItem>

                                                            <div className="h-px bg-gray-100 my-1" />
                                                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Décision Finale</div>
                                                            <DropdownMenuItem onClick={() => updateStatutFinal(submission.id, "Accepté")}>
                                                                <Check className="h-4 w-4 mr-2 text-green-600" />
                                                                Accepter
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatutFinal(submission.id, "Refusé")}>
                                                                <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                                                Refuser
                                                            </DropdownMenuItem>

                                                            <div className="h-px bg-gray-100 my-1" />
                                                            <DropdownMenuItem
                                                                onClick={() => deleteSubmission(submission.id)}
                                                                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Supprimer
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <div className="flex justify-end gap-1 mt-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-50" onClick={() => updateStatutFinal(submission.id, "Accepté")} title="Accepter">
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => updateStatutFinal(submission.id, "Refusé")} title="Refuser">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteSubmission(submission.id)} title="Supprimer">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="bg-gray-50/50">
                                                    <td colSpan={7} className="p-0">
                                                        <div className="px-12 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
                                                            {/* Infos Contact */}
                                                            <div className="space-y-3">
                                                                <h4 className="font-semibold text-[#0A2A43] flex items-center gap-2 border-b pb-2">
                                                                    <User className="h-4 w-4 text-[#C9A44A]" /> Coordonnées
                                                                </h4>
                                                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                                    <span className="text-gray-500">Email:</span>
                                                                    <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">{submission.email}</a>
                                                                    
                                                                    <span className="text-gray-500">Téléphone:</span>
                                                                    {submission.phone ? <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline">{submission.phone}</a> : <span className="text-gray-400 italic">Non renseigné</span>}
                                                                    
                                                                    <span className="text-gray-500">Organisation:</span>
                                                                    <span className="text-gray-900">{submission.organization || "-"}</span>
                                                                </div>
                                                            </div>

                                                            {/* Message */}
                                                            <div className="col-span-1 md:col-span-2 space-y-2 mt-2">
                                                                <h4 className="font-medium text-gray-700">Message :</h4>
                                                                <div className="bg-white p-4 rounded-lg border text-sm text-gray-700 whitespace-pre-wrap">
                                                                    {submission.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-[#0A2A43]">
                            Message de {selectedSubmission?.firstName} {selectedSubmission?.lastName}
                        </DialogTitle>
                        <DialogDescription>
                            Reçu le {selectedSubmission && formatDate(selectedSubmission.createdAt)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedSubmission && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-[#C9A44A]" />
                                    <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:underline">
                                        {selectedSubmission.email}
                                    </a>
                                </div>
                                {selectedSubmission.phone && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-[#C9A44A]" />
                                        <a href={`tel:${selectedSubmission.phone}`} className="text-blue-600 hover:underline">
                                            {selectedSubmission.phone}
                                        </a>
                                    </div>
                                )}
                                {selectedSubmission.organization && (
                                    <div className="flex items-center gap-2 text-sm col-span-2">
                                        <Building2 className="h-4 w-4 text-[#C9A44A]" />
                                        {selectedSubmission.organization}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Sujet</div>
                                <div className="text-[#0A2A43] font-medium">{selectedSubmission.subject}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Message</div>
                                <div className="p-4 bg-gray-50 rounded-lg text-[#4A4A4A] whitespace-pre-wrap">
                                    {selectedSubmission.message}
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={() => deleteSubmission(selectedSubmission.id)}
                                    variant="destructive"
                                    className="flex-1"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer définitivement
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
