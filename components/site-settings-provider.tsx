"use client"

import { useEffect, useState, createContext, useContext, ReactNode } from "react"

interface SiteSettings {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    textColor: string
    bgColor: string
    contactEmail: string
    contactPhone: string
    address: string
    facebookUrl: string
    twitterUrl: string
    linkedinUrl: string
    instagramUrl: string
    whatsappNumber: string
}

const defaultSettings: SiteSettings = {
    primaryColor: "#0A2A43",
    secondaryColor: "#153D63",
    accentColor: "#C9A44A",
    textColor: "#4A4A4A",
    bgColor: "#F5F6F7",
    contactEmail: "info@ethsun-oxford.uk",
    contactPhone: "+44 74 2420 1585",
    address: "Oxford, United Kingdom",
    facebookUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    whatsappNumber: "",
}

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings)

export function useSiteSettings() {
    return useContext(SiteSettingsContext)
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/site/settings", { cache: "no-store" })
                if (res.ok) {
                    const data = await res.json()
                    setSettings({
                        ...defaultSettings,
                        ...data,
                    })
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error)
            } finally {
                setMounted(true)
            }
        }

        fetchSettings()
    }, [])

    // Apply CSS variables for theme colors
    useEffect(() => {
        if (mounted) {
            const root = document.documentElement
            root.style.setProperty("--color-primary", settings.primaryColor)
            root.style.setProperty("--color-secondary", settings.secondaryColor)
            root.style.setProperty("--color-accent", settings.accentColor)
            root.style.setProperty("--color-text", settings.textColor)
            root.style.setProperty("--color-bg", settings.bgColor)
        }
    }, [settings, mounted])

    return (
        <SiteSettingsContext.Provider value={settings}>
            {children}
        </SiteSettingsContext.Provider>
    )
}
