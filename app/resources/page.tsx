"use client"

import { useContext, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, BookOpen, Newspaper, Video, File } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import type { Locale } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"

const catalogues = [
  {
    titleFr: "Catalogue Complet des Certificats 2025",
    titleEn: "Complete Certificate Catalog 2025",
    titleEs: "Catálogo Completo de Certificados 2025",
    descFr: "36 programmes certifiants répartis en 8 domaines stratégiques",
    descEn: "36 certification programs across 8 strategic domains",
    descEs: "36 programas de certificación en 8 ámbitos estratégicos",
    pages: "120 pages",
    format: "PDF",
  },
  {
    titleFr: "Guide des Académies d'Entreprise",
    titleEn: "Corporate Academies Guide",
    titleEs: "Guía de Academias Corporativas",
    descFr: "Méthodologie complète de création d'académies digitales",
    descEn: "Complete methodology for creating digital academies",
    descEs: "Metodología completa para crear academias digitales",
    pages: "45 pages",
    format: "PDF",
  },
  {
    titleFr: "Brochure Franchise ETHSUN",
    titleEn: "ETHSUN Franchise Brochure",
    titleEs: "Folleto de Franquicia ETHSUN",
    descFr: "Modèle de franchise et opportunités d'investissement",
    descEn: "Franchise model and investment opportunities",
    descEs: "Modelo de franquicia y oportunidades de inversión",
    pages: "32 pages",
    format: "PDF",
  },
]

const whitepapers = [
  {
    titleFr: "Transformation Numérique des Organisations Publiques",
    titleEn: "Digital Transformation of Public Organizations",
    titleEs: "Transformación Digital de Organizaciones Públicas",
    author: "Dr. James Patterson",
    date: "Mars 2025",
    category: "Innovation",
  },
  {
    titleFr: "L'Intelligence Artificielle au Service de la Gouvernance",
    titleEn: "Artificial Intelligence for Governance",
    titleEs: "Inteligencia Artificial para la Gobernanza",
    author: "Prof. Marie Laurent",
    date: "Février 2025",
    category: "IA & Gouvernance",
  },
  {
    titleFr: "Conformité Anticorruption: Guide Pratique ISO 37001",
    titleEn: "Anti-Corruption Compliance: ISO 37001 Practical Guide",
    titleEs: "Cumplimiento Anticorrupción: Guía Práctica ISO 37001",
    author: "Dr. Sophie Chen",
    date: "Janvier 2025",
    category: "Éthique",
  },
]

const articles = [
  {
    titleFr: "Les Tendances de l'Executive Education en 2025",
    titleEn: "Executive Education Trends in 2025",
    titleEs: "Tendencias de Educación Ejecutiva en 2025",
    date: "10 Février 2025",
    readTime: "5 min",
    category: "Tendances",
  },
  {
    titleFr: "Comment Créer une Culture d'Excellence dans votre Organisation",
    titleEn: "How to Create a Culture of Excellence in Your Organization",
    titleEs: "Cómo Crear una Cultura de Excelencia en su Organización",
    date: "5 Février 2025",
    readTime: "7 min",
    category: "Management",
  },
  {
    titleFr: "L'Importance de la Formation Continue pour les Cadres Dirigeants",
    titleEn: "The Importance of Continuous Training for Executives",
    titleEs: "La Importancia de la Formación Continua para Ejecutivos",
    date: "28 Janvier 2025",
    readTime: "6 min",
    category: "Leadership",
  },
  {
    titleFr: "Marchés Publics: Nouvelles Réformes et Implications",
    titleEn: "Public Procurement: New Reforms and Implications",
    titleEs: "Contratación Pública: Nuevas Reformas e Implicaciones",
    date: "20 Janvier 2025",
    readTime: "8 min",
    category: "Gouvernance",
  },
]

const reports = [
  {
    titleFr: "Rapport Annuel ETHSUN 2024",
    titleEn: "ETHSUN Annual Report 2024",
    titleEs: "Informe Anual ETHSUN 2024",
    descFr: "Activités, impact et perspectives de développement",
    descEn: "Activities, impact and development prospects",
    descEs: "Actividades, impacto y perspectivas de desarrollo",
    year: "2024",
  },
  {
    titleFr: "Étude d'Impact: Formation Executive en Afrique",
    titleEn: "Impact Study: Executive Education in Africa",
    titleEs: "Estudio de Impacto: Educación Ejecutiva en África",
    descFr: "Analyse des besoins et tendances du marché africain",
    descEn: "Analysis of African market needs and trends",
    descEs: "Análisis de necesidades y tendencias del mercado africano",
    year: "2024",
  },
]

export default function ResourcesPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-theme text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="h-16 w-16 text-theme-accent mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Ressources Académiques et Documents"
                : locale === "es"
                  ? "Recursos Académicos y Documentos"
                  : "Academic Resources and Documents"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              {locale === "fr"
                ? "Accédez à notre bibliothèque de ressources académiques: catalogues, livres blancs, publications, rapports et articles spécialisés."
                : locale === "es"
                  ? "Acceda a nuestra biblioteca de recursos académicos: catálogos, libros blancos, publicaciones, informes y artículos especializados."
                  : "Access our library of academic resources: catalogs, white papers, publications, reports and specialized articles."}
            </p>
          </div>
        </div>
      </section>

      {/* Catalogues */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr"
                ? "Catalogues de Formation"
                : locale === "es"
                  ? "Catálogos de Formación"
                  : "Training Catalogs"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catalogues.map((catalogue, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <div className="h-48 bg-gradient-theme flex items-center justify-center">
                  <FileText className="h-20 w-20 text-theme-accent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-theme-accent text-theme-primary">{catalogue.format}</Badge>
                    <Badge variant="outline">{catalogue.pages}</Badge>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-theme-primary mb-2 text-balance">
                    {locale === "fr" ? catalogue.titleFr : locale === "es" ? catalogue.titleEs : catalogue.titleEn}
                  </h3>
                  <p className="text-sm text-theme-text mb-4">
                    {locale === "fr" ? catalogue.descFr : locale === "es" ? catalogue.descEs : catalogue.descEn}
                  </p>
                  <Button className="w-full bg-theme-secondary hover:opacity-90">
                    <Download className="h-4 w-4 mr-2" />
                    {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* White Papers */}
      <section className="py-20 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr" ? "Livres Blancs" : locale === "es" ? "Libros Blancos" : "White Papers"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <File className="h-12 w-12 text-theme-accent mb-4" />
                  <Badge className="mb-3 bg-theme-secondary text-white">{paper.category}</Badge>
                  <h3 className="text-lg font-serif font-semibold text-theme-primary mb-3 text-balance">
                    {locale === "fr" ? paper.titleFr : locale === "es" ? paper.titleEs : paper.titleEn}
                  </h3>
                  <div className="text-sm text-theme-text mb-4">
                    <p className="font-semibold">{paper.author}</p>
                    <p>{paper.date}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-[#C9A44A] text-[#0A2A43] hover:bg-[#C9A44A] hover:text-white bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr" ? "Actualités & Articles" : locale === "es" ? "Noticias y Artículos" : "News & Articles"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Newspaper className="h-10 w-10 text-theme-accent" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex gap-2 mb-2">
                        <Badge className="bg-theme-accent text-theme-primary">{article.category}</Badge>
                        <span className="text-sm text-theme-text">{article.date}</span>
                        <span className="text-sm text-theme-text">• {article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-theme-primary mb-2">
                        {locale === "fr" ? article.titleFr : locale === "es" ? article.titleEs : article.titleEn}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Button variant="link" className="text-theme-accent p-0 h-auto self-start">
                          {locale === "fr" ? "Lire l'article" : locale === "es" ? "Leer artículo" : "Read article"} →
                        </Button>
                        <SocialShare
                          url={`https://ethsun-oxford.uk/resources/articles/${index}`}
                          title={locale === "fr" ? article.titleFr : locale === "es" ? article.titleEs : article.titleEn}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-20 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr" ? "Rapports et Études" : locale === "es" ? "Informes y Estudios" : "Reports and Studies"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reports.map((report, index) => (
              <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="h-12 w-12 text-theme-accent flex-shrink-0" />
                    <div className="flex-grow">
                      <Badge className="mb-3 bg-theme-secondary text-white">{report.year}</Badge>
                      <h3 className="text-lg font-serif font-semibold text-theme-primary mb-2">
                        {locale === "fr" ? report.titleFr : locale === "es" ? report.titleEs : report.titleEn}
                      </h3>
                      <p className="text-sm text-theme-text mb-4">
                        {locale === "fr" ? report.descFr : locale === "es" ? report.descEs : report.descEn}
                      </p>
                      <Button size="sm" className="bg-theme-accent hover:opacity-90 text-theme-primary">
                        <Download className="h-4 w-4 mr-2" />
                        {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr" ? "Ressources Vidéo" : locale === "es" ? "Recursos de Video" : "Video Resources"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                titleFr: "Présentation ETHSUN Executive Education",
                titleEn: "ETHSUN Executive Education Overview",
                titleEs: "Presentación ETHSUN Executive Education",
                duration: "5:30",
              },
              {
                titleFr: "Comment Créer votre Académie d'Entreprise",
                titleEn: "How to Create Your Corporate Academy",
                titleEs: "Cómo Crear su Academia Corporativa",
                duration: "12:45",
              },
              {
                titleFr: "Témoignages de Participants Certifiés",
                titleEn: "Testimonials from Certified Participants",
                titleEs: "Testimonios de Participantes Certificados",
                duration: "8:20",
              },
            ].map((video, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <div className="h-48 bg-gradient-theme flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-theme-accent" />
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-theme-primary text-balance">
                    {locale === "fr" ? video.titleFr : locale === "es" ? video.titleEs : video.titleEn}
                  </h3>
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
