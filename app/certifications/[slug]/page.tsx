"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Clock, Award, Globe, Users } from "lucide-react";
import certifications from "@/data/certificationsData";

export default function CertPage() {
  const params = useParams();

  // Trouver la certification correspondant au slug
  const cert = certifications.find(c => c.slug === params.slug);

  if (!cert) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header avec infos du certificat */}
      <header className="bg-theme-primary text-white p-6 text-center">
        <h1 className="text-3xl font-bold">{cert.title.fr}</h1>

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
          <p className="text-theme-text">{cert.description}</p>
        </section>

        {/* Objectifs */}
        {cert.objectifs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Objectifs</h2>
            <ul className="list-disc list-inside text-theme-text">
              {cert.objectifs.map((obj, i) => (
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
                <details key={i} className="border rounded-md p-4 bg-white">
                  <summary className="cursor-pointer font-semibold">{module.title}</summary>
                  <p className="mt-2 text-theme-text">{module.description}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Débouchés */}
        {cert.debouches.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Débouchés</h2>
            <ul className="list-disc list-inside text-theme-text">
              {cert.debouches.map((deb, i) => (
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
