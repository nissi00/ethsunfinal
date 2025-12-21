"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Target, Heart, Award, Globe, Users, CheckCircle, MapPin, TrendingUp, Shield } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const values = [
  {
    icon: Award,
    titleFr: "Excellence Académique",
    titleEn: "Academic Excellence",
    titleEs: "Excelencia Académica",
    descFr: "Programmes conçus selon les standards des grandes institutions universitaires internationales",
    descEn: "Programs designed according to the standards of major international universities",
    descEs: "Programas diseñados según los estándares de las principales universidades internacionales",
  },
  {
    icon: Shield,
    titleFr: "Intégrité et Responsabilité",
    titleEn: "Integrity and Responsibility",
    titleEs: "Integridad y Responsabilidad",
    descFr: "L'éthique, la transparence et la conformité au cœur de notre gouvernance",
    descEn: "Ethics, transparency and compliance at the heart of our governance",
    descEs: "Ética, transparencia y cumplimiento en el corazón de nuestra gobernanza",
  },
  {
    icon: TrendingUp,
    titleFr: "Innovation Continue",
    titleEn: "Continuous Innovation",
    titleEs: "Innovación Continua",
    descFr: "Technologies éducatives avancées pour une expérience d'apprentissage optimale",
    descEn: "Advanced educational technologies for an optimal learning experience",
    descEs: "Tecnologías educativas avanzadas para una experiencia de aprendizaje óptima",
  },
  {
    icon: Globe,
    titleFr: "Impact Global",
    titleEn: "Global Impact",
    titleEs: "Impacto Global",
    descFr: "Renforcer les capacités des organisations et contribuer au développement des territoires",
    descEn: "Strengthen organizational capacities and contribute to territorial development",
    descEs: "Fortalecer las capacidades organizacionales y contribuir al desarrollo territorial",
  },
  {
    icon: Users,
    titleFr: "Ouverture Internationale",
    titleEn: "International Openness",
    titleEs: "Apertura Internacional",
    descFr: "Une identité cosmopolite et une pédagogie tournée vers le dialogue interculturel",
    descEn: "A cosmopolitan identity and pedagogy focused on intercultural dialogue",
    descEs: "Una identidad cosmopolita y pedagogía centrada en el diálogo intercultural",
  },
]

const governance = [
  {
    titleFr: "Conseil Académique International",
    titleEn: "International Academic Council",
    titleEs: "Consejo Académico Internacional",
    descFr: "Définit les orientations intellectuelles, pédagogiques et méthodologiques de l'institution",
    descEn: "Defines the intellectual, pedagogical and methodological orientations of the institution",
    descEs: "Define las orientaciones intelectuales, pedagógicas y metodológicas de la institución",
  },
  {
    titleFr: "Comité de Qualité et d'Évaluation",
    titleEn: "Quality and Evaluation Committee",
    titleEs: "Comité de Calidad y Evaluación",
    descFr: "Supervise les dispositifs d'enseignement et l'alignement sur les standards internationaux",
    descEn: "Oversees teaching systems and alignment with international standards",
    descEs: "Supervisa los sistemas de enseñanza y la alineación con los estándares internacionales",
  },
  {
    titleFr: "Direction de l'Innovation et du Digital Learning",
    titleEn: "Innovation and Digital Learning Directorate",
    titleEs: "Dirección de Innovación y Aprendizaje Digital",
    descFr: "Conçoit et pilote l'intégration des nouvelles technologies éducatives",
    descEn: "Designs and manages the integration of new educational technologies",
    descEs: "Diseña y gestiona la integración de nuevas tecnologías educativas",
  },
]

const locations = [
  {
    city: "Oxford",
    country: "Royaume-Uni",
    countryEn: "United Kingdom",
    countryEs: "Reino Unido",
    role: "Siège International",
    roleEn: "International Headquarters",
    roleEs: "Sede Internacional",
  },
  {
    city: "Abidjan",
    country: "Côte d'Ivoire",
    countryEn: "Côte d'Ivoire",
    countryEs: "Costa de Marfil",
    role: "Hub Afrique de l'Ouest",
    roleEn: "West Africa Hub",
    roleEs: "Hub África Occidental",
  },
  {
    city: "Genève",
    country: "Suisse",
    countryEn: "Switzerland",
    countryEs: "Suiza",
    role: "Plateforme Académique Européenne",
    roleEn: "European Academic Platform",
    roleEs: "Plataforma Académica Europea",
  },
  {
    city: "Singapour",
    country: "Singapour",
    countryEn: "Singapore",
    countryEs: "Singapur",
    role: "Centre d'Excellence Asie-Pacifique",
    roleEn: "Asia-Pacific Excellence Center",
    roleEs: "Centro de Excelencia Asia-Pacífico",
  },
]

const standards = [
  {
    name: "ISO 21001",
    descFr: "Management des organismes éducatifs",
    descEn: "Educational organizations management",
    descEs: "Gestión de organizaciones educativas",
  },
  {
    name: "ISO 29993",
    descFr: "Formation hors système formel",
    descEn: "Non-formal education and training",
    descEs: "Formación no formal",
  },
  {
    name: "ISO 37001",
    descFr: "Systèmes de management anti-corruption",
    descEn: "Anti-bribery management systems",
    descEs: "Sistemas de gestión antisoborno",
  },
  {
    name: "ISO 9001",
    descFr: "Alignement qualité totale",
    descEn: "Total quality alignment",
    descEs: "Alineación de calidad total",
  },
]

const partners = [
  "Universités Internationales",
  "Institutions Gouvernementales",
  "Organisations Internationales",
  "Entreprises Multinationales",
  "Cabinets de Conseil",
  "Fondations Académiques",
]

export default function AboutPage() {
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
                ? "ETHSUN Executive Education Oxford"
                : locale === "es"
                  ? "ETHSUN Executive Education Oxford"
                  : "ETHSUN Executive Education Oxford"}
            </h1>
            <p className="text-2xl font-serif text-[#C9A44A] mb-6">
              {locale === "fr"
                ? "Institution Internationale d'Éducation Executive"
                : locale === "es"
                  ? "Institución Internacional de Educación Ejecutiva"
                  : "International Executive Education Institution"}
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-8 text-center">
              {locale === "fr" ? "Notre Histoire" : locale === "es" ? "Nuestra Historia" : "Our History"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-12" />
            <div className="prose prose-lg max-w-none text-[#4A4A4A] leading-relaxed">
              <p className="mb-6">
                {locale === "fr"
                  ? "ETHSUN Executive Education Oxford trouve son origine dans une ambition claire : créer une institution capable d'allier la tradition académique d'Oxford à l'innovation pédagogique globale."
                  : locale === "es"
                    ? "ETHSUN Executive Education Oxford tiene su origen en una ambición clara: crear una institución capaz de combinar la tradición académica de Oxford con la innovación pedagógica global."
                    : "ETHSUN Executive Education Oxford originates from a clear ambition: to create an institution capable of combining Oxford's academic tradition with global pedagogical innovation."}
              </p>
              <p className="mb-6">
                {locale === "fr"
                  ? "Fondée pour répondre aux défis contemporains de la formation professionnelle, ETHSUN développe un modèle d'apprentissage exigeant, accessible, international et aligné sur les meilleures pratiques des grandes écoles et universités de renommée mondiale."
                  : locale === "es"
                    ? "Fundada para responder a los desafíos contemporáneos de la formación profesional, ETHSUN desarrolla un modelo de aprendizaje exigente, accesible, internacional y alineado con las mejores prácticas de las grandes escuelas y universidades de renombre mundial."
                    : "Founded to address the contemporary challenges of professional training, ETHSUN develops a demanding, accessible, international learning model aligned with the best practices of major world-renowned schools and universities."}
              </p>
              <p>
                {locale === "fr"
                  ? "Depuis ses débuts, l'institution s'est distinguée par sa capacité à concevoir des programmes certifiants, des dispositifs d'apprentissage digital et des académies d'entreprise répondant aux standards internationaux les plus élevés. Le développement du réseau ETHSUN à travers plusieurs continents illustre une vision résolument tournée vers l'excellence, l'impact et la transformation durable des organisations."
                  : locale === "es"
                    ? "Desde sus inicios, la institución se ha distinguido por su capacidad para diseñar programas de certificación, dispositivos de aprendizaje digital y academias corporativas que cumplen con los más altos estándares internacionales. El desarrollo de la red ETHSUN a través de varios continentes ilustra una visión resueltamente orientada hacia la excelencia, el impacto y la transformación sostenible de las organizaciones."
                    : "Since its inception, the institution has distinguished itself by its ability to design certification programs, digital learning devices and corporate academies meeting the highest international standards. The development of the ETHSUN network across several continents illustrates a vision resolutely focused on excellence, impact and sustainable transformation of organizations."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-none bg-white">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-[#C9A44A] mb-4" />
                <h3 className="text-2xl font-serif font-bold text-[#0A2A43] mb-4">
                  {locale === "fr" ? "Mission" : locale === "es" ? "Misión" : "Mission"}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {locale === "fr"
                    ? "Offrir des expériences de formation d'une qualité académique exceptionnelle, en combinant rigueur intellectuelle, innovation technologique et pertinence professionnelle, afin de renforcer les compétences stratégiques des dirigeants, cadres et institutions publiques."
                    : locale === "es"
                      ? "Ofrecer experiencias de formación de calidad académica excepcional, combinando rigor intelectual, innovación tecnológica y relevancia profesional, para fortalecer las competencias estratégicas de líderes, ejecutivos e instituciones públicas."
                      : "Offer training experiences of exceptional academic quality, combining intellectual rigor, technological innovation and professional relevance, in order to strengthen the strategic skills of leaders, executives and public institutions."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-white">
              <CardContent className="p-8">
                <Building2 className="h-12 w-12 text-[#C9A44A] mb-4" />
                <h3 className="text-2xl font-serif font-bold text-[#0A2A43] mb-4">
                  {locale === "fr" ? "Vision" : locale === "es" ? "Visión" : "Vision"}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {locale === "fr"
                    ? "Devenir l'un des pôles internationaux majeurs de l'éducation exécutive, en construisant un réseau global d'influence fondé sur la recherche appliquée, l'excellence pédagogique et la digitalisation avancée des savoirs."
                    : locale === "es"
                      ? "Convertirse en uno de los principales polos internacionales de educación ejecutiva, construyendo una red global de influencia basada en la investigación aplicada, la excelencia pedagógica y la digitalización avanzada del conocimiento."
                      : "Become one of the major international centers of executive education, building a global network of influence based on applied research, pedagogical excellence and advanced digitalization of knowledge."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-white">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-[#C9A44A] mb-4" />
                <h3 className="text-2xl font-serif font-bold text-[#0A2A43] mb-4">
                  {locale === "fr" ? "Valeurs" : locale === "es" ? "Valores" : "Values"}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {locale === "fr"
                    ? "Excellence académique, intégrité et responsabilité, innovation continue, impact global et ouverture internationale guident chacune de nos actions et décisions institutionnelles."
                    : locale === "es"
                      ? "Excelencia académica, integridad y responsabilidad, innovación continua, impacto global y apertura internacional guían todas nuestras acciones y decisiones institucionales."
                      : "Academic excellence, integrity and responsibility, continuous innovation, global impact and international openness guide all our institutional actions and decisions."}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 text-[#C9A44A] mb-4" />
                  <h4 className="text-lg font-serif font-semibold text-[#0A2A43] mb-2">
                    {locale === "fr" ? value.titleFr : locale === "es" ? value.titleEs : value.titleEn}
                  </h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {locale === "fr" ? value.descFr : locale === "es" ? value.descEs : value.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Gouvernance Académique"
                : locale === "es"
                  ? "Gobernanza Académica"
                  : "Academic Governance"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              {locale === "fr"
                ? "ETHSUN Executive Education Oxford est structurée selon une gouvernance académique inspirée des meilleures pratiques des universités internationales."
                : locale === "es"
                  ? "ETHSUN Executive Education Oxford está estructurada según una gobernanza académica inspirada en las mejores prácticas de las universidades internacionales."
                  : "ETHSUN Executive Education Oxford is structured according to academic governance inspired by the best practices of international universities."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governance.map((body, index) => (
              <Card key={index} className="border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <CheckCircle className="h-10 w-10 text-[#C9A44A] mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-3">
                    {locale === "fr" ? body.titleFr : locale === "es" ? body.titleEs : body.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {locale === "fr" ? body.descFr : locale === "es" ? body.descEs : body.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* International Presence */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Présence Internationale"
                : locale === "es"
                  ? "Presencia Internacional"
                  : "International Presence"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="border-none bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-10 w-10 text-[#C9A44A] mx-auto mb-3" />
                  <h3 className="text-xl font-serif font-bold text-[#0A2A43] mb-1">{location.city}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-3">
                    {locale === "fr" ? location.country : locale === "es" ? location.countryEs : location.countryEn}
                  </p>
                  <Badge className="bg-[#C9A44A] text-[#0A2A43]">
                    {locale === "fr" ? location.role : locale === "es" ? location.roleEs : location.roleEn}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Normes et Certifications ISO"
                : locale === "es"
                  ? "Normas y Certificaciones ISO"
                  : "ISO Standards and Certifications"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              {locale === "fr"
                ? "ETHSUN s'aligne sur les normes internationales relatives au management éducatif, à la qualité pédagogique et à l'éthique institutionnelle."
                : locale === "es"
                  ? "ETHSUN se alinea con los estándares internacionales relacionados con la gestión educativa, la calidad pedagógica y la ética institucional."
                  : "ETHSUN aligns with international standards relating to educational management, pedagogical quality and institutional ethics."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((standard, index) => (
              <Card key={index} className="border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <Award className="h-10 w-10 text-[#C9A44A] mx-auto mb-3" />
                  <h3 className="text-2xl font-serif font-bold text-[#0A2A43] mb-2">{standard.name}</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    {locale === "fr" ? standard.descFr : locale === "es" ? standard.descEs : standard.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr" ? "Nos Partenaires" : locale === "es" ? "Nuestros Socios" : "Our Partners"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-[#C9A44A] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#0A2A43]">{partner}</p>
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
