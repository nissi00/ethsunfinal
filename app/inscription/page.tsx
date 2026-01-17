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
import { getTranslation, type Locale } from "@/lib/i18n"
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
  const t = getTranslation(locale)
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
            {t.inscription.title}
          </h1>
          <p className="text-gray-200">
            {t.inscription.subtitle}
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
                    {t.inscription.success}
                  </h3>
                  <p className="text-theme-text mb-6">
                    {t.inscription.successDesc}
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                  >
                    {t.inscription.newRegistration}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Identité */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>{t.forms.firstName} *</Label>
                      <Input
                        required
                        placeholder={t.forms.firstName}
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t.forms.lastName} *</Label>
                      <Input
                        required
                        placeholder={t.forms.lastName}
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>{t.forms.email} *</Label>
                      <Input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t.forms.phone}</Label>
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
                      <Label>{t.forms.country}</Label>
                      <Input
                        placeholder={locale === 'fr' ? 'France, Maroc, Sénégal…' : 'Country...'}
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t.forms.lastDiploma}</Label>
                      <Input
                        placeholder={locale === 'fr' ? 'Master 2, Licence, etc.' : 'Master, Bachelor, etc.'}
                        value={formData.lastDiploma}
                        onChange={(e) => handleChange("lastDiploma", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Programme avec Recherche */}
                  <div className="space-y-2">
                    <Label>{t.forms.program} *</Label>
                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder={locale === 'fr' ? "Rechercher une formation..." : "Search a program..."}
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
                        <SelectValue placeholder={t.forms.selectProgram} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredPrograms.length > 0 ? (
                          filteredPrograms.map((prog) => (
                            <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500 text-center">{locale === 'fr' ? 'Aucun résultat' : 'No results'}</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profil */}
                  <div>
                    <Label>{t.forms.profile}</Label>
                    <Select
                      value={formData.profile}
                      onValueChange={(value) => handleChange("profile", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.forms.selectProfile} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Étudiant">{locale === 'fr' ? 'Étudiant' : 'Student'}</SelectItem>
                        <SelectItem value="Salarié">{locale === 'fr' ? 'Salarié' : 'Employee'}</SelectItem>
                        <SelectItem value="Manager / Cadre">{locale === 'fr' ? 'Manager / Cadre' : 'Manager'}</SelectItem>
                        <SelectItem value="Entrepreneur">{locale === 'fr' ? 'Entrepreneur' : 'Entrepreneur'}</SelectItem>
                        <SelectItem value="Fonction publique">{locale === 'fr' ? 'Fonction publique' : 'Public sector'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label>{t.forms.cv} - {locale === 'fr' ? 'Optionnel' : 'Optional'}</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="cursor-pointer"
                      />
                      {uploading && <Loader2 className="h-4 w-4 animate-spin text-[#C9A44A]" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{locale === 'fr' ? 'Format recommandé: PDF. Max 5Mo.' : 'Recommended format: PDF. Max 5MB.'}</p>
                  </div>

                  {/* Motivation */}
                  <div>
                    <Label>{t.forms.motivation}</Label>
                    <Textarea
                      rows={4}
                      placeholder={locale === 'fr' ? "Expliquez brièvement votre motivation…" : "Briefly explain your motivation..."}
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
                        {t.cta.sending}
                      </>
                    ) : (
                      t.cta.submit
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
