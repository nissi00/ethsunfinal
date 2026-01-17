"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
    Plus,
    Search,
    Edit,
    Trash2,
    BookOpen,
    Clock,
    Euro,
    GraduationCap,
    Loader2,
    Image as ImageIcon,
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Category {
    id: string
    slug: string
    nameFr: string
    nameEn?: string
}

interface Certification {
    id: string
    slug: string
    titleFr: string
    titleEn?: string
    duration: string
    level: string
    price: string
    imageUrl?: string
    isActive: boolean
    category?: Category
    modules: any[]
}

export default function CertificationsAdminPage() {
    const router = useRouter()
    const [certifications, setCertifications] = useState<Certification[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [editingImageId, setEditingImageId] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState("")
    const [imageDialogOpen, setImageDialogOpen] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [certsRes, catsRes] = await Promise.all([
                fetch("/api/admin/certifications"),
                fetch("/api/admin/categories"),
            ])

            if (certsRes.ok) {
                const data = await certsRes.json()
                setCertifications(data)
            }

            if (catsRes.ok) {
                const data = await catsRes.json()
                setCategories(data)
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des données")
        } finally {
            setLoading(false)
        }
    }

    async function toggleActive(id: string, isActive: boolean) {
        try {
            const res = await fetch(`/api/admin/certifications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive }),
            })

            if (res.ok) {
                setCertifications(prev =>
                    prev.map(c => (c.id === id ? { ...c, isActive } : c))
                )
                toast.success(isActive ? "Certification activée" : "Certification désactivée")
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
        }
    }

    async function deleteCertification(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette certification ?")) return

        try {
            const res = await fetch(`/api/admin/certifications/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setCertifications(prev => prev.filter(c => c.id !== id))
                toast.success("Certification supprimée")
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    const filteredCertifications = certifications.filter(cert => {
        const matchesSearch = cert.titleFr.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === "all" || cert.category?.slug === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleEditImage = (cert: Certification) => {
        setEditingImageId(cert.id)
        setImageUrl(cert.imageUrl || "")
        setImageDialogOpen(true)
    }

    const handleSaveImage = async () => {
        if (!editingImageId) return

        try {
            const res = await fetch(`/api/admin/certifications/${editingImageId}/image`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl }),
            })

            if (!res.ok) throw new Error("Failed to update")

            toast.success("Image mise à jour")
            setImageDialogOpen(false)
            setEditingImageId(null)
            setImageUrl("")
            
            // Refresh certifications
            const response = await fetch("/api/admin/certifications")
            if (response.ok) {
                const data = await response.json()
                setCertifications(data)
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
            console.error(error)
        }
    }

    const handleFileUpload = async (file: File) => {
        if (!file) return

        setUploadingImage(true)
        try {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const base64String = e.target?.result as string
                const res = await fetch("/api/admin/certifications/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ file: base64String }),
                })

                if (res.ok) {
                    const data = await res.json()
                    setImageUrl(data.imageUrl)
                    toast.success("Image téléchargée avec succès")
                } else {
                    toast.error("Erreur lors du téléchargement")
                }
            }
            reader.readAsDataURL(file)
        } catch (error) {
            toast.error("Erreur lors du traitement du fichier")
            console.error(error)
        } finally {
            setUploadingImage(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Certifications</h1>
                    <p className="text-gray-500">Gérer les programmes de formation</p>
                </div>
                <Button onClick={() => router.push("/admin/content/certifications/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Certification
                </Button>
            </div>

                {/* Tabs */}
            <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="list">Liste des certifications</TabsTrigger>
                    <TabsTrigger value="images">Gestion des images</TabsTrigger>
                </TabsList>

                {/* LIST TAB */}
                <TabsContent value="list" className="space-y-4">
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher une certification..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full md:w-[250px]">
                                <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les catégories</SelectItem>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.slug}>
                                        {cat.nameFr}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{certifications.length}</p>
                            <p className="text-sm text-gray-500">Total</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <GraduationCap className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{certifications.filter(c => c.isActive).length}</p>
                            <p className="text-sm text-gray-500">Actives</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{categories.length}</p>
                            <p className="text-sm text-gray-500">Catégories</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Euro className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{certifications.reduce((acc, c) => acc + c.modules.length, 0)}</p>
                            <p className="text-sm text-gray-500">Modules</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

                {/* List */}
                <div className="space-y-4">
                {filteredCertifications.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                            Aucune certification trouvée
                        </CardContent>
                    </Card>
                ) : (
                    filteredCertifications.map(cert => (
                        <Card key={cert.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{cert.titleFr}</h3>
                                            {cert.category && (
                                                <Badge variant="outline">{cert.category.nameFr}</Badge>
                                            )}
                                            <Badge className={cert.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                                                {cert.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {cert.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GraduationCap className="h-4 w-4" /> {cert.level}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Euro className="h-4 w-4" /> {cert.price}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="h-4 w-4" /> {cert.modules.length} modules
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={cert.isActive}
                                            onCheckedChange={checked => toggleActive(cert.id, checked)}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => router.push(`/admin/content/certifications/${cert.id}`)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => deleteCertification(cert.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            </TabsContent>

            {/* IMAGES TAB */}
            <TabsContent value="images" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Gestion des images des certifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {certifications.length === 0 ? (
                            <p className="text-center text-gray-500">Aucune certification trouvée</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {certifications.map(cert => (
                                    <Card key={cert.id} className="overflow-hidden">
                                        <div className="aspect-video bg-gray-200 overflow-hidden">
                                            {cert.imageUrl ? (
                                                <img
                                                    src={cert.imageUrl}
                                                    alt={cert.titleFr}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <ImageIcon className="h-12 w-12 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-4 space-y-3">
                                            <div>
                                                <h3 className="font-semibold text-sm">{cert.titleFr}</h3>
                                                <Badge variant="outline" className="mt-1">
                                                    {cert.category?.nameFr || "Sans catégorie"}
                                                </Badge>
                                            </div>
                                            <Dialog open={imageDialogOpen && editingImageId === cert.id} onOpenChange={setImageDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleEditImage(cert)}
                                                        className="w-full"
                                                    >
                                                        <ImageIcon className="h-4 w-4 mr-2" />
                                                        Modifier l'image
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Modifier l'image - {cert.titleFr}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor={`file-${cert.id}`}>Télécharger une image</Label>
                                                            <Input
                                                                id={`file-${cert.id}`}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files?.[0]) {
                                                                        handleFileUpload(e.target.files[0])
                                                                    }
                                                                }}
                                                                disabled={uploadingImage}
                                                            />
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ou
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="certImageUrl">URL de l'image</Label>
                                                            <Input
                                                                id="certImageUrl"
                                                                type="url"
                                                                value={imageUrl}
                                                                onChange={(e) => setImageUrl(e.target.value)}
                                                                placeholder="https://example.com/image.jpg"
                                                            />
                                                        </div>
                                                        {imageUrl && (
                                                            <div>
                                                                <p className="text-sm text-gray-600 mb-2">Aperçu:</p>
                                                                <img
                                                                    src={imageUrl}
                                                                    alt="Preview"
                                                                    className="h-48 w-full object-cover rounded"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setImageDialogOpen(false)
                                                                    setEditingImageId(null)
                                                                    setImageUrl("")
                                                                }}
                                                            >
                                                                Annuler
                                                            </Button>
                                                            <Button onClick={handleSaveImage} disabled={uploadingImage || !imageUrl}>
                                                                {uploadingImage ? "Traitement..." : "Sauvegarder"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
    )
}
