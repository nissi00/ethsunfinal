"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RecruitmentForm } from "@/components/recruitment-form"
import { Briefcase, MapPin, Clock, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { LanguageContext } from "@/components/language-provider"
import { getTranslation, type Locale } from "@/lib/i18n"

interface JobOffer {
    id: string
    titleFr: string
    titleEn?: string
    titleEs?: string
    descriptionFr: string
    descriptionEn?: string
    descriptionEs?: string
    startDate?: string
    qualificationsFr?: string
    whyJoinUsFr?: string
    createdAt: string
}

export default function RecruitmentPage() {
    const context = useContext(LanguageContext)
    const locale = (context?.locale as Locale) || "fr"
    const t = getTranslation(locale)

    const [jobs, setJobs] = useState<JobOffer[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("/api/site/jobs")
                if (res.ok) {
                    const data = await res.json()
                    setJobs(data)
                }
            } catch (error) {
                console.error("Failed to fetch jobs")
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    function getJobTitle(job: JobOffer) {
        if (locale === "en") return job.titleEn || job.titleFr
        if (locale === "es") return job.titleEs || job.titleFr
        return job.titleFr
    }

    function getJobDesc(job: JobOffer) {
        if (locale === "en") return job.descriptionEn || job.descriptionFr
        if (locale === "es") return job.descriptionEs || job.descriptionFr
        return job.descriptionFr
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-theme text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Briefcase className="h-16 w-16 text-[#C9A44A] mx-auto mb-6" />
                        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
                            {t.recruitment.title}
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            {t.recruitment.intro}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-[#F5F6F7]">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="spontaneous" className="max-w-4xl mx-auto">
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid w-full max-w-md grid-cols-2">
                                <TabsTrigger value="spontaneous">{t.recruitment.spontaneous}</TabsTrigger>
                                <TabsTrigger value="offers">{t.recruitment.offers}</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="spontaneous" id="spontaneous-content">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
                                        {t.recruitment.contactUs}
                                    </h2>
                                    <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-8" />
                                    <p className="text-gray-600">
                                        {t.recruitment.formDesc}
                                    </p>
                                </div>
                                <RecruitmentForm />
                            </div>
                        </TabsContent>

                        <TabsContent value="offers">
                            <div className="space-y-6">
                                {loading ? (
                                    <p className="text-center text-gray-500 py-12">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                        {locale === 'fr' ? 'Chargement...' : 'Loading...'}
                                    </p>
                                ) : jobs.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900">{t.recruitment.noOffers}</h3>
                                        <p className="text-gray-500">{t.recruitment.noOffersDesc}</p>
                                    </div>
                                ) : (
                                    jobs.map((job) => (
                                        <Card key={job.id} className="hover:shadow-md transition-shadow border-l-4 border-l-[#C9A44A]">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-xl font-bold text-[#0A2A43] mb-2">{getJobTitle(job)}</CardTitle>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            {job.startDate && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    {locale === 'fr' ? 'Début' : 'Start'}: {job.startDate}
                                                                </span>
                                                            )}
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                Abidjan, Côte d'Ivoire
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="border-[#0A2A43] text-[#0A2A43]">CDI / Freelance</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{getJobDesc(job)}</p>
                                                <div className="flex justify-end">
                                                    <Button
                                                        className="bg-[#0A2A43] hover:bg-[#153D63]"
                                                        onClick={() => {
                                                            const trigger = document.querySelector('[data-value="spontaneous"]') as HTMLElement;
                                                            trigger?.click();
                                                        }}
                                                    >
                                                        {t.recruitment.apply}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <Footer />
        </div>
    )
}
