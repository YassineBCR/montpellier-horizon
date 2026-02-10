"use client"

import { useState } from "react"
import { Check, ChevronRight, ChevronLeft, Send, Landmark, ShieldAlert, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

// --- CONFIGURATION DES COULEURS ---
export const THEMES = [
    { id: 'Lieu de culte', label: 'Lieu de culte', icon: Landmark, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'Lutte contre l\'islamophobie', label: 'Lutte contre l\'islamophobie', icon: ShieldAlert, color: 'text-red-600 bg-red-50 border-red-200' },
    { id: 'Jeunesse', label: 'Jeunesse & Éducation', icon: Users, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'Économique et Social', label: 'Économique & Social', icon: TrendingUp, color: 'text-amber-600 bg-amber-50 border-amber-200' },
];

const ZONES = ["Nord", "Sud", "Est", "Ouest", "Ville Globale (Neutre)"];
const QUARTIERS_PAR_ZONE: Record<string, string[]> = {
  "Nord": ["Paillade", "Hauts de Massane", "Malbosc", "Autre (Préciser)"],
  "Ouest": ["Celleneuve", "Mosson", "Cévennes", "Autre (Préciser)"],
  "Sud": ["Prés d'Arènes", "Croix d'Argent", "Autre (Préciser)"],
  "Est": ["Millénaire", "Port Marianne", "Autre (Préciser)"],
  "Ville Globale (Neutre)": ["Toute la ville"]
};

export function ProposalForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [customNeighborhood, setCustomNeighborhood] = useState("") // Pour stocker la saisie manuelle
  const [formData, setFormData] = useState({
    title: "", content: "", thematic: "", zone: "", neighborhood: "", user_email: "", user_pseudo: "", is_anonymous: false
  })

  const handleSubmit = async () => {
    setLoading(true)
    
    // Si l'utilisateur a choisi "Autre", on prend sa saisie manuelle
    const finalNeighborhood = formData.neighborhood === "Autre (Préciser)" ? customNeighborhood : formData.neighborhood

    const { error } = await supabase.from('proposals').insert([{ 
        ...formData, 
        neighborhood: finalNeighborhood,
        status: 'pending' 
    }])

    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer la proposition.", variant: "destructive" })
    } else {
      toast({ title: "Envoyé !", description: "Votre proposition est en cours de traitement." })
      setStep(5)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-none shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden ring-1 ring-white/50 relative">
      <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500 ease-in-out" style={{ width: `${(step / 4) * 100}%` }} />
      
      <CardHeader className="pb-8 text-center pt-10">
        <CardTitle className="text-3xl font-bold">Nouvelle Contribution</CardTitle>
        <CardDescription className="text-lg">Étape {step} sur 4</CardDescription>
      </CardHeader>

      <CardContent className="min-h-[350px] space-y-8 px-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <Label className="text-xl font-semibold flex items-center justify-center gap-2">
                <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary">1</span> 
                Choisissez une thématique
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {THEMES.map((theme) => (
                 <div key={theme.id} 
                      onClick={() => setFormData({...formData, thematic: theme.id})}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-4 group hover:shadow-md
                        ${formData.thematic === theme.id 
                            ? `border-current ${theme.color} shadow-md scale-[1.02]` 
                            : 'border-muted-foreground/10 hover:border-primary/50 hover:bg-muted/30'}`}>
                    <div className={`p-3 rounded-full bg-white/50 group-hover:scale-110 transition-transform`}>
                        <theme.icon className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-lg">{theme.label}</span>
                 </div>
               ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 max-w-md mx-auto">
             <Label className="text-xl font-semibold flex items-center justify-center gap-2">
                <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary">2</span> 
                Localisation
             </Label>
            <div className="space-y-4">
                <Select onValueChange={(v) => setFormData({...formData, zone: v, neighborhood: ""})}>
                    <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Sélectionnez une zone" /></SelectTrigger>
                    <SelectContent>{ZONES.map(z => <SelectItem key={z} value={z} className="text-base">{z}</SelectItem>)}</SelectContent>
                </Select>
                
                {formData.zone && formData.zone !== "Ville Globale (Neutre)" && (
                    <div className="animate-in fade-in zoom-in-95 pt-2 space-y-3">
                        <Label className="block">Quartier</Label>
                        <Select onValueChange={(v) => setFormData({...formData, neighborhood: v})}>
                            <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Quel quartier ?" /></SelectTrigger>
                            <SelectContent>
                                {QUARTIERS_PAR_ZONE[formData.zone]?.map(q => <SelectItem key={q} value={q} className="text-base">{q}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        {/* Champ de saisie manuel si "Autre" est sélectionné */}
                        {formData.neighborhood === "Autre (Préciser)" && (
                            <Input 
                                placeholder="Tapez le nom de votre quartier..." 
                                className="h-12 text-lg border-primary/50 animate-in fade-in slide-in-from-top-2"
                                value={customNeighborhood}
                                onChange={(e) => setCustomNeighborhood(e.target.value)}
                                autoFocus
                            />
                        )}
                    </div>
                )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <Label className="text-xl font-semibold flex items-center justify-center gap-2"><span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary">3</span> Votre idée</Label>
            <Input placeholder="Titre court et percutant" className="h-12 text-lg font-medium" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            <Textarea className="min-h-[180px] text-lg resize-none p-4" placeholder="Décrivez votre proposition en détail..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 max-w-md mx-auto">
             <Label className="text-xl font-semibold flex items-center justify-center gap-2"><span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary">4</span> Vos informations</Label>
            <div className="space-y-4 bg-muted/30 p-6 rounded-xl border">
                <Input placeholder="Pseudo ou Nom" className="h-12" value={formData.user_pseudo} onChange={(e) => setFormData({...formData, user_pseudo: e.target.value})} />
                <Input type="email" placeholder="Email (pour le suivi)" className="h-12" value={formData.user_email} onChange={(e) => setFormData({...formData, user_email: e.target.value})} />
                <div className="flex items-center space-x-3 pt-2">
                <Checkbox id="anon" className="w-6 h-6" checked={formData.is_anonymous} onCheckedChange={(c) => setFormData({...formData, is_anonymous: !!c})} />
                <label htmlFor="anon" className="text-sm font-medium cursor-pointer leading-snug">
                    Publier en mode anonyme <br/><span className="text-muted-foreground text-xs font-normal">Votre pseudo sera masqué sur le site public.</span>
                </label>
                </div>
            </div>
          </div>
        )}

        {step === 5 && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50 animate-bounce">
                    <Check className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-gray-900">Merci !</h3>
                <p className="text-xl text-muted-foreground max-w-md">Votre proposition a bien été reçue.</p>
            </div>
        )}
      </CardContent>

      {step < 5 && (
        <CardFooter className="flex justify-between p-8 bg-gray-50/50 border-t">
          <Button variant="ghost" size="lg" onClick={() => setStep(step - 1)} disabled={step === 1} className="text-base hover:bg-white"><ChevronLeft className="mr-2 h-5 w-5"/> Précédent</Button>
          {step < 4 ? (
             <Button size="lg" onClick={() => setStep(step + 1)} className="text-base px-8 rounded-full shadow-lg shadow-primary/20">Suivant <ChevronRight className="ml-2 h-5 w-5"/></Button>
          ) : (
             <Button size="lg" onClick={handleSubmit} disabled={loading || !formData.title || !formData.user_email} className="text-base px-8 rounded-full shadow-lg shadow-primary/20 bg-green-600 hover:bg-green-700">
                 {loading ? "Envoi en cours..." : "Valider et Envoyer"} <Send className="ml-2 h-5 w-5"/>
             </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}