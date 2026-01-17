"use client"

import { useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"
import { LanguageContext } from "@/components/language-provider"
import { getTranslation, type Locale } from "@/lib/i18n"

export function RecruitmentForm() {
    const context = useContext(LanguageContext)
    const locale = (context?.locale as Locale) || "fr"
    const t = getTranslation(locale)

    const [loading, setLoading] = useState(false)

    // File states (base64 strings)
    const [cvFile, setCvFile] = useState<string | null>(null)
    const [coverLetterFile, setCoverLetterFile] = useState<string | null>(null)
    const [diplomaFile, setDiplomaFile] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (s: string) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(t.forms.fileTooLarge)
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            role: formData.get("role"),
            cvUrl: cvFile,
            coverLetterUrl: coverLetterFile,
            diplomaUrl: diplomaFile,
        }

        if (!cvFile) {
            toast.error(t.forms.cv + " " + t.forms.required)
            setLoading(false)
            return
        }

        try {
            const res = await fetch("/api/forms/recruitment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Erreur lors de l'envoi")

            toast.success(t.forms.success)
                ; (e.target as HTMLFormElement).reset()
            setCvFile(null)
            setCoverLetterFile(null)
            setDiplomaFile(null)
        } catch (error) {
            console.error(error)
            toast.error(t.forms.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">{t.forms.firstName}</Label>
                    <Input id="firstName" name="firstName" required placeholder={t.forms.firstName} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">{t.forms.lastName}</Label>
                    <Input id="lastName" name="lastName" required placeholder={t.forms.lastName} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email">{t.forms.email}</Label>
                    <Input id="email" name="email" type="email" required placeholder="votre@email.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">{t.forms.phone}</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+33 6..." />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">{t.forms.role}</Label>
                <Select name="role" required>
                    <SelectTrigger>
                        <SelectValue placeholder={t.forms.selectRole} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="collaborateur">{locale === 'fr' ? 'Collaborateur' : locale === 'es' ? 'Colaborador' : 'Collaborator'}</SelectItem>
                        <SelectItem value="formateur">{locale === 'fr' ? 'Formateur' : locale === 'es' ? 'Formador' : 'Trainer'}</SelectItem>
                        <SelectItem value="concepteur">{locale === 'fr' ? 'Concepteur Pédagogique' : locale === 'es' ? 'Diseñador instruccional' : 'Instructional Designer'}</SelectItem>
                        <SelectItem value="digital_manager">{locale === 'fr' ? 'Digital Learning Manager' : locale === 'es' ? 'Gerente de Aprendizaje Digital' : 'Digital Learning Manager'}</SelectItem>
                        <SelectItem value="freelance">{locale === 'fr' ? 'Partenaire Freelance' : locale === 'es' ? 'Socio Independiente' : 'Freelance Partner'}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="cv">{t.forms.cv}</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, setCvFile)}
                            className="cursor-pointer"
                        />
                    </div>
                    {cvFile && <span className="text-xs text-green-600">{locale === 'fr' ? 'Fichier chargé' : 'File loaded'}</span>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="coverLetter">{t.forms.coverLetter}</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="coverLetter"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, setCoverLetterFile)}
                            className="cursor-pointer"
                        />
                    </div>
                    {coverLetterFile && <span className="text-xs text-green-600">{locale === 'fr' ? 'Fichier chargé' : 'File loaded'}</span>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="diploma">{t.forms.diploma}</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="diploma"
                            type="file"
                            accept=".pdf,.jpg,.png"
                            onChange={(e) => handleFileChange(e, setDiplomaFile)}
                            className="cursor-pointer"
                        />
                    </div>
                    {diplomaFile && <span className="text-xs text-green-600">{locale === 'fr' ? 'Fichier chargé' : 'File loaded'}</span>}
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-[#C9A44A] text-[#0A2A43] hover:bg-[#b08f3a] font-semibold"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.cta.sending}
                    </>
                ) : (
                    t.cta.apply
                )}
            </Button>
        </form>
    )
}
