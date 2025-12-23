"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"
import { useSiteSettings } from "@/components/site-settings-provider"

export function Footer() {
  const [locale] = useState<Locale>("fr")
  const t = getTranslation(locale)
  const settings = useSiteSettings()

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "var(--color-primary, #0A2A43)" }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="text-2xl font-serif font-bold mb-4">ETHSUN</div>
            <p className="text-sm text-gray-300 mb-4">{t.footer.tagline}</p>
            <div className="flex gap-4">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent, #C9A44A)" }}
                  className="hover:text-white transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent, #C9A44A)" }}
                  className="hover:text-white transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent, #C9A44A)" }}
                  className="hover:text-white transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent, #C9A44A)" }}
                  className="hover:text-white transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {/* Fallback icons if no social URLs configured */}
              {!settings.facebookUrl && !settings.twitterUrl && !settings.linkedinUrl && !settings.instagramUrl && (
                <>
                  <span style={{ color: "var(--color-accent, #C9A44A)" }}><Facebook className="h-5 w-5" /></span>
                  <span style={{ color: "var(--color-accent, #C9A44A)" }}><Twitter className="h-5 w-5" /></span>
                  <span style={{ color: "var(--color-accent, #C9A44A)" }}><Linkedin className="h-5 w-5" /></span>
                  <span style={{ color: "var(--color-accent, #C9A44A)" }}><Instagram className="h-5 w-5" /></span>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-serif font-semibold mb-4"
              style={{ color: "var(--color-accent, #C9A44A)" }}
            >
              {t.footer.links}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/certifications" className="hover:opacity-75 transition">
                  {t.nav.certifications}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:opacity-75 transition">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link href="/corporate-academies" className="hover:opacity-75 transition">
                  {t.nav.corporateAcademies}
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:opacity-75 transition">
                  {t.nav.franchise}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-75 transition">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Dynamic from settings */}
          <div>
            <h3
              className="text-lg font-serif font-semibold mb-4"
              style={{ color: "var(--color-accent, #C9A44A)" }}
            >
              {t.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1" style={{ color: "var(--color-accent, #C9A44A)" }} />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:opacity-75 transition"
                >
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1" style={{ color: "var(--color-accent, #C9A44A)" }} />
                <a
                  href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
                  className="hover:opacity-75 transition"
                >
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" style={{ color: "var(--color-accent, #C9A44A)" }} />
                <span>{settings.address || t.footer.oxford}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-lg font-serif font-semibold mb-4"
              style={{ color: "var(--color-accent, #C9A44A)" }}
            >
              {t.footer.legal}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:opacity-75 transition">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-75 transition">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-gray-400"
          style={{ borderColor: "var(--color-secondary, #153D63)" }}
        >
          <p>
            © {new Date().getFullYear()} ETHSUN Executive Education Oxford. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
