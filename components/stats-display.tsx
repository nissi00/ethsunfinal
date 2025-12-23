"use client"

import { useEffect, useState } from "react"

interface Stat {
    id: string
    value: string
    labelFr: string
    labelEn: string
    labelEs: string
}

interface StatsDisplayProps {
    locale?: "fr" | "en" | "es"
}

export function StatsDisplay({ locale = "fr" }: StatsDisplayProps) {
    const [stats, setStats] = useState<Stat[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/site/stats", { cache: "no-store" })
                if (res.ok) {
                    const data = await res.json()
                    setStats(data)
                }
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    function getLabel(stat: Stat) {
        switch (locale) {
            case "en":
                return stat.labelEn || stat.labelFr
            case "es":
                return stat.labelEs || stat.labelFr
            default:
                return stat.labelFr
        }
    }

    // Si pas de stats de la BDD, afficher les valeurs par défaut
    const defaultStats = [
        { id: "1", value: "36", labelFr: "Programmes Certifiants", labelEn: "Certified Programs", labelEs: "Programas Certificados" },
        { id: "2", value: "5,000+", labelFr: "Apprenants Formés", labelEn: "Students Trained", labelEs: "Estudiantes Formados" },
        { id: "3", value: "95%", labelFr: "Taux de Satisfaction", labelEn: "Satisfaction Rate", labelEs: "Tasa de Satisfacción" },
        { id: "4", value: "12", labelFr: "Pays de Présence", labelEn: "Countries", labelEs: "Países" },
    ]

    const displayStats = stats.length > 0 ? stats : defaultStats

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center animate-pulse">
                        <div className="h-12 bg-white/10 rounded mx-auto w-20 mb-2" />
                        <div className="h-4 bg-white/10 rounded mx-auto w-32" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat) => (
                <div key={stat.id} className="text-center">
                    <div
                        className="text-4xl lg:text-5xl font-serif font-bold mb-2"
                        style={{ color: "var(--color-accent, #C9A44A)" }}
                    >
                        {stat.value}
                    </div>
                    <div className="text-sm lg:text-base text-gray-300">{getLabel(stat)}</div>
                </div>
            ))}
        </div>
    )
}
