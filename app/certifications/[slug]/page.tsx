"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Clock, Award, Globe, Users, Loader2, BookOpen, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Module {
  id: string;
  titleFr: string;
  descriptionFr: string;
}

interface Certification {
  id: string;
  titleFr: string;
  descriptionFr: string;
  duration: string;
  level: string;
  price: string;
  startDate?: string;
  objectifsFr: string; // JSON string
  debouchesFr: string; // JSON string
  modules: Module[];
}

export default function CertPage() {
  const params = useParams();
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCert() {
      try {
        const res = await fetch(`/api/site/certifications/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setCert(data);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) {
      fetchCert();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A44A]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600 text-xl">Certification introuvable</p>
          <Link href="/certifications">
            <Button variant="link" className="mt-4">Retour au catalogue</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse JSON strings safely
  const objectifs = JSON.parse(cert.objectifsFr || "[]");
  const debouches = JSON.parse(cert.debouchesFr || "[]");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header avec infos du certificat */}
      <header className="bg-[#0A2A43] text-white py-12 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-6 text-balance">{cert.titleFr}</h1>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5 text-[#C9A44A]" />
              <span>{cert.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Award className="w-5 h-5 text-[#C9A44A]" />
              <span>{cert.level}</span>
            </div>
            {cert.startDate && (
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="w-5 h-5 text-[#C9A44A]" />
                <span>{cert.startDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="w-5 h-5 text-[#C9A44A]" />
              <span>{cert.price}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/inscription">
              <Button size="lg" className="bg-[#C9A44A] hover:bg-[#b08f3a] text-[#0A2A43] font-bold">
                S'inscrire maintenant
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 flex-grow bg-[#F5F6F7]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-[#0A2A43] mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#C9A44A]" />
                Description
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed whitespace-pre-wrap">{cert.descriptionFr}</p>
            </section>

            {/* Objectifs */}
            {objectifs.length > 0 && (
              <section className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-[#0A2A43] mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-[#C9A44A]" />
                  Objectifs
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {objectifs.map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[#4A4A4A]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A44A] mt-2 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Modules */}
            {cert.modules.length > 0 && (
              <section className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-[#0A2A43] mb-6">Programme Detaillé</h2>
                <div className="space-y-4">
                  {cert.modules.map((module, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg p-5 hover:border-[#C9A44A] transition-colors bg-[#FAFAFA]">
                      <h3 className="font-semibold text-lg text-[#0A2A43] mb-2">Module {i + 1}: {module.titleFr}</h3>
                      <p className="text-[#4A4A4A] text-sm leading-relaxed">{module.descriptionFr}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Débouchés */}
            {debouches.length > 0 && (
              <div className="bg-[#0A2A43] text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-serif font-bold mb-4 text-[#C9A44A]">Débouchés</h2>
                <ul className="space-y-3">
                  {debouches.map((deb: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <CheckCircle className="h-4 w-4 text-[#C9A44A] mt-1 flex-shrink-0" />
                      <span>{deb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0A2A43] mb-4">Besoin d'aide ?</h3>
              <p className="text-sm text-[#4A4A4A] mb-4">
                Contactez nos conseillers pour plus d'informations sur cette certification.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-[#0A2A43] text-[#0A2A43] hover:bg-[#0A2A43] hover:text-white">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
