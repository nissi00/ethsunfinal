"use client"
export const dynamic = "force-dynamic";
import { useContext, useState, useMemo, useEffect } from "react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

// Les programmes sont désormais chargés dynamiquement depuis l'API

export default function EventRegistrationPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [programsData, setProgramsData] = useState<any[]>([])
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)

  // Pre-fill fields from URL
  const programFromUrl = searchParams.get("event") ? decodeURIComponent(searchParams.get("event") as string) : null
  const imageFromUrl = searchParams.get("image") ? decodeURIComponent(searchParams.get("image") as string) : null

  const [searchTerm, setSearchTerm] = useState(programFromUrl || "")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    event: programFromUrl || "",
    profile: "",
    motivation: "",
    lastDiploma: "",
    cvUrl: "",
  })

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/site/events")
        if (res.ok) {
          const data = await res.json()
          setProgramsData(data)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    fetchEvents()
  }, [locale])

  const programs = useMemo(() => {
    return programsData.map((evt: any) => {
      if (locale === "en") return evt.titleEn || evt.titleFr
      if (locale === "es") return evt.titleEs || evt.titleFr
      return evt.titleFr
    })
  }, [programsData, locale])

  const selectedEventData = useMemo(() => {
    return programsData.find(e => {
      const title = locale === 'en' ? (e.titleEn || e.titleFr) : locale === 'es' ? (e.titleEs || e.titleFr) : e.titleFr
      return title === formData.event
    })
  }, [programsData, formData.event, locale])

  const displayImage = imageFromUrl || selectedEventData?.imageUrl

  useEffect(() => {
    if (programFromUrl) {
      setFormData(prev => ({ ...prev, event: programFromUrl }))
      setSearchTerm(programFromUrl)
    }
  }, [programFromUrl])

  // Filtrage des programmes basé sur le terme de recherche
  const filteredPrograms = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()
    if (!query) return programs
    return programs.filter(p => p.toLowerCase().includes(query))
  }, [searchTerm, programs])

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

      const payload = {
        ...formData,
        cvUrl: finalCvUrl
      };
      console.log("Sending payload:", payload);

      const res = await fetch("/api/forms/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        console.log("Submission successful");
        toast.success("Inscription événement envoyée avec succès !");
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          event: "",
          profile: "",
          motivation: "",
          lastDiploma: "",
          cvUrl: "",
        })
        setCvFile(null)
        setSearchTerm("")
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Submission failed:", errorData);
        throw new Error(errorData.message || errorData.error || "Erreur serveur");
      }
    } catch (error: any) {
      console.error("Submission catch error:", error);
      toast.error(error.message || "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
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
                  {/* Identified Source Context */}
                  {programFromUrl && (
                    <div className="mb-6 p-4 bg-[#0A2A43]/5 border-l-4 border-[#C9A44A] rounded-r-lg flex items-center gap-4">
                      {displayImage && (
                        <div className="hidden sm:block flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden bg-white shadow-sm">
                          <img src={displayImage} alt={programFromUrl || ''} className="object-cover w-full h-full" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {locale === 'fr' ? 'Inscription à l\'événement' : 'Registration for'}
                        </h4>
                        <p className="text-lg font-serif font-bold text-[#0A2A43]">{programFromUrl}</p>
                      </div>
                    </div>
                  )}

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

                  {/* Sélection Événement avec Sélection et Recherche Séparées */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{locale === 'fr' ? "Événement" : locale === 'es' ? "Evento" : "Event"} *</Label>

                      {/* Barre de Recherche (Autocomplete Indépendant) */}
                      {!programFromUrl && (
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#C9A44A] transition-colors" />
                          <Input
                            placeholder={locale === 'fr' ? "Rechercher une formation..." : "Search a program..."}
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value)
                              setShowSearchSuggestions(true)
                            }}
                            onFocus={() => setShowSearchSuggestions(true)}
                            className="pl-10 h-11 border-gray-300 focus:border-[#C9A44A] transition-all"
                          />

                          {showSearchSuggestions && searchTerm.trim() !== "" && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setShowSearchSuggestions(false)} />
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto scrollbar-thin">
                                {filteredPrograms.length > 0 ? (
                                  filteredPrograms.map((prog) => (
                                    <div
                                      key={prog}
                                      className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                                      onClick={() => {
                                        handleChange("event", prog)
                                        setSearchTerm(prog)
                                        setShowSearchSuggestions(false)
                                      }}
                                    >
                                      {prog}
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-3 text-xs text-gray-500 italic text-center">
                                    {locale === 'fr' ? 'Aucun résultat' : 'No results'}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {programFromUrl ? (
                        <Input
                          value={formData.event}
                          disabled
                          className="w-full h-12 border-gray-300 bg-gray-50 opacity-100 text-gray-700 font-medium"
                        />
                      ) : (
                        <Select
                          value={formData.event}
                          onValueChange={(value) => handleChange("event", value)}
                        >
                          <SelectTrigger className="w-full h-12 border-gray-300 hover:border-[#C9A44A] transition-colors">
                            <SelectValue placeholder={t.forms.selectProgram || "Sélectionner un événement"} />
                          </SelectTrigger>
                          <SelectContent className="max-h-64 border-[#C9A44A]">
                            {programs.length > 0 ? (
                              programs.map((prog) => (
                                <SelectItem
                                  key={prog}
                                  value={prog}
                                  className="cursor-pointer py-3"
                                >
                                  <span className="truncate pr-8 block">
                                    {prog}
                                  </span>
                                </SelectItem>
                              ))
                            ) : (
                              <div className="p-4 text-sm text-gray-500 text-center italic">
                                {locale === 'fr' ? 'Chargement...' : 'Loading...'}
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      )}
                      {programFromUrl && (
                        <p className="text-xs text-gray-500 mt-1">
                          {locale === "fr" ? "L'événement est présélectionné basé sur votre choix." : "The event is pre-selected based on your choice."}
                        </p>
                      )}
                    </div>
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
