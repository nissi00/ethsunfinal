"use client"

import { useContext, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Award,
  BookOpen,
  Laptop,
  Users,
  TrendingUp,
  Globe,
  CheckCircle,
  DollarSign,
  Target,
  Handshake,
  Loader2,
} from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"
import { toast } from "sonner"

const offerings = [
  {
    icon: Award,
    titleFr: "Marque ETHSUN Reconnue",
    titleEn: "Recognized ETHSUN Brand",
    titleEs: "Marca ETHSUN Reconocida",
    descFr: "Exploitez un label premium international basé à Oxford",
    descEn: "Leverage a premium international label based in Oxford",
    descEs: "Aproveche una marca premium internacional con sede en Oxford",
  },
  {
    icon: BookOpen,
    titleFr: "Programmes Clés en Main",
    titleEn: "Turnkey Programs",
    titleEs: "Programas Listos para Usar",
    descFr: "Catalogue complet de certificats et événements développés par Oxford",
    descEn: "Complete catalog of certificates and events developed by Oxford",
    descEs: "Catálogo completo de certificados y eventos desarrollados por Oxford",
  },
  {
    icon: Laptop,
    titleFr: "Plateforme LMS Dédiée",
    titleEn: "Dedicated LMS Platform",
    titleEs: "Plataforma LMS Dedicada",
    descFr: "Learning Management System entièrement configuré et brandé ETHSUN",
    descEn: "Learning Management System fully configured and ETHSUN branded",
    descEs: "Sistema de Gestión del Aprendizaje completamente configurado y con marca ETHSUN",
  },
  {
    icon: Users,
    titleFr: "Accompagnement Continu",
    titleEn: "Continuous Support",
    titleEs: "Acompañamiento Continuo",
    descFr: "Support pédagogique, technique et audit qualité annuel",
    descEn: "Pedagogical, technical support and annual quality audit",
    descEs: "Soporte pedagógico, técnico y auditoría de calidad anual",
  },
  {
    icon: TrendingUp,
    titleFr: "Kit Marketing Complet",
    titleEn: "Complete Marketing Kit",
    titleEs: "Kit de Marketing Completo",
    descFr: "Identité visuelle, supports promotionnels et stratégie de lancement",
    descEn: "Visual identity, promotional materials and launch strategy",
    descEs: "Identidad visual, materiales promocionales y estrategia de lanzamiento",
  },
  {
    icon: Globe,
    titleFr: "Réseau International",
    titleEn: "International Network",
    titleEs: "Red Internacional",
    descFr: "Intégrez un réseau structuré présent en Afrique, Europe et Asie",
    descEn: "Join a structured network present in Africa, Europe and Asia",
    descEs: "Únase a una red estructurada presente en África, Europa y Asia",
  },
]

const responsibilities = [
  {
    titleFr: "Développement du Marché Local",
    titleEn: "Local Market Development",
    titleEs: "Desarrollo del Mercado Local",
    descFr: "Promouvoir et commercialiser les certificats dans votre zone géographique",
    descEn: "Promote and market certificates in your geographic area",
    descEs: "Promover y comercializar certificados en su área geográfica",
  },
  {
    titleFr: "Organisation d'Événements",
    titleEn: "Event Organization",
    titleEs: "Organización de Eventos",
    descFr: "Assurer la logistique et gestion des événements professionnels ETHSUN",
    descEn: "Ensure logistics and management of ETHSUN professional events",
    descEs: "Asegurar la logística y gestión de eventos profesionales ETHSUN",
  },
  {
    titleFr: "Respect des Normes Académiques",
    titleEn: "Academic Standards Compliance",
    titleEs: "Cumplimiento de Normas Académicas",
    descFr: "Appliquer les standards de qualité et charte pédagogique ETHSUN",
    descEn: "Apply ETHSUN quality standards and pedagogical charter",
    descEs: "Aplicar estándares de calidad y carta pedagógica ETHSUN",
  },
  {
    titleFr: "Suivi des Apprenants",
    titleEn: "Learner Monitoring",
    titleEs: "Seguimiento de Alumnos",
    descFr: "Gestion administrative, relation client et reporting périodique",
    descEn: "Administrative management, customer relations and periodic reporting",
    descEs: "Gestión administrativa, relaciones con clientes e informes periódicos",
  },
]

const benefits = [
  {
    icon: Award,
    titleFr: "Marque Crédible",
    titleEn: "Credible Brand",
    titleEs: "Marca Creíble",
    descFr: "Positionnement premium basé à Oxford",
  },
  {
    icon: DollarSign,
    titleFr: "Modèle Rentable",
    titleEn: "Profitable Model",
    titleEs: "Modelo Rentable",
    descFr: "Sans coûts lourds de production",
  },
  {
    icon: TrendingUp,
    titleFr: "Demande Croissante",
    titleEn: "Growing Demand",
    titleEs: "Demanda Creciente",
    descFr: "Marché en expansion continue",
  },
  {
    icon: Target,
    titleFr: "Autonomie Locale",
    titleEn: "Local Autonomy",
    titleEs: "Autonomía Local",
    descFr: "Vous gérez votre marché",
  },
  {
    icon: Globe,
    titleFr: "Réseau International",
    titleEn: "International Network",
    titleEs: "Red Internacional",
    descFr: "Échanges et partenariats",
  },
  {
    icon: Handshake,
    titleFr: "Support Centralisé",
    titleEn: "Centralized Support",
    titleEs: "Soporte Centralizado",
    descFr: "ETHSUN vous accompagne",
  },
]

const steps = [
  {
    number: "01",
    titleFr: "Formulaire de Demande",
    titleEn: "Application Form",
    titleEs: "Formulario de Solicitud",
    descFr: "Exprimez votre intérêt et présentez votre projet",
    descEn: "Express your interest and present your project",
    descEs: "Exprese su interés y presente su proyecto",
  },
  {
    number: "02",
    titleFr: "Entretien de Qualification",
    titleEn: "Qualification Interview",
    titleEs: "Entrevista de Calificación",
    descFr: "Analyse de votre profil et de vos objectifs",
    descEn: "Analysis of your profile and objectives",
    descEs: "Análisis de su perfil y objetivos",
  },
  {
    number: "03",
    titleFr: "Validation du Dossier",
    titleEn: "Application Validation",
    titleEs: "Validación de Solicitud",
    descFr: "Évaluation de la conformité juridique et stratégique",
    descEn: "Evaluation of legal and strategic compliance",
    descEs: "Evaluación de la conformidad legal y estratégica",
  },
  {
    number: "04",
    titleFr: "Présentation Confidentielle",
    titleEn: "Confidential Presentation",
    titleEs: "Presentación Confidencial",
    descFr: "Conditions financières et modèle économique détaillés",
    descEn: "Financial terms and detailed business model",
    descEs: "Términos financieros y modelo económico detallado",
  },
  {
    number: "05",
    titleFr: "Signature & Formation",
    titleEn: "Signing & Training",
    titleEs: "Firma y Formación",
    descFr: "Contrat, installation LMS et formation initiale",
    descEn: "Contract, LMS setup and initial training",
    descEs: "Contrato, instalación del LMS y formación inicial",
  },
  {
    number: "06",
    titleFr: "Lancement Officiel",
    titleEn: "Official Launch",
    titleEs: "Lanzamiento Oficial",
    descFr: "Accompagnement lors des premières opérations",
    descEn: "Support during initial operations",
    descEs: "Acompañamiento durante las operaciones iniciales",
  },
]

export default function FranchisePage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    organization: "",
    motivation: "",
    project: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/forms/franchise", {
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
          city: "",
          organization: "",
          motivation: "",
          project: "",
        })
        toast.success(
          locale === "fr"
            ? "Candidature envoyée avec succès !"
            : locale === "es"
              ? "¡Candidatura enviada con éxito!"
              : "Application submitted successfully!"
        )
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error(
        locale === "fr"
          ? "Erreur lors de l'envoi. Veuillez réessayer."
          : locale === "es"
            ? "Error al enviar. Por favor, inténtelo de nuevo."
            : "Error sending application. Please try again."
      )
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
      <section className="bg-gradient-theme text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {t.franchise.title}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {t.franchise.subtitle}
            </p>
            <Button size="lg" className="bg-theme-accent hover:opacity-90 text-theme-primary font-semibold">
              {t.franchise.join}
            </Button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {t.franchise.offerTitle}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offer, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-[#C9A44A]/10 flex items-center justify-center mb-4">
                    <offer.icon className="h-7 w-7 text-[#C9A44A]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-2">
                    {locale === "fr" ? offer.titleFr : locale === "es" ? offer.titleEs : offer.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {locale === "fr" ? offer.descFr : locale === "es" ? offer.descEs : offer.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {t.franchise.responsibilityTitle}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {responsibilities.map((resp, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-[#C9A44A] mb-3" />
                  <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-2">
                    {locale === "fr" ? resp.titleFr : locale === "es" ? resp.titleEs : resp.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A4A]">
                    {locale === "fr" ? resp.descFr : locale === "es" ? resp.descEs : resp.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {t.franchise.whyJoin}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="h-10 w-10 text-[#C9A44A] mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-[#0A2A43] mb-1">
                    {locale === "fr" ? benefit.titleFr : locale === "es" ? benefit.titleEs : benefit.titleEn}
                  </h4>
                  <p className="text-xs text-[#4A4A4A]">{benefit.descFr}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {t.franchise.processTitle}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6">
                  <div className="text-5xl font-serif font-bold text-[#C9A44A]/20 mb-3">{step.number}</div>
                  <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-2">
                    {locale === "fr" ? step.titleFr : locale === "es" ? step.titleEs : step.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A4A]">
                    {locale === "fr" ? step.descFr : locale === "es" ? step.descEs : step.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
                {t.franchise.formTitle}
              </h2>
              <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
              <p className="text-[#4A4A4A]">
                {t.franchise.formSubtitle}
              </p>
            </div>
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-[#0A2A43] mb-2">
                      {t.franchise.success}
                    </h3>
                    <p className="text-[#4A4A4A] mb-6">
                      {t.franchise.successDesc}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          {locale === "fr" ? "Prénom *" : locale === "es" ? "Nombre *" : "First Name *"}
                        </Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {locale === "fr" ? "Nom *" : locale === "es" ? "Apellido *" : "Last Name *"}
                        </Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {locale === "fr" ? "Téléphone" : locale === "es" ? "Teléfono" : "Phone"}
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">
                          {locale === "fr" ? "Pays *" : locale === "es" ? "País *" : "Country *"}
                        </Label>
                        <Input
                          id="country"
                          required
                          value={formData.country}
                          onChange={(e) => handleChange("country", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          {locale === "fr" ? "Ville *" : locale === "es" ? "Ciudad *" : "City *"}
                        </Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">
                        {locale === "fr"
                          ? "Organisation (optionnel)"
                          : locale === "es"
                            ? "Organización (opcional)"
                            : "Organization (optional)"}
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivation">
                        {locale === "fr"
                          ? "Motivation pour devenir franchisé"
                          : locale === "es"
                            ? "Motivación para convertirse en franquiciado"
                            : "Motivation to become a franchisee"}
                      </Label>
                      <Textarea
                        id="motivation"
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => handleChange("motivation", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project">
                        {locale === "fr"
                          ? "Présentation du projet"
                          : locale === "es"
                            ? "Presentación del proyecto"
                            : "Project presentation"}
                      </Label>
                      <Textarea
                        id="project"
                        rows={4}
                        value={formData.project}
                        onChange={(e) => handleChange("project", e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          {locale === "fr" ? "Envoi en cours..." : locale === "es" ? "Enviando..." : "Submitting..."}
                        </>
                      ) : (
                        locale === "fr"
                          ? "Soumettre ma Candidature"
                          : locale === "es"
                            ? "Enviar mi Candidatura"
                            : "Submit my Application"
                      )}
                    </Button>
                    <p className="text-xs text-center text-[#4A4A4A]">
                      {locale === "fr"
                        ? "Le modèle financier détaillé et les conditions contractuelles seront partagés uniquement avec les candidats présélectionnés."
                        : locale === "es"
                          ? "El modelo financiero detallado y las condiciones contractuales se compartirán únicamente con los candidatos preseleccionados."
                          : "The detailed financial model and contractual conditions will be shared only with pre-selected candidates."}
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
