"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
    ArrowLeft,
    Save,
    Loader2,
    Plus,
    Trash2,
    GripVertical,
    Image as ImageIcon,
} from "lucide-react"

interface Module {
    id?: string
    titleFr: string
    titleEn?: string
    titleEs?: string
    descriptionFr: string
    descriptionEn?: string
    descriptionEs?: string
}

interface Category {
    id: string
    slug: string
    nameFr: string
}

export default function EditCertificationPage() {
    const router = useRouter()
    const params = useParams()
    const isNew = params.id === "new"

    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])

    const [formData, setFormData] = useState({
        slug: "",
        categoryId: "",
        titleFr: "",
        titleEn: "",
        titleEs: "",
        duration: "",
        level: "",
        price: "",
        startDate: "",
        descriptionFr: "",
        descriptionEn: "",
        descriptionEs: "",
        objectifsFr: "[]",
        objectifsEn: "",
        objectifsEs: "",
        debouchesFr: "[]",
        debouchesEn: "",
        debouchesEs: "",
        imageUrl: "",
        isActive: true,
    })

    const [modules, setModules] = useState<Module[]>([])
    const [objectifsList, setObjectifsList] = useState<string[]>([])
    const [debouchesList, setDebouchesList] = useState<string[]>([])

    useEffect(() => {
        fetchCategories()
        if (!isNew) {
            fetchCertification()
        }
    }, [params.id])

    async function fetchCategories() {
        const res = await fetch("/api/admin/categories")
        if (res.ok) {
            const data = await res.json()
            setCategories(data)
        }
    }

    async function fetchCertification() {
        try {
            const res = await fetch(`/api/admin/certifications/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setFormData({
                    slug: data.slug,
                    categoryId: data.categoryId || "",
                    titleFr: data.titleFr,
                    titleEn: data.titleEn || "",
                    titleEs: data.titleEs || "",
                    duration: data.duration,
                    level: data.level,
                    price: data.price,
                    startDate: data.startDate || "",
                    descriptionFr: data.descriptionFr,
                    descriptionEn: data.descriptionEn || "",
                    descriptionEs: data.descriptionEs || "",
                    objectifsFr: data.objectifsFr || "[]",
                    objectifsEn: data.objectifsEn || "",
                    objectifsEs: data.objectifsEs || "",
                    debouchesFr: data.debouchesFr || "[]",
                    debouchesEn: data.debouchesEn || "",
                    debouchesEs: data.debouchesEs || "",
                    imageUrl: data.imageUrl || "",
                    isActive: data.isActive,
                })
                setModules(data.modules || [])
                try {
                    setObjectifsList(JSON.parse(data.objectifsFr || "[]"))
                    setDebouchesList(JSON.parse(data.debouchesFr || "[]"))
                } catch {
                    setObjectifsList([])
                    setDebouchesList([])
                }
            }
        } catch (error) {
            toast.error("Erreur lors du chargement")
        } finally {
            setLoading(false)
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
                    setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }))
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        try {
            const payload = {
                ...formData,
                objectifsFr: JSON.stringify(objectifsList),
                debouchesFr: JSON.stringify(debouchesList),
                modules,
            }

            const url = isNew
                ? "/api/admin/certifications"
                : `/api/admin/certifications/${params.id}`

            const res = await fetch(url, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                toast.success(isNew ? "Certification créée" : "Certification mise à jour")
                router.push("/admin/content/certifications")
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement")
        } finally {
            setSaving(false)
        }
    }

    function addModule() {
        setModules([...modules, { titleFr: "", descriptionFr: "" }])
    }

    function updateModule(index: number, field: string, value: string) {
        setModules(prev => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)))
    }

    function removeModule(index: number) {
        setModules(prev => prev.filter((_, i) => i !== index))
    }

    function addObjectif() {
        setObjectifsList([...objectifsList, ""])
    }

    function updateObjectif(index: number, value: string) {
        setObjectifsList(prev => prev.map((o, i) => (i === index ? value : o)))
    }

    function removeObjectif(index: number) {
        setObjectifsList(prev => prev.filter((_, i) => i !== index))
    }

    function addDebouche() {
        setDebouchesList([...debouchesList, ""])
    }

    function updateDebouche(index: number, value: string) {
        setDebouchesList(prev => prev.map((d, i) => (i === index ? value : d)))
    }

    function removeDebouche(index: number) {
        setDebouchesList(prev => prev.filter((_, i) => i !== index))
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
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isNew ? "Nouvelle Certification" : "Modifier la Certification"}
                        </h1>
                        <p className="text-gray-500">{formData.titleFr || "Remplissez les informations"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="active">Active</Label>
                        <Switch
                            id="active"
                            checked={formData.isActive}
                            onCheckedChange={checked => setFormData({ ...formData, isActive: checked })}
                        />
                    </div>
                    <Button onClick={handleSubmit} disabled={saving || uploadingImage}>
                        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Enregistrer
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informations Générales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="titleFr">Titre (FR) *</Label>
                                <Input
                                    id="titleFr"
                                    value={formData.titleFr}
                                    onChange={e => setFormData({ ...formData, titleFr: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="titleEn">Titre (EN)</Label>
                                <Input
                                    id="titleEn"
                                    value={formData.titleEn}
                                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="titleEs">Titre (ES)</Label>
                                <Input
                                    id="titleEs"
                                    value={formData.titleEs}
                                    onChange={e => setFormData({ ...formData, titleEs: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Catégorie</Label>
                                <Select value={formData.categoryId} onValueChange={v => setFormData({ ...formData, categoryId: v })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.nameFr}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Image d'illustration</Label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        disabled={uploadingImage}
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                handleFileUpload(e.target.files[0])
                                            }
                                        }}
                                        className="mb-2"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Format recommandé : JPG, PNG. Taille max : 2Mo.
                                    </p>
                                </div>
                                {formData.imageUrl && (
                                    <div className="relative w-32 h-24 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Aperçu"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                                        >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                        </button>
                                    </div>
                                )}
                                {!formData.imageUrl && (
                                    <div className="w-32 h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Durée *</Label>
                                <Input
                                    id="duration"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="ex: 4 semaines"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="level">Niveau *</Label>
                                <Select value={formData.level} onValueChange={v => setFormData({ ...formData, level: v })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fondamental">Fondamental</SelectItem>
                                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                                        <SelectItem value="Avancé">Avancé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Prix *</Label>
                                <Input
                                    id="price"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="ex: 1200€"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Date de début</Label>
                                <Input
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    placeholder="ex: 10 Janvier 2026"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="descriptionFr">Description (FR) *</Label>
                            <Textarea
                                id="descriptionFr"
                                value={formData.descriptionFr}
                                onChange={e => setFormData({ ...formData, descriptionFr: e.target.value })}
                                rows={3}
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Objectifs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Objectifs</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addObjectif}>
                            <Plus className="h-4 w-4 mr-1" /> Ajouter
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {objectifsList.map((obj, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <Input
                                    value={obj}
                                    onChange={e => updateObjectif(index, e.target.value)}
                                    placeholder="Objectif..."
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeObjectif(index)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                        {objectifsList.length === 0 && (
                            <p className="text-gray-500 text-sm">Aucun objectif. Cliquez sur "Ajouter" pour en créer.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Modules */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Modules ({modules.length})</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addModule}>
                            <Plus className="h-4 w-4 mr-1" /> Ajouter un module
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {modules.map((module, index) => (
                            <Card key={index} className="bg-gray-50">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium">Module {index + 1}</span>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(index)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Titre (FR)</Label>
                                            <Input
                                                value={module.titleFr}
                                                onChange={e => updateModule(index, "titleFr", e.target.value)}
                                                placeholder="Titre du module"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Titre (EN)</Label>
                                            <Input
                                                value={module.titleEn || ""}
                                                onChange={e => updateModule(index, "titleEn", e.target.value)}
                                                placeholder="Module title"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <Label>Description (FR)</Label>
                                        <Textarea
                                            value={module.descriptionFr}
                                            onChange={e => updateModule(index, "descriptionFr", e.target.value)}
                                            placeholder="Contenu du module..."
                                            rows={2}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {modules.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-4">
                                Aucun module. Cliquez sur "Ajouter un module" pour commencer.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Débouchés */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Débouchés</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addDebouche}>
                            <Plus className="h-4 w-4 mr-1" /> Ajouter
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {debouchesList.map((deb, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <Input
                                    value={deb}
                                    onChange={e => updateDebouche(index, e.target.value)}
                                    placeholder="Débouché..."
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeDebouche(index)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                        {debouchesList.length === 0 && (
                            <p className="text-gray-500 text-sm">Aucun débouché. Cliquez sur "Ajouter" pour en créer.</p>
                        )}
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
