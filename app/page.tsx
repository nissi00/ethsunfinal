"use client"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatsDisplay } from "@/components/stats-display"

import { Calendar, Building2, Users, Globe, Award, BookOpen, Target } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"
import Link from "next/link"
import { LanguageContext } from "@/components/language-provider"

export default function Home() {
  const context = useContext(LanguageContext)
  const locale = (context?.locale as Locale) || "fr"
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Using CSS variables */}
      <section
        className="relative text-white pt-24 lg:pt-32 pb-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-primary, #0A2A43), var(--color-secondary, #153D63), var(--color-primary, #0A2A43))`
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 top-0 left-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-block mb-6 px-6 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(201, 164, 74, 0.2)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "var(--color-accent, #C9A44A)"
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: "var(--color-accent, #C9A44A)" }}
              >
                {t.home.oxford}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 text-balance leading-tight">
              {t.home.subtitle}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              {t.home.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/certifications">
                <Button
                  size="lg"
                  className="font-semibold text-lg px-8"
                  style={{
                    backgroundColor: "var(--color-accent, #C9A44A)",
                    color: "var(--color-primary, #0A2A43)"
                  }}
                >
                  {t.cta.learnMore}
                </Button>
              </Link>
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

      {/* Features Grid - Using CSS variables */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-bg, #F5F6F7)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-5xl font-serif font-bold mb-4 text-balance"
              style={{ color: "var(--color-primary, #0A2A43)" }}
            >
              {t.home.offers}
            </h2>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: "var(--color-accent, #C9A44A)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-white group">
                  <CardContent className="p-8">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors"
                      style={{ backgroundColor: "rgba(201, 164, 74, 0.1)" }}
                    >
                      <feature.icon
                        className="h-8 w-8 transition-colors"
                        style={{ color: "var(--color-accent, #C9A44A)" }}
                      />
                    </div>
                    <h3
                      className="text-xl font-serif font-semibold mb-3 text-balance"
                      style={{ color: "var(--color-primary, #0A2A43)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text, #4A4A4A)" }}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Already using CSS variables */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary, #0A2A43)" }}
      >
        <div className="container mx-auto px-4">
          <StatsDisplay locale={locale} />
        </div>
      </section>

      {/* Certifications Preview - Using CSS variables */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-5xl font-serif font-bold mb-4 text-balance"
              style={{ color: "var(--color-primary, #0A2A43)" }}
            >
              {t.home.certificatesTitle}
            </h2>
            <div
              className="w-24 h-1 mx-auto mb-6"
              style={{ backgroundColor: "var(--color-accent, #C9A44A)" }}
            />
            <p
              className="max-w-2xl mx-auto text-pretty leading-relaxed"
              style={{ color: "var(--color-text, #4A4A4A)" }}
            >
              {t.home.certificatesDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                slug: "leadership-strategique-et-gouvernance",
                title: t.home.leadership,
                category: t.home.management,
                duration: t.home.fourWeeks,
              },
              {
                slug: "gouvernance-publique-administration",
                title: t.home.governance,
                category: t.home.governanceCategory,
                duration: t.home.sixWeeks,
              },
              {
                slug: "ethique-professionnelle-deontologie",
                title: t.home.ethics,
                category: t.home.ethicsCategory,
                duration: t.home.fiveWeeks,
              },
            ].map((cert, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-none overflow-hidden">
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--color-secondary, #153D63), var(--color-primary, #0A2A43))`
                  }}
                >
                  <div className="absolute inset-0 bg-[url('/professional-training-oxford.jpg')] bg-cover bg-center opacity-20" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--color-accent, #C9A44A)",
                        color: "var(--color-primary, #0A2A43)"
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-xl font-serif font-semibold mb-2 text-balance"
                    style={{ color: "var(--color-primary, #0A2A43)" }}
                  >
                    {cert.title}
                  </h3>
                  <div
                    className="flex items-center gap-2 text-sm mb-4"
                    style={{ color: "var(--color-text, #4A4A4A)" }}
                  >
                    <Award
                      className="h-4 w-4"
                      style={{ color: "var(--color-accent, #C9A44A)" }}
                    />
                    <span>{cert.duration}</span>
                  </div>
                  <Link href={`/certifications/${cert.slug}`}>
                    <Button
                      className="w-full text-white"
                      style={{ backgroundColor: "var(--color-secondary, #153D63)" }}
                    >
                      {t.cta.learnmore1}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/certifications">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                style={{
                  borderColor: "var(--color-accent, #C9A44A)",
                  color: "var(--color-primary, #0A2A43)"
                }}
              >
                {t.cta.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* CTA Section - Using CSS variables */}
      <section
        className="py-20 text-white"
        style={{
          background: `linear-gradient(to right, var(--color-secondary, #153D63), var(--color-primary, #0A2A43))`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <Target
            className="h-16 w-16 mx-auto mb-6"
            style={{ color: "var(--color-accent, #C9A44A)" }}
          />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6 text-balance">
            {t.home.cta}
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="font-semibold text-lg px-8"
              style={{
                backgroundColor: "var(--color-accent, #C9A44A)",
                color: "var(--color-primary, #0A2A43)"
              }}
            >
              {t.cta.contact}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
