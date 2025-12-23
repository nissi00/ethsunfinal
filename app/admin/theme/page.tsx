"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, RefreshCw, Eye } from "lucide-react"
import { toast } from "sonner"

interface SiteSettings {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    textColor: string
    bgColor: string
}

const defaultColors: SiteSettings = {
    primaryColor: "#0A2A43",
    secondaryColor: "#153D63",
    accentColor: "#C9A44A",
    textColor: "#4A4A4A",
    bgColor: "#F5F6F7",
}

const colorLabels = {
    primaryColor: { label: "Couleur primaire", desc: "Couleur principale (headers, boutons)" },
    secondaryColor: { label: "Couleur secondaire", desc: "Variante plus claire" },
    accentColor: { label: "Couleur accent", desc: "Or/doré pour les accents" },
    textColor: { label: "Couleur texte", desc: "Couleur du texte principal" },
    bgColor: { label: "Couleur de fond", desc: "Arrière-plan des sections" },
}

export default function ThemePage() {
    const [colors, setColors] = useState<SiteSettings>(defaultColors)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const res = await fetch("/api/admin/settings")
            const data = await res.json()
            setColors({
                primaryColor: data.primaryColor || defaultColors.primaryColor,
                secondaryColor: data.secondaryColor || defaultColors.secondaryColor,
                accentColor: data.accentColor || defaultColors.accentColor,
                textColor: data.textColor || defaultColors.textColor,
                bgColor: data.bgColor || defaultColors.bgColor,
            })
        } catch (error) {
            toast.error("Erreur lors du chargement")
        } finally {
            setLoading(false)
        }
    }

    async function saveSettings() {
        setSaving(true)
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(colors),
            })

            if (res.ok) {
                toast.success("Thème mis à jour avec succès")
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde")
        } finally {
            setSaving(false)
        }
    }

    function resetToDefault() {
        setColors(defaultColors)
        toast.info("Couleurs réinitialisées (non sauvegardées)")
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
                        Personnalisation du Thème
                    </h1>
                    <p className="text-[#4A4A4A] text-sm">
                        Modifiez les couleurs du site
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={resetToDefault}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Réinitialiser
                    </Button>
                    <Button
                        onClick={saveSettings}
                        disabled={saving}
                        className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43]"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Color Pickers */}
                <Card className="border-none">
                    <CardHeader>
                        <CardTitle className="font-serif text-[#0A2A43]">Couleurs</CardTitle>
                        <CardDescription>
                            Cliquez sur une couleur pour la modifier
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {(Object.keys(colorLabels) as (keyof typeof colorLabels)[]).map((key) => (
                            <div key={key} className="flex items-center gap-4">
                                <div className="relative">
                                    <input
                                        type="color"
                                        value={colors[key]}
                                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-[#0A2A43] font-medium">
                                        {colorLabels[key].label}
                                    </Label>
                                    <p className="text-sm text-gray-500">{colorLabels[key].desc}</p>
                                    <Input
                                        value={colors[key]}
                                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                                        className="mt-1 w-32 font-mono text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Preview */}
                <Card className="border-none">
                    <CardHeader>
                        <CardTitle className="font-serif text-[#0A2A43] flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Prévisualisation
                        </CardTitle>
                        <CardDescription>
                            Aperçu des couleurs sur les éléments du site
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Preview Header */}
                        <div
                            className="rounded-t-lg p-4"
                            style={{ backgroundColor: colors.primaryColor }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-white font-serif font-bold">ETHSUN</span>
                                <div className="flex gap-2">
                                    <span className="text-white/70 text-sm">Accueil</span>
                                    <span className="text-white/70 text-sm">Certifications</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div
                            className="p-6"
                            style={{ backgroundColor: colors.bgColor }}
                        >
                            <h2
                                className="text-xl font-serif font-bold mb-2"
                                style={{ color: colors.primaryColor }}
                            >
                                Titre de section
                            </h2>
                            <div
                                className="w-16 h-1 mb-4"
                                style={{ backgroundColor: colors.accentColor }}
                            />
                            <p
                                className="text-sm mb-4"
                                style={{ color: colors.textColor }}
                            >
                                Ceci est un exemple de texte qui apparaît sur le site.
                                Les couleurs sont appliquées dynamiquement.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                                    style={{ backgroundColor: colors.accentColor, color: colors.primaryColor }}
                                >
                                    Bouton principal
                                </button>
                                <button
                                    className="px-4 py-2 rounded-lg text-sm font-medium border"
                                    style={{ borderColor: colors.secondaryColor, color: colors.secondaryColor }}
                                >
                                    Bouton secondaire
                                </button>
                            </div>
                        </div>

                        {/* Preview Footer */}
                        <div
                            className="rounded-b-lg p-4"
                            style={{ backgroundColor: colors.primaryColor }}
                        >
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/70">© 2024 ETHSUN</span>
                                <span style={{ color: colors.accentColor }}>Oxford, UK</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Info */}
            <Card className="border-none bg-blue-50">
                <CardContent className="p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Note :</strong> Les changements de couleurs seront appliqués au site après actualisation de la page.
                        Pour une application complète, les couleurs seront injectées via CSS variables.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
