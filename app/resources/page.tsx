"use client"

import { useContext, useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, BookOpen, Newspaper, Video, File, Loader2 } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import type { Locale } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"



export default function ResourcesPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/site/resources")
        if (res.ok) {
          const data = await res.json()
          setResources(data)
        }
      } catch (error) {
        console.error("Failed to fetch resources")
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  const catalogs = resources.filter(r => r.type === 'catalogue')
  const whitepapers = resources.filter(r => r.type === 'whitepaper')
  const reports = resources.filter(r => r.type === 'report')
  const others = resources.filter(r => r.type === 'other')

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
            {loading ? (
              <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin" /></div>
            ) : catalogs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">Aucun catalogue disponible.</div>
            ) : (
              catalogs.map((catalog, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                  <div className="h-48 bg-gradient-theme flex items-center justify-center">
                    <FileText className="h-20 w-20 text-theme-accent" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                      <Badge className="bg-theme-accent text-theme-primary">PDF</Badge>
                      <Badge variant="outline">{catalog.pages || "N/A"}</Badge>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-theme-primary mb-2 text-balance">
                      {locale === 'en' ? catalog.titleEn || catalog.titleFr : locale === 'es' ? catalog.titleEs || catalog.titleFr : catalog.titleFr}
                    </h3>
                    <p className="text-sm text-theme-text mb-4">
                      {locale === 'en' ? catalog.descriptionEn || catalog.descriptionFr : locale === 'es' ? catalog.descriptionEs || catalog.descriptionFr : catalog.descriptionFr}
                    </p>
                    <a href={catalog.fileUrl} download={`${catalog.titleFr}.pdf`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-theme-secondary hover:opacity-90">
                        <Download className="h-4 w-4 mr-2" />
                        {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
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
            {loading ? (
              <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin" /></div>
            ) : whitepapers.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">Aucun livre blanc disponible.</div>
            ) : (
              whitepapers.map((paper, index) => (
                <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <File className="h-12 w-12 text-theme-accent mb-4" />
                    <Badge className="mb-3 bg-theme-secondary text-white">{paper.category}</Badge>
                    <h3 className="text-lg font-serif font-semibold text-theme-primary mb-3 text-balance">
                      {locale === 'en' ? paper.titleEn || paper.titleFr : locale === 'es' ? paper.titleEs || paper.titleFr : paper.titleFr}
                    </h3>
                    <div className="text-sm text-theme-text mb-4">
                      {paper.author && <p className="font-semibold">{paper.author}</p>}
                      {paper.date && <p>{paper.date}</p>}
                    </div>
                    <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="w-full border-[#C9A44A] text-[#0A2A43] hover:bg-[#C9A44A] hover:text-white bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

       {/* Actualités & Articles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
              {locale === "fr" ? "Actualités & Articles" : locale === "es" ? "Noticias y Artículos" : "News & Articles"}
            </h2>
            <div className="w-24 h-1 bg-theme-accent mx-auto" />
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin" /></div>
            ) : others.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">Aucun article disponible.</div>
            ) : (
              others.map((resource, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Newspaper className="h-10 w-10 text-theme-accent" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex gap-2 mb-2">
                          <Badge className="bg-theme-accent text-theme-primary">{resource.category || "General"}</Badge>
                          {resource.date && <span className="text-sm text-theme-text">{resource.date}</span>}
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-theme-primary mb-2">
                          {locale === 'en' ? resource.titleEn || resource.titleFr : locale === 'es' ? resource.titleEs || resource.titleFr : resource.titleFr}
                        </h3>
                        {resource.descriptionFr && (
                          <p className="text-sm text-theme-text mb-4">
                            {locale === 'en' ? resource.descriptionEn || resource.descriptionFr : locale === 'es' ? resource.descriptionEs || resource.descriptionFr : resource.descriptionFr}
                          </p>
                        )}
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="link" className="text-theme-accent p-0 h-auto self-start">
                            {locale === "fr" ? "Lire l'article" : locale === "es" ? "Leer artículo" : "Read article"} →
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
            {loading ? (
              <div className="col-span-full py-12 flex justify-center"><Loader2 className="animate-spin" /></div>
            ) : reports.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">Aucun rapport disponible.</div>
            ) : (
              reports.map((report, index) => (
                <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="h-12 w-12 text-theme-accent flex-shrink-0" />
                      <div className="flex-grow">
                        <Badge className="mb-3 bg-theme-secondary text-white">{report.year || report.date}</Badge>
                        <h3 className="text-lg font-serif font-semibold text-theme-primary mb-2">
                          {locale === 'en' ? report.titleEn || report.titleFr : locale === 'es' ? report.titleEs || report.titleFr : report.titleFr}
                        </h3>
                        <p className="text-sm text-theme-text mb-4">
                          {locale === 'en' ? report.descriptionEn || report.descriptionFr : locale === 'es' ? report.descriptionEs || report.descriptionFr : report.descriptionFr}
                        </p>
                        <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-theme-accent hover:opacity-90 text-theme-primary">
                            <Download className="h-4 w-4 mr-2" />
                            {locale === "fr" ? "Télécharger" : locale === "es" ? "Descargar" : "Download"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
