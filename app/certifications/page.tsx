"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { certifications, Cert } from "@/data/certificationsData"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Award, Users, CheckCircle, Star, Globe } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"
import Link from "next/link"

const certificationDomains = [
  {
    id: "management",
    titleFr: "Management & Leadership",
    titleEn: "Management & Leadership",
    titleEs: "Gestión y Liderazgo",
    certificates: [
      {
        slug: "leadership-strategique-et-gouvernance",

        title: {
          fr: "Leadership Stratégique et Gouvernance",
          en: "Strategic Leadership and Governance",
          es: "Liderazgo Estratégico y Gobernanza",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,200",
      },
      {
        slug: "management-equipe-performance",

        title: {
          fr: "Management d'Équipe et Performance",
          en: "Team Management and Performance",
          es: "Gestión de Equipos y Rendimiento",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€900",
      },
      {
        slug: "leadership-transformationnel",
        title: {
          fr: "Leadership Transformationnel",
          en: "Transformational Leadership",
          es: "Liderazgo Transformacional",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,200",
      },
    ],
  },
  {
    id: "ethics",
    titleFr: "Éthique & Conformité",
    titleEn: "Ethics & Compliance",
    titleEs: "Ética y Cumplimiento",
    certificates: [
      {
        slug: "ethique-professionnelle-deontologie",

        title: {
          fr: "Éthique Professionnelle et Déontologie",
          en: "Professional Ethics and Deontology",
          es: "Ética Profesional y Deontología",
        },
        duration: "3 semaines",
        level: "Fondamental",
        price: "€800",
      },
      {
        slug: "conformite-anticorruption-iso37001",

        title: {
          fr: "Conformité Anticorruption (ISO 37001)",
          en: "Anti-Corruption Compliance (ISO 37001)",
          es: "Cumplimiento Anticorrupción (ISO 37001)",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,400",
      },
      {
        slug: "gestion-risques-controle-interne",

        title: {
          fr: "Gestion des Risques et Contrôle Interne",
          en: "Risk Management and Internal Control",
          es: "Gestión de Riesgos y Control Interno",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€1,000",
      },
    ],
  },
  {
    id: "governance",
    titleFr: "Gouvernance Publique",
    titleEn: "Public Governance",
    titleEs: "Gobernanza Pública",
    certificates: [
      {
        slug: "gouvernance-publique-administration",

        title: {
          fr: "Gouvernance Publique et Administration",
          en: "Public Governance and Administration",
          es: "Gobernanza Pública y Administración",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€950",
      },
      {
        slug: "marches-publics-theorie-pratique",
        title: {
          fr: "Marchés Publics: Théorie et Pratique",
          en: "Public Procurement: Theory and Practice",
          es: "Contratación Pública: Teoría y Práctica",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,300",
      },
      {
        slug: "gestion-budgetaire-finances-publiques",

        title: {
          fr: "Gestion Budgétaire et Finances Publiques",
          en: "Budget Management and Public Finance",
          es: "Gestión Presupuestaria y Finanzas Públicas",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€1,000",
      },
    ],
  },
  {
    id: "hr",
    titleFr: "Ressources Humaines",
    titleEn: "Human Resources",
    titleEs: "Recursos Humanos",
    certificates: [
      {
        slug: "mediation-professionnelle",

        title: {
          fr: "Médiation Professionnelle",
          en: "Professional Mediation",
          es: "Mediación Profesional",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,100",
      },
      {
        slug: "intelligence-emotionnelle-qualite-relationnelle",

        title: {
          fr: "Intelligence Émotionnelle et Qualité Relationnelle",
          en: "Emotional Intelligence and Relational Quality",
          es: "Inteligencia Emocional y Calidad Relacional",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€900",
      },
      {
        slug: "gestion-ressources-humaines-modernes",

        title: {
          fr: "Gestion des Ressources Humaines Modernes",
          en: "Modern Human Resources Management",
          es: "Gestión Moderna de Recursos Humanos",
        },
        duration: "4 semaines",
        level: "Intermédiaire",
        price: "€1,200",
      },
    ],
  },
  {
    id: "digital",
    titleFr: "Digitalisation",
    titleEn: "Digital Transformation & AI",
    titleEs: "Transformación Digital e IA",
    certificates: [
      {
        slug: "transformation-numerique-organisations",

        title: {
          fr: "Transformation Numérique des Organisations",
          en: "Digital Transformation of Organizations",
          es: "Transformación Digital de Organizaciones",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,400",
      },
      {slug: "intelligence-artificielle-appliquee",

        title: {
          fr: "leadership-strategique-gouvernance",
          en: "Applied Artificial Intelligence",
          es: "Inteligencia Artificial Aplicada",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,500",
      },
      {slug: "cybersecurite-resilience",

        title: {
          fr: "Cybersécurité et Résilience",
          en: "Cybersecurity and Resilience",
          es: "Ciberseguridad y Resiliencia",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,400",
      },
    ],
  },
  {
    id: "realestate",
    titleFr: "Immobilier & Construction",
    titleEn: "Real Estate & Construction",
    titleEs: "Inmobiliaria y Construcción",
    certificates: [
      {
        slug: "gestion-projet-immobilier",

        title: {
          fr: "Gestion de Projet Immobilier",
          en: "Real Estate Project Management",
          es: "Gestión de Proyectos Inmobiliarios",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,300",
      },
      {
        slug: "gestion-locative-maintenance",

        title: {
          fr: "Investissement Immobilier",
          en: "Real Estate Investment",
          es: "Inversión Inmobiliaria",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€1,100",
      },
      {
        slug: "management-touristique",

        title: {
          fr: "Gestion Locative",
          en: "Rental Management and Maintenance",
          es: "Gestión de Alquileres y Mantenimiento",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€900",
      },
    ],
  },
  {
    id: "tourism",
    titleFr: "Tourisme & Hôtellerie",
    titleEn: "Tourism & Hospitality",
    titleEs: "Turismo y Hostelería",
    certificates: [
      {
        slug: "qualite-service-hotelier",

        title: {
          fr: "Management Touristique",
          en: "Tourism Management",
          es: "Gestión Turística",
        },
        duration: "4 semaines",
        level: "Intermédiaire",
        price: "€1,100",
      },
      {slug: "qualite-service-hotelier",

        title: {
          fr: "Qualité de Service Hôtelier",
          en: "Hotel Service Quality",
          es: "Calidad del Servicio Hotelero",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€950",
      },
      {
        slug: "marketing-territorial",

        title: {
          fr: "Marketing Territorial",
          en: "Territorial Marketing",
          es: "Marketing Territorial",
        },
        duration: "3 semaines",
        level: "Intermédiaire",
        price: "€900",
      },
    ],
  },
  {
    id: "entrepreneurship",
    titleFr: "Entrepreneuriat",
    titleEn: "Entrepreneurship",
    titleEs: "Emprendimiento",
    certificates: [
      {
        slug: "creation-entreprise",

        title: {
          fr: "Création d'Entreprise",
          en: "Business Creation",
          es: "Creación de Empresas",
        },
        duration: "3 semaines",
        level: "Fondamental",
        price: "€850",
      },
      {
        slug: "internationalisation-pme",

        title: {
          fr: "Internationalisation des PME",
          en: "SME Internationalization",
          es: "Internacionalización de PYMES",
        },
        duration: "4 semaines",
        level: "Avancé",
        price: "€1,200",
      },
      {
        slug: "levee-fonds-partenariats",

        title: {
          fr: "leadership-strategique-gouvernance",
          en: "Fundraising and Partnerships",
          es: "Recaudación de Fondos y Alianzas",
        },
        duration: "3 semaines",
        level: "Avancé",
        price: "€1,100",
      },
    ],
  },
]

export default function CertificationsPage() {
  const [locale] = useState<Locale>("fr")
  const t = getTranslation(locale)
  const [selectedDomain, setSelectedDomain] = useState("management")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#153D63] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Programmes Certifiants 100% en Ligne"
                : locale === "es"
                  ? "Programas Certificados 100% en Línea"
                  : "100% Online Certification Programs"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              {locale === "fr"
                ? "Nos certificats sont conçus pour développer des compétences opérationnelles, stratégiques et managériales. Accessibles en ligne, disponibles partout et délivrés après évaluation finale."
                : locale === "es"
                  ? "Nuestros certificados están diseñados para desarrollar habilidades operativas, estratégicas y de gestión. Accesibles en línea, disponibles en todas partes y entregados después de la evaluación final."
                  : "Our certificates are designed to develop operational, strategic and managerial skills. Accessible online, available everywhere and delivered after final assessment."}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title:
                  locale === "fr"
                    ? "Accessibilité Totale"
                    : locale === "es"
                      ? "Accesibilidad Total"
                      : "Total Accessibility",
                desc:
                  locale === "fr"
                    ? "Disponible 24h/24, partout dans le monde"
                    : locale === "es"
                      ? "Disponible 24/7, en todo el mundo"
                      : "Available 24/7, worldwide",
              },
              {
                icon: Clock,
                title: locale === "fr" ? "Flexibilité" : locale === "es" ? "Flexibilidad" : "Flexibility",
                desc:
                  locale === "fr"
                    ? "Progressez à votre propre rythme"
                    : locale === "es"
                      ? "Progrese a su propio ritmo"
                      : "Progress at your own pace",
              },
              {
                icon: Award,
                title:
                  locale === "fr"
                    ? "Certification Reconnue"
                    : locale === "es"
                      ? "Certificación Reconocida"
                      : "Recognized Certification",
                desc:
                  locale === "fr"
                    ? "Diplôme vérifié par QR code"
                    : locale === "es"
                      ? "Diploma verificado por código QR"
                      : "QR code verified diploma",
              },
              {
                icon: Users,
                title: locale === "fr" ? "Accompagnement" : locale === "es" ? "Acompañamiento" : "Support",
                desc:
                  locale === "fr"
                    ? "Support pédagogique et technique"
                    : locale === "es"
                      ? "Soporte pedagógico y técnico"
                      : "Pedagogical and technical support",
              },
              {
                icon: CheckCircle,
                title: locale === "fr" ? "Contenu Premium" : locale === "es" ? "Contenido Premium" : "Premium Content",
                desc:
                  locale === "fr"
                    ? "Conçu par des experts internationaux"
                    : locale === "es"
                      ? "Diseñado por expertos internacionales"
                      : "Designed by international experts",
              },
              {
                icon: Star,
                title: locale === "fr" ? "ROI Professionnel" : locale === "es" ? "ROI Profesional" : "Professional ROI",
                desc:
                  locale === "fr"
                    ? "Compétences immédiatement applicables"
                    : locale === "es"
                      ? "Habilidades inmediatamente aplicables"
                      : "Immediately applicable skills",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-[#C9A44A] mx-auto mb-4" />
                  <h3 className="font-serif font-semibold text-[#0A2A43] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Certifications Grid */}
{/* <section className="py-16 bg-[#F5F6F7]">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certifications.map((cert: Cert) => (
        <Card key={cert.slug} className="p-6">
          <Badge className="mb-3 bg-[#C9A44A] text-[#0A2A43]">{cert.level}</Badge>
          <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-3 text-balance">
            {locale === "fr" ? cert.title.fr : locale === "es" ? cert.title.es : cert.title.en}
          </h3>
          <div className="flex items-center justify-between text-sm text-[#4A4A4A] mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{cert.duration}</span>
            </div>
            <span className="font-semibold text-[#C9A44A]">{cert.price}</span>
          </div>

          <Link href={`/certifications/${cert.slug}`}>
            <Button className="w-full bg-[#153D63] hover:bg-[#0A2A43]">
              {locale === "fr" ? "En savoir plus" : locale === "es" ? "Saber más" : "Learn more"}
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  </div>
</section> */}


      {/* Certificates Catalog */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Catalogue des Certificats"
                : locale === "es"
                  ? "Catálogo de Certificados"
                  : "Certificate Catalog"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              {locale === "fr"
                ? "Explorez nos 8 domaines de formation couvrant les besoins essentiels des organisations modernes"
                : locale === "es"
                  ? "Explore nuestros 8 ámbitos de formación que cubren las necesidades esenciales de las organizaciones modernas"
                  : "Explore our 8 training domains covering the essential needs of modern organizations"}
            </p>
          </div>

          <Tabs value={selectedDomain} onValueChange={setSelectedDomain} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-[#F5F6F7]">
              {certificationDomains.map((domain) => (
                <TabsTrigger
                  key={domain.id}
                  value={domain.id}
                  className="data-[state=active]:bg-[#0A2A43] data-[state=active]:text-white text-xs md:text-sm py-2"
                >
                  {locale === "fr" ? domain.titleFr : locale === "es" ? domain.titleEs : domain.titleEn}
                </TabsTrigger>
              ))}
            </TabsList>

            {certificationDomains.map((domain) => (
              <TabsContent key={domain.id} value={domain.id} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {domain.certificates.map((cert, index) => (
                    <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                      <div className="h-40 bg-gradient-to-br from-[#153D63] to-[#0A2A43] flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-[#C9A44A]" />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-[#C9A44A] text-[#0A2A43]">{cert.level}</Badge>
                        <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-3 text-balance">
                          {locale === "fr" ? cert.title.fr : locale === "es" ? cert.title.es : cert.title.en}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-[#4A4A4A] mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{cert.duration}</span>
                          </div>
                          <span className="font-semibold text-[#C9A44A]">{cert.price}</span>
                        </div>
                          <Link href={`/certifications/${cert.slug}`}>
  <Button className="w-full bg-[#153D63] hover:bg-[#0A2A43]">
    {locale === "fr" ? "En savoir plus" : locale === "es" ? "Saber más" : "Learn more"}
  </Button>
</Link>

                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold">
              {locale === "fr"
                ? "Télécharger le Catalogue Complet"
                : locale === "es"
                  ? "Descargar Catálogo Completo"
                  : "Download Full Catalog"}
            </Button>
            
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[#0A2A43] text-center mb-12">
            {locale === "fr" ? "Témoignages" : locale === "es" ? "Testimonios" : "Testimonials"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text:
                  locale === "fr"
                    ? "Le certificat ETHSUN m'a permis d'acquérir une compétence directement applicable dans mon entreprise."
                    : "El certificado ETHSUN me permitió adquirir una competencia directamente aplicable en mi empresa.",
                author: locale === "fr" ? "Responsable Opérations, Abidjan" : "Gerente de Operaciones, Abidjan",
              },
              {
                text:
                  locale === "fr"
                    ? "Les modules sont structurés, accessibles et très pertinents. J'ai particulièrement apprécié les études de cas."
                    : "Los módulos son estructurados, accesibles y muy pertinentes. Aprecié especialmente los estudios de caso.",
                author: locale === "fr" ? "Directeur Adjoint, Dakar" : "Director Adjunto, Dakar",
              },
              {
                text:
                  locale === "fr"
                    ? "Une formation flexible, riche et très bien encadrée. Je recommande à tous les managers."
                    : "Una formación flexible, rica y muy bien supervisada. Recomiendo a todos los gerentes.",
                author: locale === "fr" ? "Manager RH, Genève" : "Gerente de RRHH, Ginebra",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C9A44A] text-[#C9A44A]" />
                    ))}
                  </div>
                  <p className="text-[#4A4A4A] mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-sm font-semibold text-[#0A2A43]">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
