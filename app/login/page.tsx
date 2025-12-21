"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ TEMPORAIRE (sera remplacé par BD + Auth)
    if (email === "admin@ethsun.com" && password === "admin123") {
      router.push("/admin");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F7] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0A2A43]">
            Connexion Admin
          </h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            Accès réservé à l’administration
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0A2A43] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A44A]" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#153D63]"
                placeholder="admin@ethsun.com"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-[#0A2A43] mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A44A]" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#153D63]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#0A2A43] text-white py-2 rounded-lg hover:bg-[#153D63] transition font-semibold"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
