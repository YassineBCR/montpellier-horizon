"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ThumbsUp, ThumbsDown, Share2, MapPin, Tag, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

// Helper pour récupérer la couleur du thème
const getThemeColor = (theme: string) => {
  switch (theme) {
    case 'Lieu de culte': return "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200";
    case 'Lutte contre l\'islamophobie': return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
    case 'Jeunesse': return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200";
    case 'Économique et Social': return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

interface IdeasFeedProps { limit?: number }

export function IdeasFeed({ limit }: IdeasFeedProps) {
  const [ideas, setIdeas] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    let query = supabase.from('proposals').select('*').eq('status', 'published').order('created_at', { ascending: false })
    if (limit) query = query.limit(limit)
    const { data } = await query
    if (data) setIdeas(data)
  }

  const handleVote = async (id: string, type: 'likes' | 'dislikes', currentCount: number) => {
    const updatedIdeas = ideas.map(i => i.id === id ? { ...i, [type]: currentCount + 1 } : i)
    setIdeas(updatedIdeas)
    await supabase.from('proposals').update({ [type]: currentCount + 1 }).eq('id', id)
  }

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: "Lien copié", description: "Prêt à être partagé !" })
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <Card key={idea.id} className="group flex flex-col h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1 overflow-hidden ring-1 ring-gray-200/50">
            <CardHeader className="pb-3 bg-gradient-to-br from-white to-gray-50/50">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className={`px-2 py-1 rounded-md text-xs font-medium border ${getThemeColor(idea.thematic)}`}>
                  <Tag className="w-3 h-3 mr-1"/> {idea.thematic}
                </Badge>
                <span className="text-[10px] text-muted-foreground bg-white px-2 py-1 rounded-full shadow-sm border flex items-center gap-1">
                    <Clock className="w-3 h-3"/>
                    {formatDistanceToNow(new Date(idea.created_at), { addSuffix: true, locale: fr })}
                </span>
              </div>
              <CardTitle className="text-lg font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors">
                {idea.title}
              </CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                 <MapPin className="w-3 h-3 text-gray-400"/> 
                 <span className="font-medium text-gray-600">{idea.zone}</span> 
                 {idea.neighborhood && <span className="text-gray-400">• {idea.neighborhood}</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow pt-4">
              <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{idea.content}</p>
            </CardContent>
            <CardFooter className="pt-4 border-t border-gray-100 flex justify-between bg-gray-50/30">
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full" onClick={() => handleVote(idea.id, 'likes', idea.likes)}>
                  <ThumbsUp className="w-4 h-4 mr-1.5" /> {idea.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full" onClick={() => handleVote(idea.id, 'dislikes', idea.dislikes)}>
                  <ThumbsDown className="w-4 h-4 mr-1.5" /> {idea.dislikes}
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full" onClick={() => handleShare(idea.title)}>
                <Share2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {limit && ideas.length >= limit && (
        <div className="flex justify-center pt-8">
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/propositions">Voir toutes les propositions <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
        </div>
      )}
    </div>
  )
}