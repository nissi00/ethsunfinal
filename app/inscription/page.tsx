import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import InscriptionForm from "./InscriptionForm"

export default function InscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center bg-theme-bg py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A44A]"></div>
        </div>
      }>
        <InscriptionForm />
      </Suspense>
      <Footer />
    </div>
  )
}
