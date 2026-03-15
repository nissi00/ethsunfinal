"use client"

import { useState } from "react"
import Flag from "react-world-flags"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"
import { ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)

  const options = [
    { code: "fr", label: "FR", flag: "FR" },
    { code: "en", label: "EN", flag: "GB" },
    { code: "es", label: "ES", flag: "ES" },
  ]

  // Trouver l'option active pour l'affichage du bouton
  const activeOption = options.find((opt) => opt.code === locale) || options[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-black">
          <Flag code={activeOption.flag} className="w-5 h-auto rounded-sm" />
          <span>{activeOption.label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[120px]">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setLocale(opt.code as any)
              setOpen(false)
            }}
          >
            <Flag code={opt.flag} className="w-5 h-auto rounded-sm" />
            <span className={locale === opt.code ? "font-bold" : ""}>
              {opt.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}