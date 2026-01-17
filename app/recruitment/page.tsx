"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RecruitmentForm } from "@/components/recruitment-form"
import { Briefcase, MapPin, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface JobOffer {
    id: string
    titleFr: string
    descriptionFr: string
    startDate?: string
    qualificationsFr?: string
    whyJoinUsFr?: string
    createdAt: string
}

export default function RecruitmentPage() {
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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-theme text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Briefcase className="h-16 w-16 text-[#C9A44A] mx-auto mb-6" />
                        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
                            Rejoignez l'Excellence
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Vous avez une compétence avérée et vous souhaitez nous rejoindre en qualité de collaborateur,
                            formateur, concepteur pédagogique, digital learning manager, ou partenaire freelance ?
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
                                <TabsTrigger value="spontaneous">Candidature Spontanée</TabsTrigger>
                                <TabsTrigger value="offers">Offres d'Emploi</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="spontaneous">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
                                        Faites-le nous savoir
                                    </h2>
                                    <div className="w-24 h-1 bg-[#C9A44A] mx-auto mb-8" />
                                    <p className="text-gray-600">
                                        Remplissez le formulaire ci-dessous et téléchargez vos documents (CV, Lettre de motivation, Diplôme).
                                    </p>
                                </div>
                                <RecruitmentForm />
                            </div>
                        </TabsContent>

                        <TabsContent value="offers">
                            <div className="space-y-6">
                                {loading ? (
                                    <p className="text-center text-gray-500 py-12">Chargement des offres...</p>
                                ) : jobs.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900">Aucune offre pour le moment</h3>
                                        <p className="text-gray-500">N'hésitez pas à nous envoyer une candidature spontanée !</p>
                                    </div>
                                ) : (
                                    jobs.map((job) => (
                                        <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#C9A44A]">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-xl font-bold text-[#0A2A43] mb-2">{job.titleFr}</CardTitle>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            {job.startDate && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    Début: {job.startDate}
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
                                                <p className="text-gray-600 mb-4 line-clamp-2">{job.descriptionFr}</p>
                                                <div className="flex justify-end">
                                                    <Button
                                                        className="bg-[#0A2A43] hover:bg-[#153D63]"
                                                        onClick={() => {
                                                            document.getElementById('spontaneous-trigger')?.click();
                                                            // Optional: Pre-fill specific job title context if we had a way to pass it to the form
                                                        }}
                                                    >
                                                        Postuler
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
