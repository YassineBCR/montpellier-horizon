import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AnalysisSection } from "@/components/analysis-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { ProposalForm } from "@/components/proposal-form"
import { IdeasFeed } from "@/components/ideas-feed"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background selection:bg-primary/20 overflow-x-hidden">
      <SiteHeader />
      
      <main className="flex-1 relative">
        
        {/* HERO - Introduction Centrée */}
        <section className="relative pt-24 pb-32 flex flex-col items-center justify-center text-center overflow-hidden">
             {/* Fond subtil */}
             <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />
             
             <div className="container relative z-10 px-4 flex flex-col items-center">
                <HeroSection />
             </div>
        </section>

        {/* 1. PROPOSITION (En premier) - Centré */}
        <section id="propose" className="py-32 relative z-20 bg-white shadow-sm border-y border-gray-100">
          <div className="container px-4 mx-auto">
             <div className="text-center mb-16 max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 rounded-full mb-2">
                  À vous de jouer
                </Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                 Déposer  <span className="text-primary">une proposition</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Partagez votre idée en quelques étapes simples.
                </p>
             </div>
             
             <div className="max-w-4xl mx-auto flex justify-center animate-in fade-in zoom-in-95 duration-700 delay-200">
                <ProposalForm />
             </div>
          </div>
        </section>

        {/* 2. ACTUALITÉ (En second) - Centré */}
        <section id="ideas" className="py-32 bg-gray-50/50 relative z-10">
          <div className="container px-4 mx-auto">
             <div className="text-center mb-16 max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  L'actualité des propositions
                </h2>
                <p className="text-lg text-muted-foreground">
                    Découvrez les idées de la communauté et soutenez celles qui comptent pour vous
                </p>
            </div>
            
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <IdeasFeed limit={3} />
            </div>
          </div>
        </section>

        {/* 3. NOS PILIERS (Puis les piliers) - Centré */}
        <section id="manifesto" className="py-32 bg-white border-t border-gray-100 relative z-10">
             <div className="container px-4 mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <span className="text-primary font-bold tracking-wider uppercase text-xs">Notre ADN</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Notre manifeste
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Les valeurs qui guident cette démarche citoyenne.
                    </p>
                </div>
                <div className="mx-auto max-w-7xl">
                    <ManifestoSection />
                </div>
             </div>
        </section>

        {/* 4. STATS (Pour finir les stats) - Centré */}
        <section id="stats" className="py-32 bg-gradient-to-b from-gray-50 to-white relative z-10 border-t border-gray-100">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        La transparence en chiffres
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Suivez en temps réel la participation citoyenne.
                    </p>
                </div>
                {/* On enveloppe les stats dans un cadre centré */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 max-w-6xl mx-auto">
                    <AnalysisSection />
                </div>
            </div>
        </section>
        
      </main>
      <SiteFooter />
    </div>
  )
}