"use client"

import { useState } from "react"
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
} from "lucide-react"
import type { Locale } from "@/lib/i18n"

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
  },
  {
    number: "02",
    titleFr: "Entretien de Qualification",
    titleEn: "Qualification Interview",
    titleEs: "Entrevista de Calificación",
    descFr: "Analyse de votre profil et de vos objectifs",
  },
  {
    number: "03",
    titleFr: "Validation du Dossier",
    titleEn: "Application Validation",
    titleEs: "Validación de Solicitud",
    descFr: "Évaluation de la conformité juridique et stratégique",
  },
  {
    number: "04",
    titleFr: "Présentation Confidentielle",
    titleEn: "Confidential Presentation",
    titleEs: "Presentación Confidencial",
    descFr: "Conditions financières et modèle économique détaillés",
  },
  {
    number: "05",
    titleFr: "Signature & Formation",
    titleEn: "Signing & Training",
    titleEs: "Firma y Formación",
    descFr: "Contrat, installation LMS et formation initiale",
  },
  {
    number: "06",
    titleFr: "Lancement Officiel",
    titleEn: "Official Launch",
    titleEs: "Lanzamiento Oficial",
    descFr: "Accompagnement lors des premières opérations",
  },
]

export default function FranchisePage() {
  const [locale] = useState<Locale>("fr")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#153D63] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Créer Votre Centre de Formation avec ETHSUN"
                : locale === "es"
                  ? "Crear su Centro de Formación con ETHSUN"
                  : "Create Your Training Center with ETHSUN"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {locale === "fr"
                ? "Le réseau de franchises ETHSUN permet aux entrepreneurs, institutions ou organisations d'ouvrir un centre de formation certifiant sous la marque ETHSUN. Le franchiseur fournit les programmes, la certification, le LMS, le branding, l'audit qualité et le support pédagogique."
                : locale === "es"
                  ? "La red de franquicias ETHSUN permite a emprendedores, instituciones u organizaciones abrir un centro de formación certificado bajo la marca ETHSUN. El franquiciador proporciona programas, certificación, LMS, marca, auditoría de calidad y soporte pedagógico."
                  : "The ETHSUN franchise network allows entrepreneurs, institutions or organizations to open a certified training center under the ETHSUN brand. The franchisor provides programs, certification, LMS, branding, quality audit and pedagogical support."}
            </p>
            <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold">
              {locale === "fr" ? "Rejoindre le Réseau" : locale === "es" ? "Unirse a la Red" : "Join the Network"}
            </Button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Ce que Nous Offrons aux Franchisés"
                : locale === "es"
                  ? "Lo que Ofrecemos a los Franquiciados"
                  : "What We Offer Franchisees"}
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
              {locale === "fr"
                ? "Rôle et Responsabilités du Franchisé"
                : locale === "es"
                  ? "Rol y Responsabilidades del Franquiciado"
                  : "Franchisee Role and Responsibilities"}
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
              {locale === "fr"
                ? "Pourquoi Rejoindre ETHSUN ?"
                : locale === "es"
                  ? "¿Por Qué Unirse a ETHSUN?"
                  : "Why Join ETHSUN?"}
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
              {locale === "fr"
                ? "Processus d'Adhésion en 6 Étapes"
                : locale === "es"
                  ? "Proceso de Adhesión en 6 Etapas"
                  : "6-Step Membership Process"}
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
                {locale === "fr"
                  ? "Rejoindre le Réseau International ETHSUN"
                  : locale === "es"
                    ? "Unirse a la Red Internacional ETHSUN"
                    : "Join the ETHSUN International Network"}
              </h2>
              <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
              <p className="text-[#4A4A4A]">
                {locale === "fr"
                  ? "Complétez ce formulaire pour exprimer votre intérêt. Notre équipe vous contactera sous 48h."
                  : locale === "es"
                    ? "Complete este formulario para expresar su interés. Nuestro equipo le contactará en 48h."
                    : "Complete this form to express your interest. Our team will contact you within 48 hours."}
              </p>
            </div>
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {locale === "fr" ? "Prénom" : locale === "es" ? "Nombre" : "First Name"}
                      </Label>
                      <Input id="firstName" placeholder="" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {locale === "fr" ? "Nom" : locale === "es" ? "Apellido" : "Last Name"}
                      </Label>
                      <Input id="lastName" placeholder="" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {locale === "fr" ? "Téléphone" : locale === "es" ? "Teléfono" : "Phone"}
                    </Label>
                    <Input id="phone" placeholder="" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country">{locale === "fr" ? "Pays" : locale === "es" ? "País" : "Country"}</Label>
                      <Input id="country" placeholder="" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{locale === "fr" ? "Ville" : locale === "es" ? "Ciudad" : "City"}</Label>
                      <Input id="city" placeholder="" />
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
                    <Input id="organization" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      {locale === "fr"
                        ? "Motivation pour devenir franchisé"
                        : locale === "es"
                          ? "Motivación para convertirse en franquiciado"
                          : "Motivation to become a franchisee"}
                    </Label>
                    <Textarea id="motivation" rows={4} placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">
                      {locale === "fr"
                        ? "Présentation du projet"
                        : locale === "es"
                          ? "Presentación del proyecto"
                          : "Project presentation"}
                    </Label>
                    <Textarea id="project" rows={4} placeholder="" />
                  </div>
                  <Button className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6">
                    {locale === "fr"
                      ? "Soumettre ma Candidature"
                      : locale === "es"
                        ? "Enviar mi Candidatura"
                        : "Submit my Application"}
                  </Button>
                  <p className="text-xs text-center text-[#4A4A4A]">
                    {locale === "fr"
                      ? "Le modèle financier détaillé et les conditions contractuelles seront partagés uniquement avec les candidats présélectionnés."
                      : locale === "es"
                        ? "El modelo financiero detallado y las condiciones contractuales se compartirán únicamente con los candidatos preseleccionados."
                        : "The detailed financial model and contractual conditions will be shared only with pre-selected candidates."}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
