"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, MapPin, Tag, User, Filter, Loader2 } from "lucide-react"
import { SECTORS, THEMES } from "@/lib/constants"
import { toast } from "@/hooks/use-toast"
import { getPublishedProposals } from "@/lib/actions" // On importe l'action

export function IdeasFeed() {
  const [ideas, setIdeas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterTheme, setTheme] = useState("all")
  const [filterSector, setSector] = useState("all")

  useEffect(() => {
    // Charger les vraies données au montage
    const loadIdeas = async () => {
      try {
        const data = await getPublishedProposals()
        setIdeas(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadIdeas()
  }, [])

  const filtered = ideas.filter(i => (filterTheme === "all" || i.theme === filterTheme) && (filterSector === "all" || i.sector === filterSector))

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card border rounded-xl shadow-sm items-center">
        <div className="flex items-center gap-2 text-muted-foreground mr-auto"><Filter className="w-4 h-4"/> <span className="text-sm font-medium">Filtrer par :</span></div>
        <Select value={filterTheme} onValueChange={setTheme}><SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Thème" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les thèmes</SelectItem>{THEMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        <Select value={filterSector} onValueChange={setSector}><SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Secteur" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les secteurs</SelectItem>{Object.keys(SECTORS).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? <p className="text-muted-foreground col-span-full text-center py-10">Aucune proposition publiée pour le moment.</p> : null}
        
        {filtered.map((idea) => (
          <Card key={idea.id} className="flex flex-col hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-primary/10 text-primary"><Tag className="w-3 h-3 mr-1"/>{idea.theme}</Badge>
                <span className="text-xs text-muted-foreground">{new Date(idea.created_at).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold leading-tight">{idea.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground gap-1"><MapPin className="w-3 h-3"/> {idea.neighborhood} ({idea.sector})</div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm line-clamp-3">{idea.content}</p>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><User className="w-3 h-3"/> {idea.author_pseudo}</div>
              <Button size="sm" variant="ghost" className="gap-1.5"><ThumbsUp className="w-4 h-4"/> {idea.likes}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}