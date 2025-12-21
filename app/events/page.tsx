"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Building2, Briefcase, Globe2, Scale } from "lucide-react"
import type { Locale } from "@/lib/i18n"
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

const upcomingEvents = [
  {
    title: {
      fr: "Salon International de l'Immobilier Durable",
      en: "International Sustainable Real Estate Fair",
      es: "Feria Internacional de Inmobiliaria Sostenible",
    },
    date: "15-17 Mars 2025",
    location: "Abidjan, Côte d'Ivoire",
    category: "Immobilier",
    participants: "500+ professionnels",
    format: "Présentiel",
  },
  {
    title: {
      fr: "Forum du Tourisme et Attractivité Territoriale",
      en: "Tourism and Territorial Attractiveness Forum",
      es: "Foro de Turismo y Atractivo Territorial",
    },
    date: "10-12 Avril 2025",
    location: "Dakar, Sénégal",
    category: "Tourisme",
    participants: "300+ participants",
    format: "Hybride",
  },
  {
    title: {
      fr: "Conférence sur l'Internationalisation des PME",
      en: "SME Internationalization Conference",
      es: "Conferencia sobre Internacionalización de PYMES",
    },
    date: "25-26 Mai 2025",
    location: "Genève, Suisse",
    category: "Entrepreneuriat",
    participants: "200+ dirigeants",
    format: "Présentiel",
  },
  {
    title: {
      fr: "Séminaire Gouvernance Éthique et Anti-corruption",
      en: "Ethical Governance and Anti-Corruption Seminar",
      es: "Seminario de Gobernanza Ética y Anticorrupción",
    },
    date: "15 Juin 2025",
    location: "En ligne",
    category: "Éthique",
    participants: "Illimité",
    format: "Virtuel",
  },
  {
    title: {
      fr: "Forum de l'Innovation et Transformation Numérique",
      en: "Innovation and Digital Transformation Forum",
      es: "Foro de Innovación y Transformación Digital",
    },
    date: "5-7 Juillet 2025",
    location: "Oxford, UK",
    category: "Innovation",
    participants: "400+ professionnels",
    format: "Présentiel",
  },
]

export default function EventsPage() {
  const [locale] = useState<Locale>("fr")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#153D63] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="h-16 w-16 text-[#C9A44A] mx-auto mb-6" />
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

      {/* Event Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr" ? "Types d'Événements" : locale === "es" ? "Tipos de Eventos" : "Event Types"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <CardContent className="p-8">
                  <type.icon className="h-12 w-12 text-[#C9A44A] mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-3">
                    {locale === "fr" ? type.titleFr : locale === "es" ? type.titleEs : type.titleEn}
                  </h3>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    {locale === "fr" ? type.descFr : locale === "es" ? type.descEs : type.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-[#C9A44A] text-[#0A2A43]">{event.category}</Badge>
                    <Badge variant="outline" className="border-[#153D63] text-[#153D63]">
                      {event.format}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-4 text-balance">
                    {locale === "fr" ? event.title.fr : locale === "es" ? event.title.es : event.title.en}
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
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Users className="h-4 w-4 text-[#C9A44A]" />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                  <Link href="/inscription">
                  <Button className="w-full bg-[#153D63] hover:bg-[#0A2A43]">
                    {locale === "fr" ? "S'Inscrire" : locale === "es" ? "Registrarse" : "Register"}
                  </Button>
                  </Link>
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
          <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold">
            {locale === "fr" ? "Nous Contacter" : locale === "es" ? "Contáctenos" : "Contact Us"}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
