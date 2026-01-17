import type React from "react"
import type { Metadata } from "next"
import { Lato, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { SiteSettingsProvider } from "@/components/site-settings-provider"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "ETHSUN Executive Education Oxford | Formation, Certification et Transformation",
  description:
    "Institution internationale spécialisée dans la formation professionnelle, la conception de programmes certifiants en ligne et la création d'académies digitales pour les entreprises.",
  keywords: "formation professionnelle, certification en ligne, executive education, Oxford, académies d'entreprise",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${lato.variable} ${merriweather.variable}`}>
        <body className="font-sans antialiased">
          <SiteSettingsProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </SiteSettingsProvider>

          <Toaster richColors position="top-right" />
          <Analytics />
        </body>
    </html>
  )
}

