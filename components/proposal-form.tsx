"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, ArrowRight, CheckCircle2, Type, FileText } from "lucide-react"

export function ProposalForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // États pour stocker les valeurs (optionnel pour le moment, mais utile pour la suite)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleNext = () => setStep(step + 1)
  const handleSubmit = () => setIsSubmitted(true)

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl text-center h-full flex flex-col items-center justify-center"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">C'est noté !</h3>
        <p className="text-gray-600 mt-2">Votre proposition "{title}" a été ajoutée à la synthèse.</p>
        <button onClick={() => {setIsSubmitted(false); setStep(1); setTitle(""); setDescription("")}} className="mt-6 text-emerald-600 font-medium hover:underline">
          Nouvelle idée
        </button>
      </motion.div>
    )
  }

  return (
    <div className="glass-panel p-6 rounded-3xl shadow-sm relative overflow-hidden flex flex-col h-full">
      {/* Barre de progression */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="flex-1">
        {/* ÉTAPE 1 : CATÉGORIE */}
        {step === 1 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">Quelle est la thématique ?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Lieux de Culte', 'Éducation', 'Jeunesse', 'Commerce', 'Social', 'Autre'].map((cat) => (
                <button key={cat} onClick={handleNext} className="p-3 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-all text-sm font-medium group">
                  <span className="group-hover:translate-x-1 transition-transform inline-block">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ÉTAPE 2 : TITRE ET DESCRIPTION (MODIFIÉE) */}
        {step === 2 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-5">
            
            {/* Champ Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Type size={16} className="text-emerald-600"/> Titre de l'idée
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-gray-800 placeholder:font-normal"
                placeholder="Ex: Une nouvelle bibliothèque à la Mosson..."
                autoFocus
              />
            </div>

            {/* Champ Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={16} className="text-emerald-600"/> Description détaillée
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                placeholder="Expliquez pourquoi c'est important et comment le mettre en place..."
              ></textarea>
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              Suivant <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {/* ÉTAPE 3 : LOCALISATION */}
        {step === 3 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">Pour quel quartier ?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select className="w-full p-4 pl-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer">
                <option>La Mosson / Paillade</option>
                <option>Centre Écusson</option>
                <option>Port Marianne</option>
                <option>Petit Bard / Pergola</option>
                <option>Cévennes</option>
                <option>Prés d'Arènes</option>
                <option>Autre / Toute la ville</option>
              </select>
            </div>
            
            <div className="pt-4">
               <button onClick={handleSubmit} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1">
                <Send size={18} /> Envoyer ma proposition
              </button>
              <p className="text-xs text-center text-gray-400 mt-3">Votre contribution restera anonyme.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}