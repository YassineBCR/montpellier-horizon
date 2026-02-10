"use client"

import { useState, useMemo } from "react"
import { ThumbsUp, Share2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categoryColors: Record<string, string> = {
  "Lieux de culte": "bg-primary/10 text-primary border-primary/20",
  "Éducation": "bg-blue-50 text-blue-700 border-blue-200",
  "Carrés confessionnels": "bg-amber-50 text-amber-700 border-amber-200",
  "Jeunesse": "bg-rose-50 text-rose-700 border-rose-200",
  "Lutte contre l'islamophobie": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Commerce local": "bg-orange-50 text-orange-700 border-orange-200",
}

const quartiers = [
  "Tous les quartiers",
  "Mosson",
  "Paillade",
  "Centre",
  "Port Marianne",
  "Aiguelongue",
  "Les Cévennes",
  "Hôpitaux-Facultés",
]

const ideas = [
  {
    id: 1,
    title: "Agrandissement de la salle de prière du quartier Mosson",
    category: "Lieux de culte",
    quartier: "Mosson",
    description:
      "La salle de prière actuelle ne peut accueillir tous les fidèles, notamment lors du vendredi. Nous demandons un agrandissement ou une relocalisation dans un espace plus adapté.",
    votes: 234,
  },
  {
    id: 2,
    title: "Cours de soutien scolaire gratuits pour les collégiens",
    category: "Éducation",
    quartier: "Paillade",
    description:
      "Mettre en place un programme de soutien scolaire gratuit dans les maisons de quartier pour accompagner les collégiens en difficulté.",
    votes: 189,
  },
  {
    id: 3,
    title: "Création d'un carré confessionnel au cimetière Saint-Lazare",
    category: "Carrés confessionnels",
    quartier: "Centre",
    description:
      "Permettre aux familles musulmanes de Montpellier de disposer d'un espace dédié pour inhumer leurs proches selon les rites religieux.",
    votes: 312,
  },
  {
    id: 4,
    title: "Centre d'activités pour les jeunes à Port Marianne",
    category: "Jeunesse",
    quartier: "Port Marianne",
    description:
      "Créer un espace polyvalent avec activités sportives, culturelles et ateliers numériques pour les 12-25 ans du quartier.",
    votes: 145,
  },
  {
    id: 5,
    title: "Observatoire local contre les discriminations",
    category: "Lutte contre l'islamophobie",
    quartier: "Centre",
    description:
      "Mettre en place un observatoire avec un numéro d'écoute et un accompagnement juridique pour les victimes d'actes islamophobes à Montpellier.",
    votes: 278,
  },
  {
    id: 6,
    title: "Marché local halal hebdomadaire",
    category: "Commerce local",
    quartier: "Les Cévennes",
    description:
      "Organiser un marché hebdomadaire mettant en avant les producteurs et commerçants locaux proposant des produits halal et biologiques.",
    votes: 167,
  },
]

export function IdeasFeed() {
  const [search, setSearch] = useState("")
  const [selectedQuartier, setSelectedQuartier] = useState("Tous les quartiers")
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories")
  const [votedIds, setVotedIds] = useState<number[]>([])

  const categories = ["Toutes les catégories", ...Object.keys(categoryColors)]

  const filtered = useMemo(() => {
    return ideas.filter((idea) => {
      const matchSearch =
        idea.title.toLowerCase().includes(search.toLowerCase()) ||
        idea.description.toLowerCase().includes(search.toLowerCase())
      const matchQuartier =
        selectedQuartier === "Tous les quartiers" || idea.quartier === selectedQuartier
      const matchCategory =
        selectedCategory === "Toutes les catégories" || idea.category === selectedCategory
      return matchSearch && matchQuartier && matchCategory
    })
  }, [search, selectedQuartier, selectedCategory])

  function handleVote(id: number) {
    setVotedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  function handleShare(idea: { title: string; description: string }) {
    const text = `${idea.title} - ${idea.description}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <section id="propositions" className="bg-background px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Propositions citoyennes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Découvrez les idées de la communauté et soutenez celles qui comptent pour vous.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une proposition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedQuartier} onValueChange={setSelectedQuartier}>
            <SelectTrigger className="sm:w-52">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {quartiers.map((q) => (
                <SelectItem key={q} value={q}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="sm:w-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Aucune proposition ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((idea) => {
              const voted = votedIds.includes(idea.id)
              return (
                <article
                  key={idea.id}
                  className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={categoryColors[idea.category] || ""}
                      >
                        {idea.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{idea.quartier}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-card-foreground">
                      {idea.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {idea.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant={voted ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleVote(idea.id)}
                      className="gap-1.5"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{voted ? idea.votes + 1 : idea.votes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(idea)}
                      className="gap-1.5 text-muted-foreground"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Partager</span>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
