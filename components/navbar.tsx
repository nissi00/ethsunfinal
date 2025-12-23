"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Locale, getTranslation } from "@/lib/i18n"
import { useSiteSettings } from "@/components/site-settings-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>("fr")
  const t = getTranslation(locale)
  const settings = useSiteSettings()

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/certifications", label: t.nav.certifications },
    { href: "/events", label: t.nav.events },
    { href: "/corporate-academies", label: t.nav.corporateAcademies },
    { href: "/franchise", label: t.nav.franchise },
    { href: "/resources", label: t.nav.resources },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/inscription", label: "Inscription" },
  ]

  return (
    <>
      {/* Top bar */}
      <div
        className="text-white py-2"
        style={{ backgroundColor: "var(--color-primary, #0A2A43)" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-2 transition"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent, #C9A44A)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">{settings.contactEmail}</span>
            </a>
            <a
              href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent, #C9A44A)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">{settings.contactPhone}</span>
            </a>
          </div>
          <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className="shadow-lg sticky top-0 z-50"
        style={{ backgroundColor: "var(--color-secondary, #153D63)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">

            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/ethsun logo.png"
                alt="ETHSUN Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />

              <div className="flex flex-col leading-tight">
                <span className="text-xl font-serif font-bold text-white">
                  ETHSUN
                </span>
                <span
                  className="text-xs tracking-wide"
                  style={{ color: "var(--color-accent, #C9A44A)" }}
                >
                  Executive Education · Oxford
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 text-xs">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-xs font-medium transition rounded-md"
                  style={
                    item.href === "/inscription"
                      ? {
                        backgroundColor: "var(--color-accent, #C9A44A)",
                        color: "var(--color-primary, #0A2A43)"
                      }
                      : { color: "white" }
                  }
                  onMouseEnter={(e) => {
                    if (item.href !== "/inscription") {
                      e.currentTarget.style.color = "var(--color-accent, #C9A44A)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.href !== "/inscription") {
                      e.currentTarget.style.color = "white"
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}


              <Button
                className="ml-4 font-semibold"
                style={{
                  backgroundColor: "var(--color-accent, #C9A44A)",
                  color: "var(--color-primary, #0A2A43)"
                }}
              >
                {t.nav.learnerSpace}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-xs font-medium transition"
                  style={
                    item.href === "/inscription"
                      ? {
                        backgroundColor: "var(--color-accent, #C9A44A)",
                        color: "var(--color-primary, #0A2A43)",
                        borderRadius: "0.375rem",
                        padding: "0.75rem",
                        marginTop: "0.5rem"
                      }
                      : { color: "white" }
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                className="w-full mt-4 font-semibold"
                style={{
                  backgroundColor: "var(--color-accent, #C9A44A)",
                  color: "var(--color-primary, #0A2A43)"
                }}
              >
                {t.nav.learnerSpace}
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
