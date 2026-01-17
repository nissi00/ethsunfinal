"use client"

import { useContext, useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, Upload, Search } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"
import { toast } from "sonner"

const PROGRAMS = [
  "Management & Leadership",
  "Éthique & Conformité",
  "Gouvernance Publique",
  "Ressources Humaines",
  "Transformation Numérique & IA",
  "Immobilier & Construction",
  "Tourisme & Hôtellerie",
  "Entrepreneuriat"
]

export default function InscriptionPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    program: "",
    profile: "",
    motivation: "",
    lastDiploma: "",
    cvUrl: "",
  })

  // Filter programs based on search term
  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  async function handleFileUpload(file: File) {
    if (!file) return null

    return new Promise<string | null>((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        try {
          const res = await fetch("/api/upload/cv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: reader.result }),
          })

          if (!res.ok) throw new Error("Upload failed")

          const data = await res.json()
          resolve(data.url)
        } catch (error) {
          console.error("Upload error:", error)
          toast.error("Erreur lors de l'upload du CV")
          resolve(null)
        }
      }
      reader.onerror = () => {
        toast.error("Erreur de lecture du fichier")
        resolve(null)
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      let finalCvUrl = formData.cvUrl

      if (cvFile && !finalCvUrl) {
        setUploading(true)
        const uploadedUrl = await handleFileUpload(cvFile)
        setUploading(false)

        if (!uploadedUrl) {
          setLoading(false)
          return // Stop if upload failed
        }
        finalCvUrl = uploadedUrl
      }

      const res = await fetch("/api/forms/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cvUrl: finalCvUrl
        }),
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
          lastDiploma: "",
          cvUrl: "",
        })
        setCvFile(null)
        setSearchTerm("")
        toast.success("Inscription envoyée avec succès !")
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setLoading(false)
      setUploading(false)
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

                  {/* Pays & Diplôme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Pays de résidence</Label>
                      <Input
                        placeholder="France, Maroc, Sénégal…"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Dernier diplôme ou certificat</Label>
                      <Input
                        placeholder="Master 2, Licence, etc."
                        value={formData.lastDiploma}
                        onChange={(e) => handleChange("lastDiploma", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Programme avec Recherche */}
                  <div className="space-y-2">
                    <Label>Programme souhaité *</Label>
                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Rechercher une formation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select
                      value={formData.program}
                      onValueChange={(value) => handleChange("program", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un programme" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredPrograms.length > 0 ? (
                          filteredPrograms.map((prog) => (
                            <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500 text-center">Aucun résultat</div>
                        )}
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

                  {/* CV Upload */}
                  <div>
                    <Label>CV (PDF, Word) - Optionnel</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="cursor-pointer"
                      />
                      {uploading && <Loader2 className="h-4 w-4 animate-spin text-[#C9A44A]" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Format recommandé: PDF. Max 5Mo.</p>
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
                    disabled={loading || uploading}
                    className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6"
                  >
                    {loading || uploading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Traitement en cours...
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
