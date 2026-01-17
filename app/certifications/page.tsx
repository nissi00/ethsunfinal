"use client"

import { useContext, useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Award, Users, CheckCircle, Star, Globe, Loader2, Search } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"
import Link from "next/link"

interface Certification {
  id: string
  slug: string
  titleFr: string
  titleEn?: string
  titleEs?: string
  duration: string
  level: string
  price: string
  imageUrl?: string
  isActive: boolean
}

interface Category {
  id: string
  slug: string
  nameFr: string
  nameEn?: string
  nameEs?: string
  isActive: boolean
  certifications: Certification[]
}

export default function CertificationsPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/site/categories", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
          // Sélectionner la première catégorie par défaut
          if (data.length > 0) {
            setSelectedCategory(data[0].slug)
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  function getCategoryName(category: Category) {
    switch (locale) {
      case "en":
        return category.nameEn || category.nameFr
      case "es":
        return category.nameEs || category.nameFr
      default:
        return category.nameFr
    }
  }

  function getCertTitle(cert: Certification) {
    switch (locale) {
      case "en":
        return cert.titleEn || cert.titleFr
      case "es":
        return cert.titleEs || cert.titleFr
      default:
        return cert.titleFr
    }
  }

  function getFilteredCategories() {
    if (!searchQuery.trim()) {
      return categories
    }
    
    const query = searchQuery.toLowerCase()
    return categories.map((category) => ({
      ...category,
      certifications: category.certifications.filter((cert) =>
        getCertTitle(cert).toLowerCase().includes(query)
      ),
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-theme text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "CERTIFICATS ETHSUN"
                : locale === "es"
                  ? "CERTIFICADOS ETHSUN"
                  : "ETHSUN CERTIFICATES"}
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
      <section className="py-16 bg-theme-bg">
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
                  <benefit.icon className="h-12 w-12 text-theme-accent mx-auto mb-4" />
                  <h3 className="font-serif font-semibold text-theme-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-theme-text">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
                ? "Explorez nos domaines de formation couvrant les besoins essentiels des organisations modernes"
                : locale === "es"
                  ? "Explore nuestros ámbitos de formación que cubren las necesidades esenciales de las organizaciones modernas"
                  : "Explore our training domains covering the essential needs of modern organizations"}
            </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4A4A4A]" />
              <Input
                type="text"
                placeholder={locale === "fr" ? "Rechercher une certification..." : locale === "es" ? "Buscar una certificación..." : "Search a certification..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-base border-[#C9A44A] focus:border-[#C9A44A] focus:ring-[#C9A44A]"
              />
            </div>
          </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#C9A44A]" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#4A4A4A]">
                {locale === "fr"
                  ? "Aucune certification disponible pour le moment."
                  : "No certifications available at the moment."}
              </p>
            </div>
          ) : (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 h-auto p-2 bg-[#F5F6F7]">
                {getFilteredCategories().map((category) => (
                  <TabsTrigger
                    key={category.slug}
                    value={category.slug}
                    className="data-[state=active]:bg-[#0A2A43] data-[state=active]:text-white text-xs md:text-sm py-2 px-4"
                  >
                    {getCategoryName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {getFilteredCategories().map((category) => (
                <TabsContent key={category.slug} value={category.slug} className="mt-8">
                  {category.certifications.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-[#4A4A4A]">
                        {locale === "fr"
                          ? "Aucune certification dans cette catégorie."
                          : "No certifications in this category."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.certifications.map((cert) => (
                        <Card key={cert.id} className="hover:shadow-xl transition-shadow border-none overflow-hidden">
                          <div className="h-40 bg-gradient-to-br from-[#153D63] to-[#0A2A43] flex items-center justify-center relative overflow-hidden">
                            {cert.imageUrl ? (
                              <img
                                src={cert.imageUrl}
                                alt={getCertTitle(cert)}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BookOpen className="h-16 w-16 text-[#C9A44A]" />
                            )}
                          </div>
                          <CardContent className="p-6">
                            <Badge className="mb-3 bg-[#C9A44A] text-[#0A2A43]">{cert.level}</Badge>
                            <h3 className="text-lg font-serif font-semibold text-[#0A2A43] mb-3 text-balance">
                              {getCertTitle(cert)}
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
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}

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

      <Footer />
    </div>
  )
}
