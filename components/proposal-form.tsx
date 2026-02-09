"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"

export function ProposalForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
        <p className="text-gray-600 mt-2">Votre contribution a été ajoutée à la synthèse.</p>
        <button onClick={() => {setIsSubmitted(false); setStep(1)}} className="mt-6 text-emerald-600 font-medium hover:underline">
          Nouvelle idée
        </button>
      </motion.div>
    )
  }

  return (
    <div className="glass-panel p-6 rounded-3xl shadow-sm relative overflow-hidden">
      {/* Barre de progression */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="min-h-[300px]">
        {step === 1 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">Quelle est la thématique ?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Lieux de Culte', 'Éducation', 'Jeunesse', 'Commerce', 'Social', 'Autre'].map((cat) => (
                <button key={cat} onClick={handleNext} className="p-3 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-all text-sm font-medium">
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">Détaillez votre idée</label>
            <textarea 
              className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 h-32 resize-none"
              placeholder="Soyez précis pour que nous puissions défendre cette idée..."
            ></textarea>
            <button onClick={handleNext} className="w-full py-3 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2">
              Suivant <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">Pour quel quartier ?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <select className="w-full p-3 pl-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                <option>La Mosson / Paillade</option>
                <option>Centre Écusson</option>
                <option>Port Marianne</option>
                <option>Petit Bard</option>
                <option>Autre</option>
              </select>
            </div>
            <button onClick={handleSubmit} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all">
              <Send size={18} /> Envoyer ma proposition
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}