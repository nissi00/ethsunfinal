"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { type Locale, getTranslation } from "@/lib/i18n"

export function Footer() {
  const [locale] = useState<Locale>("fr")
  const t = getTranslation(locale)

  return (
    <footer className="bg-[#0A2A43] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="text-2xl font-serif font-bold mb-4">ETHSUN</div>
            <p className="text-sm text-gray-300 mb-4">{t.footer.tagline}</p>
            <div className="flex gap-4">
              <a href="#" className="text-[#C9A44A] hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#C9A44A] hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#C9A44A] hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#C9A44A] hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[#C9A44A]">{t.footer.links}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/certifications" className="hover:text-[#C9A44A] transition">
                  {t.nav.certifications}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#C9A44A] transition">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link href="/corporate-academies" className="hover:text-[#C9A44A] transition">
                  {t.nav.corporateAcademies}
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-[#C9A44A] transition">
                  {t.nav.franchise}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C9A44A] transition">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[#C9A44A]">{t.footer.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-[#C9A44A]" />
                <a href="mailto:info@ethsun-oxford.uk" className="hover:text-[#C9A44A] transition">
                  info@ethsun-oxford.uk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-[#C9A44A]" />
                <a href="tel:+447424201585" className="hover:text-[#C9A44A] transition">
                  +44 74 2420 1585
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-[#C9A44A]" />
                <span>{t.footer.oxford}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[#C9A44A]">{t.footer.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-[#C9A44A] transition">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C9A44A] transition">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#153D63] mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} ETHSUN Executive Education Oxford. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
