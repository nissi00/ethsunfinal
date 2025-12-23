"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

interface Testimonial {
    id: string
    textFr: string
    textEn?: string
    textEs?: string
    author: string
    role?: string
    rating: number
}

interface TestimonialsDisplayProps {
    locale?: "fr" | "en" | "es"
    maxItems?: number
}

export function TestimonialsDisplay({ locale = "fr", maxItems = 3 }: TestimonialsDisplayProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch("/api/site/testimonials", { cache: "no-store" })
                if (res.ok) {
                    const data = await res.json()
                    setTestimonials(data.slice(0, maxItems))
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [maxItems])

    function getText(testimonial: Testimonial) {
        switch (locale) {
            case "en":
                return testimonial.textEn || testimonial.textFr
            case "es":
                return testimonial.textEs || testimonial.textFr
            default:
                return testimonial.textFr
        }
    }

    // Valeurs par défaut si pas de témoignages en BDD
    const defaultTestimonials: Testimonial[] = [
        {
            id: "1",
            textFr: "Une formation exceptionnelle qui a transformé ma vision du leadership.",
            author: "Marie Dupont",
            role: "Directrice des Opérations",
            rating: 5,
        },
        {
            id: "2",
            textFr: "Les certifications ETHSUN sont reconnues et très appréciées dans notre secteur.",
            author: "Jean Martin",
            role: "PDG",
            rating: 5,
        },
        {
            id: "3",
            textFr: "Un accompagnement personnalisé et des formateurs de grande qualité.",
            author: "Sophie Bernard",
            role: "DRH",
            rating: 5,
        },
    ]

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-none animate-pulse">
                        <CardContent className="p-6">
                            <div className="h-24 bg-gray-200 rounded mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-none bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <Quote
                            className="h-8 w-8 mb-4 opacity-20"
                            style={{ color: "var(--color-accent, #C9A44A)" }}
                        />
                        <p
                            className="mb-4 text-sm leading-relaxed italic"
                            style={{ color: "var(--color-text, #4A4A4A)" }}
                        >
                            "{getText(testimonial)}"
                        </p>
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4"
                                    fill={i < testimonial.rating ? "var(--color-accent, #C9A44A)" : "transparent"}
                                    style={{ color: "var(--color-accent, #C9A44A)" }}
                                />
                            ))}
                        </div>
                        <p
                            className="font-semibold text-sm"
                            style={{ color: "var(--color-primary, #0A2A43)" }}
                        >
                            {testimonial.author}
                        </p>
                        {testimonial.role && (
                            <p
                                className="text-xs"
                                style={{ color: "var(--color-text, #4A4A4A)" }}
                            >
                                {testimonial.role}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
