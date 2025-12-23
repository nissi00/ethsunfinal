"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
    BookOpen,
    Clock,
    Euro,
    GraduationCap,
    Loader2,
} from "lucide-react"

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

            {/* Filters */}
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
        </div>
    )
}
