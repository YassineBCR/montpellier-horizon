import { Users, Mic, Eye, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ManifestoSection() {
  const pillars = [
    {
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      title: "Inclusion Totale",
      description: "Donner la parole à ceux qui ne l'ont jamais. Chaque quartier, chaque communauté est une force vive de Montpellier."
    },
    {
      icon: Mic,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      title: "Expression Libre",
      description: "Un espace sécurisé, sans filtre partisan, pour remonter les vrais problèmes du terrain. L'anonymat est respecté."
    },
    {
      icon: Eye,
      color: "text-green-500",
      bg: "bg-green-500/10",
      title: "Transparence Radicale",
      description: "Les propositions sont publiques. Vous voyez ce qui est validé, ce qui est refusé, et pourquoi. Fini l'opacité."
    },
    {
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      title: "Action Directe",
      description: "Ce n'est pas un livre de doléances, c'est un outil de travail pour construire un programme politique concret."
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      {pillars.map((pillar, index) => (
        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white group">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className={`mb-6 p-4 rounded-2xl ${pillar.bg} ${pillar.color} group-hover:scale-110 transition-transform duration-300`}>
              <pillar.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{pillar.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}