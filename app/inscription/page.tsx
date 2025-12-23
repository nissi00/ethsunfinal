"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function InscriptionPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    program: "",
    profile: "",
    motivation: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/forms/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          program: "",
          profile: "",
          motivation: "",
        })
        toast.success("Inscription envoyée avec succès !")
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field: string, value: string) {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-theme py-20 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-serif font-bold mb-4">
            Formulaire d'Inscription
          </h1>
          <p className="text-gray-200">
            Rejoignez nos programmes certifiants internationaux et développez
            des compétences stratégiques reconnues.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-theme-bg flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-theme-primary mb-2">
                    Inscription envoyée !
                  </h3>
                  <p className="text-theme-text mb-6">
                    Nous vous contacterons dans les plus brefs délais.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                  >
                    Nouvelle inscription
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Identité */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Prénom *</Label>
                      <Input
                        required
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Nom *</Label>
                      <Input
                        required
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <Input
                        placeholder="+33 6 00 00 00 00"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Pays */}
                  <div>
                    <Label>Pays de résidence</Label>
                    <Input
                      placeholder="France, Maroc, Sénégal…"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                    />
                  </div>

                  {/* Programme */}
                  <div>
                    <Label>Programme souhaité *</Label>
                    <Select
                      value={formData.program}
                      onValueChange={(value) => handleChange("program", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un programme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Management & Leadership">Management & Leadership</SelectItem>
                        <SelectItem value="Éthique & Conformité">Éthique & Conformité</SelectItem>
                        <SelectItem value="Gouvernance Publique">Gouvernance Publique</SelectItem>
                        <SelectItem value="Ressources Humaines">Ressources Humaines</SelectItem>
                        <SelectItem value="Transformation Numérique & IA">Transformation Numérique & IA</SelectItem>
                        <SelectItem value="Immobilier & Construction">Immobilier & Construction</SelectItem>
                        <SelectItem value="Tourisme & Hôtellerie">Tourisme & Hôtellerie</SelectItem>
                        <SelectItem value="Entrepreneuriat">Entrepreneuriat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profil */}
                  <div>
                    <Label>Profil professionnel</Label>
                    <Select
                      value={formData.profile}
                      onValueChange={(value) => handleChange("profile", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Étudiant">Étudiant</SelectItem>
                        <SelectItem value="Salarié">Salarié</SelectItem>
                        <SelectItem value="Manager / Cadre">Manager / Cadre</SelectItem>
                        <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                        <SelectItem value="Fonction publique">Fonction publique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Motivation */}
                  <div>
                    <Label>Message / Motivation</Label>
                    <Textarea
                      rows={4}
                      placeholder="Expliquez brièvement votre motivation…"
                      value={formData.motivation}
                      onChange={(e) => handleChange("motivation", e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Soumettre mon inscription"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
