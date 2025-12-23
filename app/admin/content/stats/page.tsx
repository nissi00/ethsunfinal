"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Save, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Stat {
    id: string
    value: string
    labelFr: string
    labelEn: string
    labelEs: string
    sortOrder: number
}

export default function StatsPage() {
    const [stats, setStats] = useState<Stat[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        fetchStats()
    }, [])

    async function fetchStats() {
        try {
            const res = await fetch("/api/admin/stats")
            const data = await res.json()
            setStats(data)
        } catch (error) {
            toast.error("Erreur lors du chargement")
        } finally {
            setLoading(false)
        }
    }

    // Sauvegarder TOUTES les stats
    async function saveAllStats() {
        setSaving(true)
        try {
            // Sauvegarder chaque stat
            const promises = stats.map((stat) =>
                fetch(`/api/admin/stats/${stat.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(stat),
                })
            )

            await Promise.all(promises)
            toast.success("Toutes les statistiques ont été enregistrées !")
            setHasChanges(false)
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde")
        } finally {
            setSaving(false)
        }
    }

    async function addStat() {
        try {
            const res = await fetch("/api/admin/stats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: "0",
                    labelFr: "Nouvelle statistique",
                    labelEn: "New stat",
                    labelEs: "Nueva estadística",
                    sortOrder: stats.length,
                }),
            })

            if (res.ok) {
                const newStat = await res.json()
                setStats([...stats, newStat])
                toast.success("Statistique ajoutée - N'oubliez pas d'enregistrer !")
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout")
        }
    }

    async function deleteStat(id: string) {
        if (!confirm("Supprimer cette statistique ?")) return

        try {
            const res = await fetch(`/api/admin/stats/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setStats(stats.filter((s) => s.id !== id))
                toast.success("Statistique supprimée")
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        }
    }

    function updateStat(id: string, field: keyof Stat, value: string) {
        setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
        setHasChanges(true)
    }

    if (loading) {
        return <div className="p-8 text-center">Chargement...</div>
    }

    return (
        <div className="space-y-6">
            {/* Header avec bouton Enregistrer tout */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#0A2A43]">
                        Statistiques
                    </h1>
                    <p className="text-[#4A4A4A] text-sm">
                        Ces statistiques apparaissent sur la page d'accueil
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={addStat}
                        variant="outline"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                    </Button>
                    <Button
                        onClick={saveAllStats}
                        disabled={saving}
                        className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43]"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Enregistrer tout
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Alerte si modifications non enregistrées */}
            {hasChanges && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
                    ⚠️ Vous avez des modifications non enregistrées. Cliquez sur "Enregistrer tout" pour les sauvegarder.
                </div>
            )}

            {/* Preview */}
            <Card className="border-none bg-[#0A2A43]">
                <CardContent className="p-6">
                    <p className="text-white/60 text-sm mb-4">Aperçu sur le site :</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.id} className="text-center">
                                <div className="text-3xl font-serif font-bold text-[#C9A44A]">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-300">{stat.labelFr}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Stats Editor */}
            <div className="space-y-4">
                {stats.map((stat, index) => (
                    <Card key={stat.id} className="border-none">
                        <CardContent className="p-6">
                            <div className="flex gap-4 items-start">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A2A43] text-white text-sm font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label>Valeur</Label>
                                        <Input
                                            value={stat.value}
                                            onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                                            placeholder="36"
                                            className="text-xl font-bold text-center"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Label (FR)</Label>
                                        <Input
                                            value={stat.labelFr}
                                            onChange={(e) => updateStat(stat.id, "labelFr", e.target.value)}
                                            placeholder="Programmes Certifiants"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Label (EN)</Label>
                                        <Input
                                            value={stat.labelEn}
                                            onChange={(e) => updateStat(stat.id, "labelEn", e.target.value)}
                                            placeholder="Certified Programs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Label (ES)</Label>
                                        <Input
                                            value={stat.labelEs}
                                            onChange={(e) => updateStat(stat.id, "labelEs", e.target.value)}
                                            placeholder="Programas Certificados"
                                        />
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteStat(stat.id)}
                                    className="text-red-600 hover:text-red-600 hover:bg-red-50 mt-6"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {stats.length === 0 && (
                    <Card className="border-none">
                        <CardContent className="p-8 text-center text-gray-500">
                            Aucune statistique. Cliquez sur "Ajouter" pour en créer une.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
