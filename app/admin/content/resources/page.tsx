"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
    Plus,
    Search,
    Edit,
    Trash2,
    FileText,
    Download,
    Loader2,
    Upload,
    ExternalLink,
    AlertTriangle,
    ShieldCheck,
    FileSignature,
    Database
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Resource {
    id: string
    titleFr: string
    titleEn?: string
    titleEs?: string
    descriptionFr?: string
    fileUrl: string
    type: string
    slug?: string
    category?: string
    author?: string
    date?: string
    pages?: string
    isActive: boolean
    sortOrder: number
}

const RESOURCE_TYPES = [
    { value: "catalogue", label: "Catalogue" },
    { value: "whitepaper", label: "Livre Blanc" },
    { value: "report", label: "Rapport" },
    { value: "legal", label: "Document Légal" },
    { value: "other", label: "Autre" }
]

export default function ResourcesAdminPage() {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [editingResource, setEditingResource] = useState<Partial<Resource> | null>(null)
    const [isSeeding, setIsSeeding] = useState(false)

    useEffect(() => {
        fetchResources()
    }, [])

    async function fetchResources() {
        try {
            const res = await fetch("/api/admin/resources")
            if (res.ok) {
                const data = await res.json()
                setResources(data)
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des ressources")
        } finally {
            setLoading(false)
        }
    }

    async function handleSeed() {
        if (!confirm("Importer les données par défaut ? Cela n'effacera pas vos données existantes.")) return
        setIsSeeding(true)
        try {
            const res = await fetch("/api/admin/resources/seed", { method: "POST" })
            if (res.ok) {
                toast.success("Contenu par défaut importé")
                fetchResources()
            }
        } catch (error) {
            toast.error("Erreur de seeding")
        } finally {
            setIsSeeding(false)
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/admin/resources/upload", {
                method: "POST",
                body: formData
            })

            if (res.ok) {
                const data = await res.json()
                setEditingResource(prev => ({ ...prev, fileUrl: data.url }))
                toast.success("Fichier uploadé avec succès")
            } else {
                toast.error("Erreur lors de l'upload")
            }
        } catch (error) {
            toast.error("Erreur réseau lors de l'upload")
        } finally {
            setIsUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!editingResource?.titleFr || !editingResource?.fileUrl) {
            toast.error("Le titre et le fichier sont obligatoires")
            return
        }

        const method = editingResource.id ? "PUT" : "POST"
        const url = editingResource.id 
            ? `/api/admin/resources/${editingResource.id}` 
            : "/api/admin/resources"

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingResource)
            })

            if (res.ok) {
                toast.success(editingResource.id ? "Ressource mise à jour" : "Ressource créée")
                setIsDialogOpen(false)
                setEditingResource(null)
                fetchResources()
            } else {
                toast.error("Erreur lors de l'enregistrement")
            }
        } catch (error) {
            toast.error("Erreur réseau")
        }
    }

    async function toggleActive(id: string, isActive: boolean) {
        try {
            const res = await fetch(`/api/admin/resources/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive })
            })
            if (res.ok) {
                setResources(prev => prev.map(r => r.id === id ? { ...r, isActive } : r))
                toast.success(isActive ? "Activée" : "Désactivée")
            }
        } catch (error) {
            toast.error("Erreur")
        }
    }

    async function deleteResource(id: string) {
        if (!confirm("Supprimer cette ressource ?")) return
        try {
            const res = await fetch(`/api/admin/resources/${id}`, { method: "DELETE" })
            if (res.ok) {
                setResources(prev => prev.filter(r => r.id !== id))
                toast.success("Supprimée")
            }
        } catch (error) {
            toast.error("Erreur")
        }
    }

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.titleFr.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = typeFilter === "all" || r.type === typeFilter
        return matchesSearch && matchesType
    })

    const legalDocs = filteredResources.filter(r => r.type === "legal")
    const otherResources = filteredResources.filter(r => r.type !== "legal")

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-[#0A2A43]" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#0A2A43]">Ressources PDF</h1>
                    <p className="text-[#4A4A4A]">Gérez les catalogues, livres blancs et documents légaux.</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline"
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="border-[#0A2A43] text-[#0A2A43] hover:bg-[#0A2A43] hover:text-white"
                    >
                        {isSeeding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Database className="h-4 w-4 mr-2" />}
                        Restaurer défauts
                    </Button>
                    <Button 
                        onClick={() => {
                            setEditingResource({ type: "catalogue", isActive: true, sortOrder: 0 })
                            setIsDialogOpen(true)
                        }}
                        className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-bold"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle Ressource
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher par titre..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-10 h-11 border-gray-200 focus:border-[#C9A44A]"
                            />
                        </div>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-full md:w-[250px] h-11">
                                <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les catégories</SelectItem>
                                {RESOURCE_TYPES.map(type => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Documents Légaux Section */}
            {(typeFilter === "all" || typeFilter === "legal") && (
                <div className="space-y-4">
                    <h2 className="text-xl font-serif font-semibold text-[#0A2A43] flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[#C9A44A]" />
                        Documents Légaux (Politique, CGV)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {legalDocs.length === 0 && typeFilter === "all" && (
                            <div className="col-span-2 p-8 border-2 border-dashed rounded-lg text-center text-gray-500">
                                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                                Aucun document légal configuré. Créez-en un avec le slug "privacy-policy" ou "terms-of-sale".
                            </div>
                        )}
                        {legalDocs.map(resource => (
                            <ResourceCard 
                                key={resource.id} 
                                resource={resource} 
                                onEdit={(r) => { setEditingResource(r); setIsDialogOpen(true); }}
                                onDelete={deleteResource}
                                onToggleActive={toggleActive}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Autres Ressources Section */}
            {(typeFilter === "all" || typeFilter !== "legal") && (
                <div className="space-y-4">
                    <h2 className="text-xl font-serif font-semibold text-[#0A2A43] flex items-center gap-2">
                        <FileSignature className="h-5 w-5 text-[#C9A44A]" />
                        Ressources du Site
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherResources.map(resource => (
                            <ResourceCard 
                                key={resource.id} 
                                resource={resource} 
                                onEdit={(r) => { setEditingResource(r); setIsDialogOpen(true); }}
                                onDelete={deleteResource}
                                onToggleActive={toggleActive}
                            />
                        ))}
                    </div>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingResource?.id ? "Modifier" : "Nouvelle"} Ressource</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Titre (FR) *</Label>
                                <Input 
                                    required 
                                    value={editingResource?.titleFr || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, titleFr: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Titre (EN)</Label>
                                <Input 
                                    value={editingResource?.titleEn || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, titleEn: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type de Ressource</Label>
                                <Select 
                                    value={editingResource?.type || "catalogue"} 
                                    onValueChange={v => setEditingResource(prev => ({ ...prev, type: v }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {RESOURCE_TYPES.map(t => (
                                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (Optionnel - ex: privacy-policy)</Label>
                                <Input 
                                    value={editingResource?.slug || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, slug: e.target.value }))}
                                    placeholder="Identifiant interne unique"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description (FR)</Label>
                            <Textarea 
                                value={editingResource?.descriptionFr || ""} 
                                onChange={e => setEditingResource(prev => ({ ...prev, descriptionFr: e.target.value }))}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Catégorie / Année</Label>
                                <Input 
                                    value={editingResource?.category || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, category: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Auteur</Label>
                                <Input 
                                    value={editingResource?.author || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, author: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Pages / Format</Label>
                                <Input 
                                    value={editingResource?.pages || ""} 
                                    onChange={e => setEditingResource(prev => ({ ...prev, pages: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                            <Label className="block mb-2">Fichier PDF *</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleUpload}
                                    disabled={isUploading}
                                    className="bg-white"
                                />
                                {isUploading && <Loader2 className="h-5 w-5 animate-spin text-[#C9A44A]" />}
                            </div>
                            {editingResource?.fileUrl && (
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <Download className="h-3 w-3" /> Fichier prêt: {editingResource.fileUrl.split('/').pop()}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-2">
                                <Switch 
                                    id="active" 
                                    checked={editingResource?.isActive} 
                                    onCheckedChange={v => setEditingResource(prev => ({ ...prev, isActive: v }))} 
                                />
                                <Label htmlFor="active">Ressource Active</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                                <Button className="bg-[#0A2A43] hover:bg-[#153D63]" type="submit">Sauvegarder</Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function ResourceCard({ resource, onEdit, onDelete, onToggleActive }: { 
    resource: Resource, 
    onEdit: (r: Resource) => void, 
    onDelete: (id: string) => void,
    onToggleActive: (id: string, active: boolean) => void 
}) {
    return (
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col">
            <div className="h-2 bg-[#C9A44A]" />
            <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-[#0A2A43]/10 text-[#0A2A43]">
                        {RESOURCE_TYPES.find(t => t.value === resource.type)?.label || resource.type}
                    </Badge>
                    <div className="flex items-center gap-2">
                        <Switch 
                            checked={resource.isActive} 
                            onCheckedChange={v => onToggleActive(resource.id, v)}
                        />
                    </div>
                </div>

                <h3 className="font-serif font-bold text-[#0A2A43] mb-2 line-clamp-2">
                    {resource.titleFr}
                </h3>
                
                {resource.slug && (
                    <p className="text-[10px] text-gray-400 font-mono mb-2">SLUG: {resource.slug}</p>
                )}

                <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-4 flex-1">
                    {resource.descriptionFr || "Aucune description."}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => onEdit(resource)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onDelete(resource.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#153D63] hover:bg-[#0A2A43]">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Voir PDF
                        </Button>
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}
