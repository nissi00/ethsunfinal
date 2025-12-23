"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Mail,
    titleFr: "Email",
    titleEn: "Email",
    titleEs: "Email",
    content: "info@ethsun-oxford.uk",
    link: "mailto:info@ethsun-oxford.uk",
  },
  {
    icon: Phone,
    titleFr: "Téléphone",
    titleEn: "Phone",
    titleEs: "Teléfono",
    content: "+44 74 2420 1585",
    link: "tel:+447424201585",
  },
  {
    icon: MapPin,
    titleFr: "Adresse du Siège",
    titleEn: "Headquarters Address",
    titleEs: "Dirección de la Sede",
    content: "Oxford, United Kingdom",
    link: null,
  },
  {
    icon: Clock,
    titleFr: "Horaires",
    titleEn: "Business Hours",
    titleEs: "Horario",
    content: "Lun-Ven: 9h00 - 18h00 GMT",
    contentEn: "Mon-Fri: 9:00 AM - 6:00 PM GMT",
    contentEs: "Lun-Vie: 9:00 - 18:00 GMT",
    link: null,
  },
]

const franchiseLocations = [
  {
    city: "Abidjan",
    country: "Côte d'Ivoire",
    email: "abidjan@ethsun-education.com",
    phone: "+225 XX XX XX XX",
  },
  {
    city: "Dakar",
    country: "Sénégal",
    email: "dakar@ethsun-education.com",
    phone: "+221 XX XX XX XX",
  },
  {
    city: "Genève",
    country: "Suisse",
    email: "geneve@ethsun-education.com",
    phone: "+41 XX XXX XX XX",
  },
  {
    city: "Singapour",
    country: "Singapore",
    email: "singapore@ethsun-education.com",
    phone: "+65 XXXX XXXX",
  },
]

export default function ContactPage() {
  const [locale] = useState<Locale>("fr")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          subject: "",
          message: "",
        })
        toast.success(
          locale === "fr"
            ? "Message envoyé avec succès !"
            : locale === "es"
              ? "¡Mensaje enviado con éxito!"
              : "Message sent successfully!"
        )
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error(
        locale === "fr"
          ? "Erreur lors de l'envoi. Veuillez réessayer."
          : locale === "es"
            ? "Error al enviar. Por favor, inténtelo de nuevo."
            : "Error sending message. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field: string, value: string) {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-theme text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MessageSquare className="h-16 w-16 text-theme-accent mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              {locale === "fr"
                ? "Contacter ETHSUN Executive Education Oxford"
                : locale === "es"
                  ? "Contactar ETHSUN Executive Education Oxford"
                  : "Contact ETHSUN Executive Education Oxford"}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              {locale === "fr"
                ? "Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos programmes, services et opportunités de partenariat."
                : locale === "es"
                  ? "Nuestro equipo está a su disposición para responder todas sus preguntas sobre nuestros programas, servicios y oportunidades de asociación."
                  : "Our team is at your disposal to answer all your questions about our programs, services and partnership opportunities."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-lg bg-[var(--color-accent,#C9A44A)]/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-7 w-7 text-theme-accent" />
                  </div>
                  <h3 className="font-serif font-semibold text-theme-primary mb-2">
                    {locale === "fr" ? info.titleFr : locale === "es" ? info.titleEs : info.titleEn}
                  </h3>
                  {info.link ? (
                    <a href={info.link} className="text-sm text-theme-text hover:text-theme-accent transition">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-sm text-theme-text">
                      {locale === "fr"
                        ? info.content
                        : locale === "es"
                          ? info.contentEs || info.content
                          : info.contentEn || info.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-theme-primary mb-4">
                {locale === "fr"
                  ? "Envoyez-nous un Message"
                  : locale === "es"
                    ? "Envíenos un Mensaje"
                    : "Send us a Message"}
              </h2>
              <div className="w-24 h-1 bg-theme-accent mx-auto mb-6" />
              <p className="text-theme-text">
                {locale === "fr"
                  ? "Complétez ce formulaire et nous vous répondrons dans les plus brefs délais."
                  : locale === "es"
                    ? "Complete este formulario y le responderemos lo antes posible."
                    : "Complete this form and we will respond to you as soon as possible."}
              </p>
            </div>

            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-theme-primary mb-2">
                      {locale === "fr"
                        ? "Message envoyé !"
                        : locale === "es"
                          ? "¡Mensaje enviado!"
                          : "Message sent!"}
                    </h3>
                    <p className="text-theme-text mb-6">
                      {locale === "fr"
                        ? "Nous vous répondrons dans les plus brefs délais."
                        : locale === "es"
                          ? "Le responderemos lo antes posible."
                          : "We will respond to you as soon as possible."}
                    </p>
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="outline"
                    >
                      {locale === "fr"
                        ? "Envoyer un autre message"
                        : locale === "es"
                          ? "Enviar otro mensaje"
                          : "Send another message"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          {locale === "fr" ? "Prénom *" : locale === "es" ? "Nombre *" : "First Name *"}
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {locale === "fr" ? "Nom *" : locale === "es" ? "Apellido *" : "Last Name *"}
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {locale === "fr" ? "Téléphone" : locale === "es" ? "Teléfono" : "Phone"}
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">
                        {locale === "fr"
                          ? "Organisation / Entreprise"
                          : locale === "es"
                            ? "Organización / Empresa"
                            : "Organization / Company"}
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {locale === "fr" ? "Sujet de votre demande *" : locale === "es" ? "Asunto *" : "Subject *"}
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => handleChange("subject", value)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              locale === "fr"
                                ? "Sélectionnez un sujet"
                                : locale === "es"
                                  ? "Seleccione un asunto"
                                  : "Select a subject"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="certificates">
                            {locale === "fr"
                              ? "Programmes Certifiants"
                              : locale === "es"
                                ? "Programas de Certificación"
                                : "Certification Programs"}
                          </SelectItem>
                          <SelectItem value="academy">
                            {locale === "fr"
                              ? "Académie d'Entreprise"
                              : locale === "es"
                                ? "Academia Corporativa"
                                : "Corporate Academy"}
                          </SelectItem>
                          <SelectItem value="franchise">
                            {locale === "fr" ? "Franchise" : locale === "es" ? "Franquicia" : "Franchise"}
                          </SelectItem>
                          <SelectItem value="events">
                            {locale === "fr" ? "Événements" : locale === "es" ? "Eventos" : "Events"}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {locale === "fr" ? "Partenariat" : locale === "es" ? "Asociación" : "Partnership"}
                          </SelectItem>
                          <SelectItem value="other">
                            {locale === "fr" ? "Autre" : locale === "es" ? "Otro" : "Other"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {locale === "fr" ? "Votre message *" : locale === "es" ? "Su mensaje *" : "Your message *"}
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-semibold text-lg py-6"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          {locale === "fr" ? "Envoi en cours..." : locale === "es" ? "Enviando..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          {locale === "fr" ? "Envoyer le Message" : locale === "es" ? "Enviar Mensaje" : "Send Message"}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-[#4A4A4A]">
                      {locale === "fr"
                        ? "* Champs obligatoires. Nous nous engageons à protéger vos données personnelles."
                        : locale === "es"
                          ? "* Campos obligatorios. Nos comprometemos a proteger sus datos personales."
                          : "* Required fields. We are committed to protecting your personal data."}
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Franchise Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2A43] mb-4">
              {locale === "fr"
                ? "Nos Franchises dans le Monde"
                : locale === "es"
                  ? "Nuestras Franquicias en el Mundo"
                  : "Our Franchises Worldwide"}
            </h2>
            <div className="w-24 h-1 bg-[#C9A44A] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {franchiseLocations.map((location, index) => (
              <Card key={index} className="border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <MapPin className="h-10 w-10 text-[#C9A44A] mb-4" />
                  <h3 className="text-xl font-serif font-bold text-[#0A2A43] mb-1">{location.city}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-4">{location.country}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#C9A44A]" />
                      <a href={`mailto:${location.email}`} className="text-[#4A4A4A] hover:text-[#C9A44A]">
                        {location.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#C9A44A]" />
                      <span className="text-[#4A4A4A]">{location.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
