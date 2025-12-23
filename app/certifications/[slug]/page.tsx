"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Clock, Award, Globe, Users, Loader2 } from "lucide-react";

interface Module {
  id: string;
  titleFr: string;
  titleEn?: string;
  descriptionFr: string;
  descriptionEn?: string;
}

interface Certification {
  id: string;
  slug: string;
  titleFr: string;
  titleEn?: string;
  duration: string;
  level: string;
  price: string;
  startDate?: string;
  descriptionFr: string;
  descriptionEn?: string;
  objectifsFr: string;
  objectifsEn?: string;
  debouchesFr: string;
  debouchesEn?: string;
  modules: Module[];
  category?: {
    nameFr: string;
    nameEn?: string;
  };
}

export default function CertPage() {
  const params = useParams();
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCertification() {
      try {
        const res = await fetch(`/api/site/certifications?slug=${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setCert(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCertification();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-theme-accent" />
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
        </div>
        <Footer />
      </div>
    );
  }

  // Parse JSON arrays
  const objectifs = (() => {
    try {
      return JSON.parse(cert.objectifsFr || "[]");
    } catch {
      return [];
    }
  })();

  const debouches = (() => {
    try {
      return JSON.parse(cert.debouchesFr || "[]");
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header avec infos du certificat */}
      <header className="bg-theme-primary text-white p-6 text-center">
        <h1 className="text-3xl font-bold">{cert.titleFr}</h1>

        <div className="flex flex-wrap justify-center gap-6 mt-4 text-white text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{cert.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>{cert.level}</span>
          </div>
          {cert.startDate && (
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>{cert.startDate}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>{cert.price}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-theme-text">{cert.descriptionFr}</p>
        </section>

        {/* Objectifs */}
        {objectifs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Objectifs</h2>
            <ul className="list-disc list-inside text-theme-text">
              {objectifs.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Modules */}
        {cert.modules.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Modules</h2>
            <div className="space-y-2">
              {cert.modules.map((module, i) => (
                <details key={module.id || i} className="border rounded-md p-4 bg-white">
                  <summary className="cursor-pointer font-semibold">{module.titleFr}</summary>
                  <p className="mt-2 text-theme-text">{module.descriptionFr}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Débouchés */}
        {debouches.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Débouchés</h2>
            <ul className="list-disc list-inside text-theme-text">
              {debouches.map((deb: string, i: number) => (
                <li key={i}>{deb}</li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
