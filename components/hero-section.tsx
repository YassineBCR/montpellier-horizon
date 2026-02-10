import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-primary bg-primary/5 mb-4 hover:bg-primary/10 transition-colors">
        <Sparkles className="mr-2 h-4 w-4" />
        Une nouvelle ère pour Montpellier
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
        Réinventons la ville,<br /> 
        <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-600">quartier par quartier.</span>
      </h1>
      
      <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
        Loin des promesses électorales, construisons ensemble un avenir concret. 
        Votre voix est le point de départ du changement.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Button asChild size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105">
          <Link href="/#propose">
            Proposer une idée <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-2 hover:bg-gray-50 transition-all hover:scale-105">
          <Link href="/#manifesto">
            Lire le manifeste
          </Link>
        </Button>
      </div>
    </div>
  )
}