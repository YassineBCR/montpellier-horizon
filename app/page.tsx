import { ProposalForm } from "@/components/proposal-form"
import { IdeasFeed } from "@/components/ideas-feed"
import { StatsBanner } from "@/components/stats-banner"
import Link from "next/link" // <-- Import important
import { Users, Megaphone } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 text-center relative overflow-hidden">
        {/* Petit effet de fond décoratif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm font-semibold mb-8 border border-emerald-100 shadow-sm animate-pulse">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Consultation Citoyenne Active
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
          Montpellier <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Horizon</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Votre voix compte. Construisons ensemble un plaidoyer structuré pour peser sur les décisions locales.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* CHANGEMENT ICI : Redirection vers la page dédiée */}
          <Link 
            href="/proposer" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-emerald-200 hover:-translate-y-1"
          >
            Je propose une idée
          </Link>
          
          <a 
            href="#les-idees" 
            className="bg-white text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 transition-all hover:border-emerald-200"
          >
            Voir les tendances
          </a>
        </div>
      </section>

      <StatsBanner />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 mt-20">
        
        {/* Colonne Gauche : Formulaire (Toujours présent pour l'accès rapide) */}
        <div id="participer" className="relative">
          <div className="absolute -left-10 top-0 w-20 h-20 bg-emerald-100 rounded-full blur-2xl -z-10"></div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Megaphone className="text-emerald-600" size={32} /> 
            Exprimez-vous ici
          </h2>
          <p className="text-gray-500 mb-8">Vous pouvez aussi utiliser ce formulaire rapide sans changer de page.</p>
          
          {/* Le même composant est réutilisé ici ! */}
          <ProposalForm />
        </div>

        {/* Colonne Droite : Flux d'idées */}
        <div id="les-idees">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="text-emerald-600" size={32} /> 
            Tendances actuelles
          </h2>
          <IdeasFeed />
        </div>
      </div>
    </main>
  )
}