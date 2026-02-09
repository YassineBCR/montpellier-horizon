"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, MapPin } from "lucide-react"

const INITIAL_IDEAS = [
  { id: 1, title: "Extension Carré Musulman", votes: 142, category: "Culte", quartier: "Grammont" },
  { id: 2, title: "Soutien scolaire La Paillade", votes: 98, category: "Éducation", quartier: "La Paillade" },
  { id: 3, title: "Festival Culturel & Gastronomie", votes: 76, category: "Culture", quartier: "Centre" },
]

export function IdeasFeed() {
  const [ideas, setIdeas] = useState(INITIAL_IDEAS)

  const handleVote = (id: number) => {
    setIdeas(prev => {
      const newIdeas = prev.map(idea => 
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
      // On trie automatiquement pour que le plus voté monte
      return newIdeas.sort((a, b) => b.votes - a.votes)
    })
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {ideas.map((idea) => (
          <motion.div
            key={idea.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-5 rounded-2xl flex items-center justify-between group hover:border-emerald-200 transition-colors"
          >
            <div>
              <div className="flex gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{idea.category}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {idea.quartier}</span>
              </div>
              <h4 className="font-semibold text-gray-800">{idea.title}</h4>
            </div>

            <button 
              onClick={() => handleVote(idea.id)}
              className="flex flex-col items-center justify-center bg-gray-50 hover:bg-emerald-500 hover:text-white text-gray-600 w-14 h-14 rounded-xl transition-all duration-300"
            >
              <ThumbsUp size={18} className="mb-1" />
              <span className="text-xs font-bold">{idea.votes}</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}