"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Mail, Phone, MapPin, Globe, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface Settings {
    contactEmail: string
    contactPhone: string
    address: string
    adminEmail: string
    facebookUrl: string
    twitterUrl: string
    linkedinUrl: string
    instagramUrl: string
    whatsappNumber: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        contactEmail: "",
        contactPhone: "",
        address: "",
        adminEmail: "",
        facebookUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        instagramUrl: "",
        whatsappNumber: "",
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const res = await fetch("/api/admin/settings")
            const data = await res.json()
            setSettings({
                contactEmail: data.contactEmail || "",
                contactPhone: data.contactPhone || "",
                address: data.address || "",
                adminEmail: data.adminEmail || "",
                facebookUrl: data.facebookUrl || "",
                twitterUrl: data.twitterUrl || "",
                linkedinUrl: data.linkedinUrl || "",
                instagramUrl: data.instagramUrl || "",
                whatsappNumber: data.whatsappNumber || "",
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
                body: JSON.stringify(settings),
            })

            if (res.ok) {
                toast.success("Paramètres mis à jour avec succès")
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde")
        } finally {
            setSaving(false)
        }
    }

    function handleChange(field: keyof Settings, value: string) {
        setSettings({ ...settings, [field]: value })
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
                        Paramètres du Site
                    </h1>
                    <p className="text-[#4A4A4A] text-sm">
                        Informations de contact et réseaux sociaux
                    </p>
                </div>
                <Button
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43]"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Info */}
                <Card className="border-none">
                    <CardHeader>
                        <CardTitle className="font-serif text-[#0A2A43] flex items-center gap-2">
                            <Mail className="h-5 w-5 text-[#C9A44A]" />
                            Informations de Contact
                        </CardTitle>
                        <CardDescription>
                            Ces informations apparaissent dans le footer et la page contact
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email de contact public</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                                    className="pl-10"
                                    placeholder="info@ethsun-oxford.uk"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Téléphone</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="contactPhone"
                                    value={settings.contactPhone}
                                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                                    className="pl-10"
                                    placeholder="+44 74 2420 1585"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Adresse</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="address"
                                    value={settings.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    className="pl-10"
                                    placeholder="Oxford, United Kingdom"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="adminEmail">Email administrateur (notifications)</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="adminEmail"
                                    type="email"
                                    value={settings.adminEmail}
                                    onChange={(e) => handleChange("adminEmail", e.target.value)}
                                    className="pl-10"
                                    placeholder="admin@ethsun-oxford.uk"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Cet email recevra les notifications de nouveaux formulaires (quand Resend sera configuré)
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-none">
                    <CardHeader>
                        <CardTitle className="font-serif text-[#0A2A43] flex items-center gap-2">
                            <Globe className="h-5 w-5 text-[#C9A44A]" />
                            Réseaux Sociaux
                        </CardTitle>
                        <CardDescription>
                            Liens vers vos pages de réseaux sociaux
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="facebookUrl">Facebook</Label>
                            <Input
                                id="facebookUrl"
                                value={settings.facebookUrl}
                                onChange={(e) => handleChange("facebookUrl", e.target.value)}
                                placeholder="https://facebook.com/ethsun"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="twitterUrl">Twitter / X</Label>
                            <Input
                                id="twitterUrl"
                                value={settings.twitterUrl}
                                onChange={(e) => handleChange("twitterUrl", e.target.value)}
                                placeholder="https://twitter.com/ethsun"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedinUrl">LinkedIn</Label>
                            <Input
                                id="linkedinUrl"
                                value={settings.linkedinUrl}
                                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                                placeholder="https://linkedin.com/company/ethsun"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instagramUrl">Instagram</Label>
                            <Input
                                id="instagramUrl"
                                value={settings.instagramUrl}
                                onChange={(e) => handleChange("instagramUrl", e.target.value)}
                                placeholder="https://instagram.com/ethsun"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsappNumber">WhatsApp Business</Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="whatsappNumber"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                                    className="pl-10"
                                    placeholder="+447424201585"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Format international sans espaces
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
