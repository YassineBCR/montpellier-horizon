import { ProposalForm } from "@/components/proposal-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProposerPage() {
  return (
    <div className="min-h-screen pt-28 pb-12 px-4 bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-3xl mx-auto">
        {/* Bouton retour */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" /> Retour à l'accueil
        </Link>
        
        {/* En-tête de la page */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Déposez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Contribution</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Prenez le temps de détailler votre idée. Elle sera lue, analysée et ajoutée au plaidoyer final pour les municipales.
          </p>
        </div>

        {/* Le formulaire réutilisé */}
        <div className="transform transition-all hover:scale-[1.01] duration-500">
          <ProposalForm />
        </div>
      </div>
    </div>
  )
}