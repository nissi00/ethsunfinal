"use client"

import { useContext, useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Building2, Briefcase, Globe2, Scale, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { LanguageContext } from "@/components/language-provider"
import Link from "next/link"

const eventTypes = [
  {
    icon: Building2,
    titleFr: "Immobilier & Construction",
    titleEn: "Real Estate & Construction",
    titleEs: "Inmobiliaria y Construcción",
    descFr: "Salons professionnels, conférences sectorielles, ateliers techniques",
    descEn: "Professional exhibitions, sector conferences, technical workshops",
    descEs: "Exposiciones profesionales, conferencias sectoriales, talleres técnicos",
  },
  {
    icon: Globe2,
    titleFr: "Tourisme & Hôtellerie",
    titleEn: "Tourism & Hospitality",
    titleEs: "Turismo y Hostelería",
    descFr: "Journées thématiques, forums d'attractivité territoriale",
    descEn: "Thematic days, territorial attractiveness forums",
    descEs: "Jornadas temáticas, foros de atractivo territorial",
  },
  {
    icon: Briefcase,
    titleFr: "Entrepreneuriat & TPE/PME",
    titleEn: "Entrepreneurship & SMEs",
    titleEs: "Emprendimiento y PYMES",
    descFr: "Ateliers d'internationalisation, forums d'investissement",
    descEn: "Internationalization workshops, investment forums",
    descEs: "Talleres de internacionalización, foros de inversión",
  },
  {
    icon: Scale,
    titleFr: "Éthique & Conformité",
    titleEn: "Ethics & Compliance",
    titleEs: "Ética y Cumplimiento",
    descFr: "Séminaires de gouvernance, conférences anticorruption",
    descEn: "Governance seminars, anti-corruption conferences",
    descEs: "Seminarios de gobernanza, conferencias anticorrupción",
  },
]

interface Event {
  id: string
  titleFr: string
  titleEn?: string
  titleEs?: string
  descriptionFr: string
  descriptionEn?: string
  descriptionEs?: string
  type: string
  date: string
  location: string
  capacity?: number
  imageUrl?: string
  registrationUrl?: string
}

export default function EventsPage() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
  const t = getTranslation(locale)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/site/events")
        if (res.ok) {
          const data = await res.json()
          setEvents(data)
        }
      } catch (error) {
        console.error("Failed to fetch events")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  function getEventTitle(event: Event) {
    switch (locale) {
      case 'en': return event.titleEn || event.titleFr;
      case 'es': return event.titleEs || event.titleFr;
      default: return event.titleFr;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-theme text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="h-16 w-16 text-theme-accent mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Événements Professionnels ETHSUN"
                : locale === "es"
                  ? "Eventos Profesionales ETHSUN"
                  : "ETHSUN Professional Events"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              {locale === "fr"
                ? "ETHSUN organise chaque année des événements thématiques à forte valeur ajoutée dans ses franchises internationales. Ces événements permettent d'acquérir rapidement des compétences pratiques et d'interagir avec des experts de haut niveau."
                : locale === "es"
                  ? "ETHSUN organiza cada año eventos temáticos de alto valor agregado en sus franquicias internacionales. Estos eventos permiten adquirir rápidamente habilidades prácticas e interactuar con expertos de alto nivel."
                  : "ETHSUN organizes high-value thematic events every year in its international franchises. These events allow you to quickly acquire practical skills and interact with high-level experts."}
            </p>
          </div>
        </div>
      </section>


      {/* Upcoming Events */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr" ? "Événements à Venir" : locale === "es" ? "Próximos Eventos" : "Upcoming Events"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#0A2A43]" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {locale === "fr" ? "Aucun événement prévu pour le moment." : "No upcoming events."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-xl transition-shadow border-none bg-white overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    {event.imageUrl && (
                      <div className="md:w-1/3 h-48 md:h-auto bg-gray-100">
                        <img src={event.imageUrl} alt={getEventTitle(event)} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardContent className={`p-6 ${event.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-[#C9A44A] text-[#0A2A43]">{event.type}</Badge>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-4 text-balance">
                        {getEventTitle(event)}
                      </h3>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Calendar className="h-4 w-4 text-[#C9A44A]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <MapPin className="h-4 w-4 text-[#C9A44A]" />
                          <span>{event.location}</span>
                        </div>
                        {event.capacity && (
                          <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                            <Users className="h-4 w-4 text-[#C9A44A]" />
                            <span>{event.capacity} places</span>
                          </div>
                        )}
                      </div>
                      <Link href="/inscription">
                        <Button className="w-full bg-[#153D63] hover:bg-[#0A2A43]">
                          {locale === "fr" ? "S'Inscrire" : locale === "es" ? "Registrarse" : "Register"}
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#153D63] to-[#0A2A43] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            {locale === "fr"
              ? "Organiser un Événement avec ETHSUN"
              : locale === "es"
                ? "Organizar un Evento con ETHSUN"
                : "Organize an Event with ETHSUN"}
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {locale === "fr"
              ? "Nos franchises peuvent organiser des événements sur mesure adaptés aux besoins de votre secteur et territoire."
              : locale === "es"
                ? "Nuestras franquicias pueden organizar eventos personalizados adaptados a las necesidades de su sector y territorio."
                : "Our franchises can organize custom events tailored to the needs of your sector and territory."}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold"
            >
              {locale === "fr"
                ? "Nous Contacter"
                : locale === "es"
                  ? "Contáctenos"
                  : "Contact Us"}
            </Button>
          </Link>


        </div>
      </section>

      <Footer />
    </div>
  )
}
