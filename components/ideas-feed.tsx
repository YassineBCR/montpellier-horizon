"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IdeasFeed() {
  const [ideas, setIdeas] = useState<any[]>([])

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data } = await supabase
        .from('proposals')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      if (data) setIdeas(data)
    }
    fetchIdeas()
  }, [])

  const handleVote = async (id: string, type: 'likes' | 'dislikes') => {
    // Logique simplifiée : incrémentation en BDD
    const idea = ideas.find(i => i.id === id)
    await supabase
      .from('proposals')
      .update({ [type]: idea[type] + 1 })
      .eq('id', id)
    // Refresh local ou via realtime
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <Card key={idea.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary">{idea.thematic.replace('_', ' ')}</Badge>
              <span className="text-xs text-muted-foreground">{idea.zone}</span>
            </div>
            <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.content}</p>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleVote(idea.id, 'likes')}>
                  <ThumbsUp className="w-4 h-4 mr-1" /> {idea.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleVote(idea.id, 'dislikes')}>
                  <ThumbsDown className="w-4 h-4 mr-1" /> {idea.dislikes}
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}