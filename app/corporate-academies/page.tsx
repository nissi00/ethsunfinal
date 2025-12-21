"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Search, BookOpen, Laptop, LineChart, Award, CheckCircle, ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: Search,
    titleFr: "Identification des Besoins",
    titleEn: "Needs Assessment",
    titleEs: "Identificación de Necesidades",
    descFr: "Diagnostic des compétences existantes, analyse des écarts et définition d'un plan de développement.",
    descEn: "Assessment of existing skills, gap analysis and development plan definition.",
    descEs: "Diagnóstico de competencias existentes, análisis de brechas y definición de plan de desarrollo.",
  },
  {
    number: "02",
    icon: BookOpen,
    titleFr: "Conception Pédagogique",
    titleEn: "Instructional Design",
    titleEs: "Diseño Pedagógico",
    descFr: "Élaboration des programmes incluant objectifs, référentiels, modules interactifs et évaluations.",
    descEn: "Program development including objectives, frameworks, interactive modules and assessments.",
    descEs: "Elaboración de programas incluyendo objetivos, marcos, módulos interactivos y evaluaciones.",
  },
  {
    number: "03",
    icon: Laptop,
    titleFr: "Digitalisation des Contenus",
    titleEn: "Content Digitalization",
    titleEs: "Digitalización de Contenidos",
    descFr: "Production de modules multimédias: vidéos, quiz, simulations, ressources téléchargeables.",
    descEn: "Production of multimedia modules: videos, quizzes, simulations, downloadable resources.",
    descEs: "Producción de módulos multimedia: videos, cuestionarios, simulaciones, recursos descargables.",
  },
  {
    number: "04",
    icon: LineChart,
    titleFr: "Mise en place du LMS",
    titleEn: "LMS Implementation",
    titleEs: "Implementación del LMS",
    descFr: "Configuration d'une plateforme brandée, sécurisée, accessible mobile avec outils de reporting.",
    descEn: "Configuration of a branded, secure, mobile-accessible platform with reporting tools.",
    descEs: "Configuración de una plataforma de marca, segura, accesible móvil con herramientas de informes.",
  },
  {
    number: "05",
    icon: Award,
    titleFr: "Suivi & Certification",
    titleEn: "Monitoring & Certification",
    titleEs: "Seguimiento y Certificación",
    descFr: "Suivi des apprenants, mesure des progrès, évaluations finales et délivrance des certificats.",
    descEn: "Learner monitoring, progress measurement, final assessments and certificate delivery.",
    descEs: "Seguimiento del alumno, medición del progreso, evaluaciones finales y entrega de certificados.",
  },
]

const benefits = [
  {
    titleFr: "Alignement Stratégique",
    titleEn: "Strategic Alignment",
    titleEs: "Alineación Estratégica",
    descFr: "Formation sur mesure répondant exactement aux besoins de votre organisation",
  },
  {
    titleFr: "Économies d'Échelle",
    titleEn: "Economies of Scale",
    titleEs: "Economías de Escala",
    descFr: "Réduction des coûts de formation avec une solution pérenne et évolutive",
  },
  {
    titleFr: "Autonomie Complète",
    titleEn: "Complete Autonomy",
    titleEs: "Autonomía Completa",
    descFr: "Contrôle total sur vos programmes, contenus et processus de certification",
  },
  {
    titleFr: "Mesure d'Impact",
    titleEn: "Impact Measurement",
    titleEs: "Medición de Impacto",
    descFr: "Tableaux de bord et analytics pour suivre la montée en compétences",
  },
  {
    titleFr: "Branding Personnalisé",
    titleEn: "Custom Branding",
    titleEs: "Marca Personalizada",
    descFr: "Plateforme entièrement aux couleurs et charte graphique de votre entreprise",
  },
  {
    titleFr: "Support Continu",
    titleEn: "Ongoing Support",
    titleEs: "Soporte Continuo",
    descFr: "Accompagnement technique et pédagogique tout au long du déploiement",
  },
]

export default function CorporateAcademiesPage() {
  const [locale] = useState<Locale>("fr")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#153D63] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="h-16 w-16 text-[#C9A44A] mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Création d'Académies Digitales d'Entreprise"
                : locale === "es"
                  ? "Creación de Academias Digitales Corporativas"
                  : "Creation of Corporate Digital Academies"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {locale === "fr"
                ? "ETHSUN propose aux entreprises, organisations et institutions un service complet de création d'académies digitales sur mesure. Chaque académie est conçue selon une méthodologie en cinq étapes garantissant performance et impact."
                : locale === "es"
                  ? "ETHSUN ofrece a empresas, organizaciones e instituciones un servicio completo de creación de academias digitales personalizadas. Cada academia se diseña siguiendo una metodología de cinco etapas que garantiza rendimiento e impacto."
                  : "ETHSUN offers companies, organizations and institutions a complete service for creating custom digital academies. Each academy is designed according to a five-step methodology ensuring performance and impact."}
            </p>
            <Link href="/contact" className="btn btn-outline-light btn-lg">
            <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold">
              {locale === "fr"
                ? "Demander un Diagnostic Gratuit"
                : locale === "es"
                  ? "Solicitar Diagnóstico Gratuito"
                  : "Request Free Assessment"}
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Notre Méthodologie en 5 Étapes"
                : locale === "es"
                  ? "Nuestra Metodología en 5 Etapas"
                  : "Our 5-Step Methodology"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              {locale === "fr"
                ? "Un processus structuré et éprouvé pour créer votre académie d'entreprise"
                : locale === "es"
                  ? "Un proceso estructurado y probado para crear su academia corporativa"
                  : "A structured and proven process to create your corporate academy"}
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-[#C9A44A]/10 flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-[#C9A44A]" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-5xl font-serif font-bold text-[#C9A44A]/20">{step.number}</span>
                        <h3 className="text-2xl font-serif font-semibold text-[#0A2A43]">
                          {locale === "fr" ? step.titleFr : locale === "es" ? step.titleEs : step.titleEn}
                        </h3>
                      </div>
                      <p className="text-[#4A4A4A] leading-relaxed">
                        {locale === "fr" ? step.descFr : locale === "es" ? step.descEs : step.descEn}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden lg:block h-6 w-6 text-[#C9A44A] flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Avantages d'une Académie Digitale"
                : locale === "es"
                  ? "Ventajas de una Academia Digital"
                  : "Benefits of a Digital Academy"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6">
                  <CheckCircle className="h-10 w-10 text-[#C9A44A] mb-4" />
                  <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-2">
                    {locale === "fr" ? benefit.titleFr : locale === "es" ? benefit.titleEs : benefit.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A4A]">{benefit.descFr}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Exemples d'Académies Conçues"
                : locale === "es"
                  ? "Ejemplos de Academias Diseñadas"
                  : "Examples of Designed Academies"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: locale === "fr" ? "Académie de Gouvernance Publique" : "Public Governance Academy",
                org:
                  locale === "fr"
                    ? "Institution Gouvernementale, Afrique de l'Ouest"
                    : "Government Institution, West Africa",
                modules: 25,
                learners: "500+",
              },
              {
                title: locale === "fr" ? "Académie de Formation Bancaire" : "Banking Training Academy",
                org: locale === "fr" ? "Groupe Bancaire International" : "International Banking Group",
                modules: 40,
                learners: "1,200+",
              },
              {
                title: locale === "fr" ? "Académie de Développement Commercial" : "Commercial Development Academy",
                org: locale === "fr" ? "Multinationale Télécommunications" : "Multinational Telecommunications",
                modules: 18,
                learners: "800+",
              },
              {
                title: locale === "fr" ? "Académie Leadership & Management" : "Leadership & Management Academy",
                org: locale === "fr" ? "Organisation Internationale" : "International Organization",
                modules: 30,
                learners: "600+",
              },
            ].map((example, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <div className="h-48 bg-gradient-to-br from-[#153D63] to-[#0A2A43] flex items-center justify-center">
                  <Building2 className="h-20 w-20 text-[#C9A44A]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-2">{example.title}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-4">{example.org}</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <div className="font-semibold text-[#C9A44A]">{example.modules}</div>
                      <div className="text-[#4A4A4A]">
                        {locale === "fr" ? "Modules" : locale === "es" ? "Módulos" : "Modules"}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#C9A44A]">{example.learners}</div>
                      <div className="text-[#4A4A4A]">
                        {locale === "fr" ? "Apprenants" : locale === "es" ? "Alumnos" : "Learners"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#153D63] to-[#0A2A43] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            {locale === "fr"
              ? "Créez Votre Académie d'Entreprise"
              : locale === "es"
                ? "Cree su Academia Corporativa"
                : "Create Your Corporate Academy"}
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {locale === "fr"
              ? "Discutons de vos besoins et concevons ensemble une académie digitale adaptée à votre organisation."
              : locale === "es"
                ? "Discutamos sus necesidades y diseñemos juntos una academia digital adaptada a su organización."
                : "Let's discuss your needs and design together a digital academy tailored to your organization."}
          </p>
          <Link href="/contact" className="btn btn-outline-light btn-lg">
          <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold">
            {locale === "fr" ? "Demander un Devis" : locale === "es" ? "Solicitar Cotización" : "Request Quote"}
          </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
