"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InscriptionPage() {
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false)
      alert("Inscription envoyée avec succès !")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#153D63] py-20 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-serif font-bold mb-4">
            Formulaire d’Inscription
          </h1>
          <p className="text-gray-200">
            Rejoignez nos programmes certifiants internationaux et développez
            des compétences stratégiques reconnues.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-[#F5F6F7] flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Identité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Prénom</Label>
                    <Input required placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label>Nom</Label>
                    <Input required placeholder="Votre nom" />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" required placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>

                {/* Pays */}
                <div>
                  <Label>Pays de résidence</Label>
                  <Input placeholder="France, Maroc, Sénégal…" />
                </div>

                {/* Programme */}
                <div>
                  <Label>Programme souhaité</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un programme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="management">Management & Leadership</SelectItem>
                      <SelectItem value="ethics">Éthique & Conformité</SelectItem>
                      <SelectItem value="governance">Gouvernance Publique</SelectItem>
                      <SelectItem value="hr">Ressources Humaines</SelectItem>
                      <SelectItem value="digital">Transformation Numérique & IA</SelectItem>
                      <SelectItem value="realestate">Immobilier & Construction</SelectItem>
                      <SelectItem value="tourism">Tourisme & Hôtellerie</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneuriat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Profil */}
                <div>
                  <Label>Profil professionnel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Votre profil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Étudiant</SelectItem>
                      <SelectItem value="employee">Salarié</SelectItem>
                      <SelectItem value="manager">Manager / Cadre</SelectItem>
                      <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="public">Fonction publique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Motivation */}
                <div>
                  <Label>Message / Motivation</Label>
                  <textarea
                    className="w-full rounded-md border border-input p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A44A]"
                    rows={4}
                    placeholder="Expliquez brièvement votre motivation…"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6"
                >
                  {loading ? "Envoi en cours..." : "Soumettre mon inscription"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
