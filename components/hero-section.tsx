// components/hero-section.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
        
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50 backdrop-blur-sm mb-4">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          Concertation citoyenne 2024 active
        </div>

        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
          Construisons ensemble le <br className="hidden sm:inline" />
          <span className="text-primary">Montpellier de demain</span>
        </h1>
        
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
          Une plateforme transparente pour proposer, débattre et valider les projets qui transformeront nos quartiers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all" asChild>
            <Link href="#participer">
              Proposer une idée <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
            <Link href="#explorer">
              Voir les propositions
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Élément décoratif d'arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}