"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Building2, Users, Globe, Award, BookOpen, Target } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"
import Link from "next/link"

export default function Home() {
  const [locale] = useState<Locale>("fr")
  const t = getTranslation(locale)

  const features = [
    {
      icon: BookOpen,
      title: t.home.certifications.title,
      description: t.home.certifications.desc,
      href: "/certifications",
    },
    {
      icon: Calendar,
      title: t.home.events.title,
      description: t.home.events.desc,
      href: "/events",
    },
    {
      icon: Building2,
      title: t.home.academies.title,
      description: t.home.academies.desc,
      href: "/corporate-academies",
    },
    {
      icon: Users,
      title: t.home.franchise.title,
      description: t.home.franchise.desc,
      href: "/franchise",
    },
    {
      icon: Globe,
      title: t.home.presence.title,
      description: t.home.presence.desc,
      href: "/about",
    },
  ]

  const stats = [
    { value: "36", label: locale === "fr" ? "Programmes Certifiants" : "Certified Programs" },
    { value: "5,000+", label: locale === "fr" ? "Apprenants Formés" : "Students Trained" },
    { value: "95%", label: locale === "fr" ? "Taux de Satisfaction" : "Satisfaction Rate" },
    { value: "12", label: locale === "fr" ? "Pays de Présence" : "Countries" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2A43] via-[#153D63] to-[#0A2A43] text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/oxford-university-architecture.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-[#C9A44A]/20 border border-[#C9A44A] rounded-full">
              <span className="text-[#C9A44A] font-semibold text-sm">Oxford, United Kingdom</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 text-balance leading-tight">
              {t.home.subtitle}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              {t.home.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/certifications" className="btn btn-outline-light btn-lg">
              <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg px-8">
                {t.cta.learnMore}
              </Button></Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
              >
                {t.cta.download}
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#0A2A43] mb-4 text-balance">
              {locale === "fr" ? "Nos Services" : locale === "es" ? "Nuestros Servicios" : "Our Services"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-white group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[#C9A44A]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#C9A44A] transition-colors">
                      <feature.icon className="h-8 w-8 text-[#C9A44A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-3 text-balance">
                      {feature.title}
                    </h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0A2A43] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-[#C9A44A] mb-2">{stat.value}</div>
                <div className="text-sm lg:text-base text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#0A2A43] mb-4 text-balance">
              {locale === "fr"
                ? "Nos Certificats Executives"
                : locale === "es"
                  ? "Nuestros Certificados Ejecutivos"
                  : "Our Executive Certificates"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto text-pretty leading-relaxed">
              {locale === "fr"
                ? "Des programmes de formation certifiants conçus pour développer des compétences stratégiques et opérationnelles."
                : locale === "es"
                  ? "Programas de formación certificados diseñados para desarrollar habilidades estratégicas y operativas."
                  : "Certification training programs designed to develop strategic and operational skills."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                slug:"leadership-strategique-et-gouvernance",
                title: locale === "fr" ? "Leadership Stratégique" : "Strategic Leadership",
                category: "Management",
                duration: "4 semaines",
              },
              {
                slug:"gouvernance-publique-administration",
                title: locale === "fr" ? "Gouvernance Publique" : "Public Governance",
                category: locale === "fr" ? "Gouvernance" : "Governance",
                duration: "6 semaines",
              },
              {
                slug: "ethique-professionnelle-deontologie",
                title: locale === "fr" ? "Éthique et Conformité" : "Ethics & Compliance",
                category: locale === "fr" ? "Éthique" : "Ethics",
                duration: "5 semaines",
              },
            ].map((cert, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none">
                <div className="h-48 bg-gradient-to-br from-[#153D63] to-[#0A2A43] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/professional-training-oxford.jpg')] bg-cover bg-center opacity-20" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C9A44A] text-[#0A2A43] px-3 py-1 rounded-full text-xs font-semibold">
                      {cert.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#0A2A43] mb-2 text-balance">{cert.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#4A4A4A] mb-4">
                    <Award className="h-4 w-4 text-[#C9A44A]" />
                    <span>{cert.duration}</span>
                  </div>
                  <Link href={`/certifications/${cert.slug}`}>
                  <Button className="w-full bg-[#153D63] hover:bg-[#0A2A43] text-white">{t.cta.learnMore}</Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/certifications" className="btn btn-outline-light btn-lg">
            <Button
              size="lg"
              variant="outline"
              className="border-[#C9A44A] text-[#0A2A43] hover:bg-[#C9A44A] hover:text-white bg-transparent"
            >
              {t.cta.viewAll}
            </Button></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#153D63] to-[#0A2A43] text-white">
        <div className="container mx-auto px-4 text-center">
          <Target className="h-16 w-16 text-[#C9A44A] mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-balance">
            {locale === "fr"
              ? "Prêt à Transformer Votre Organisation ?"
              : locale === "es"
                ? "¿Listo para Transformar su Organización?"
                : "Ready to Transform Your Organization?"}
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            {locale === "fr"
              ? "Rejoignez des milliers de professionnels qui ont choisi ETHSUN pour leur développement."
              : locale === "es"
                ? "Únase a miles de profesionales que han elegido ETHSUN para su desarrollo."
                : "Join thousands of professionals who have chosen ETHSUN for their development."}
          </p>
          <Link href="/contact" className="btn btn-outline-light btn-lg">
          <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg px-8">
            {t.cta.contact}
          </Button></Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
