"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, Star, Quote } from "lucide-react"
import { toast } from "sonner"

interface Testimonial {
    id: string
    textFr: string
    textEn: string | null
    textEs: string | null
    author: string
    role: string | null
    rating: number
    isActive: boolean
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    async function fetchTestimonials() {
        try {
            const res = await fetch("/api/admin/testimonials")
            const data = await res.json()
            setTestimonials(data)
        } catch (error) {
            toast.error("Erreur lors du chargement")
        } finally {
            setLoading(false)
        }
    }

    async function saveTestimonial(testimonial: Testimonial) {
        setSaving(true)
        try {
            const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testimonial),
            })

            if (res.ok) {
                toast.success("Témoignage mis à jour")
                setEditingId(null)
            }
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde")
        } finally {
            setSaving(false)
        }
    }

    async function addTestimonial() {
        try {
            const res = await fetch("/api/admin/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    textFr: "Nouveau témoignage...",
                    author: "Nom de l'auteur",
                    role: "Poste, Ville",
                    rating: 5,
                }),
            })

            if (res.ok) {
                const newTestimonial = await res.json()
                setTestimonials([...testimonials, newTestimonial])
                setEditingId(newTestimonial.id)
                toast.success("Témoignage ajouté")
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout")
        }
    }

    async function deleteTestimonial(id: string) {
        if (!confirm("Supprimer ce témoignage ?")) return

        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setTestimonials(testimonials.filter((t) => t.id !== id))
                toast.success("Témoignage supprimé")
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    function updateTestimonial(id: string, field: keyof Testimonial, value: any) {
        setTestimonials(
            testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        )
    }

    if (loading) {
        return <div className="p-8 text-center">Chargement...</div>
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#0A2A43]">
                        Témoignages
                    </h1>
                    <p className="text-[#4A4A4A] text-sm">
                        Avis clients affichés sur le site
                    </p>
                </div>
                <Button onClick={addTestimonial} className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43]">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                </Button>
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className={`border-none ${!testimonial.isActive ? 'opacity-50' : ''}`}>
                        <CardContent className="p-6">
                            {editingId === testimonial.id ? (
                                // Edit Mode
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Texte (FR) *</Label>
                                        <Textarea
                                            value={testimonial.textFr}
                                            onChange={(e) => updateTestimonial(testimonial.id, "textFr", e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Auteur *</Label>
                                            <Input
                                                value={testimonial.author}
                                                onChange={(e) => updateTestimonial(testimonial.id, "author", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Rôle / Poste</Label>
                                            <Input
                                                value={testimonial.role || ""}
                                                onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                                                placeholder="Directeur, Abidjan"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Label>Note :</Label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => updateTestimonial(testimonial.id, "rating", star)}
                                                        className="p-1"
                                                    >
                                                        <Star
                                                            className={`h-5 w-5 ${star <= testimonial.rating
                                                                    ? "fill-[#C9A44A] text-[#C9A44A]"
                                                                    : "text-gray-300"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label>Actif</Label>
                                            <Switch
                                                checked={testimonial.isActive}
                                                onCheckedChange={(checked) =>
                                                    updateTestimonial(testimonial.id, "isActive", checked)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={() => saveTestimonial(testimonial)}
                                            disabled={saving}
                                            className="flex-1 bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43]"
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            Enregistrer
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div>
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#C9A44A] text-[#C9A44A]" />
                                        ))}
                                    </div>
                                    <Quote className="h-6 w-6 text-[#C9A44A]/30 mb-2" />
                                    <p className="text-[#4A4A4A] italic mb-4">
                                        "{testimonial.textFr}"
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-semibold text-[#0A2A43]">
                                                — {testimonial.author}
                                            </p>
                                            {testimonial.role && (
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setEditingId(testimonial.id)}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => deleteTestimonial(testimonial.id)}
                                                className="text-red-600 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}

                {testimonials.length === 0 && (
                    <Card className="border-none col-span-2">
                        <CardContent className="p-8 text-center text-gray-500">
                            Aucun témoignage. Cliquez sur "Ajouter" pour en créer un.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
