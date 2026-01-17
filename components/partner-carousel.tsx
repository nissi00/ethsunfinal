"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  sortOrder: number;
  isActive: boolean;
}

export function PartnerCarousel() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/site/partners", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPartners(data);
      } catch (error) {
        console.error("Failed to load partners", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (partners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [partners.length]);

  if (loading || partners.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? partners.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white text-2xl font-bold mb-12">
          Nos partenaires
        </h2>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="relative w-full max-w-4xl h-24 flex items-center justify-center">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`absolute transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          {partners.map((partner, index) => (
            <button
              key={partner.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Voir ${partner.name}`}
              title={partner.name}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
