"use client"

import { useState } from "react"
import { Check, ChevronRight, ChevronLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

const ZONES = ["Nord", "Sud", "Est", "Ouest"];
const NEIGHBORHOODS = {
  "Nord": ["Paillade", "Celleneuve", "Global"],
  "Sud": ["Global"],
  "Est": ["Global"],
  "Ouest": ["Global"]
};

export function ProposalForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thematic: "",
    zone: "",
    neighborhood: "",
    user_email: "",
    user_pseudo: "",
    is_anonymous: false
  })

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.from('proposals').insert([formData])

    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer votre proposition.", variant: "destructive" })
    } else {
      toast({ title: "Succès !", description: "Votre proposition a été envoyée pour validation admin." })
      setStep(5) // Étape de succès
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 w-full mx-1 rounded-full ${step >= i ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <CardTitle className="text-2xl">Exprimez-vous pour Montpellier</CardTitle>
        <CardDescription>Votre avis compte pour construire l'avenir de notre ville.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 min-h-[300px]">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label>Thématique</Label>
              <Select onValueChange={(v) => setFormData({...formData, thematic: v})}>
                <SelectTrigger><SelectValue placeholder="Choisissez une thématique" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lieu_de_culte">Lieu de culte</SelectItem>
                  <SelectItem value="islamophobie">Lutte contre l'islamophobie</SelectItem>
                  <SelectItem value="jeunesse">Jeunesse</SelectItem>
                  <SelectItem value="economique_social">Économique et Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Zone de la ville</Label>
              <Select onValueChange={(v) => setFormData({...formData, zone: v, neighborhood: ""})}>
                <SelectTrigger><SelectValue placeholder="Choisissez une zone" /></SelectTrigger>
                <SelectContent>
                  {ZONES.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <Label>Quartier (ou Ville Globale)</Label>
            <Select onValueChange={(v) => setFormData({...formData, neighborhood: v})}>
              <SelectTrigger><SelectValue placeholder="Choisissez votre quartier" /></SelectTrigger>
              <SelectContent>
                {formData.zone && NEIGHBORHOODS[formData.zone as keyof typeof NEIGHBORHOODS].map(n => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label>Titre du sujet</Label>
              <Input placeholder="Titre clair et concis" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Votre message</Label>
              <Textarea className="min-h-[150px]" placeholder="Détaillez votre proposition ici..." onChange={(e) => setFormData({...formData, content: e.target.value})} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label>Pseudo ou Nom</Label>
              <Input placeholder="Votre identité" onChange={(e) => setFormData({...formData, user_pseudo: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Adresse Email (pour le suivi)</Label>
              <Input type="email" placeholder="email@exemple.com" onChange={(e) => setFormData({...formData, user_email: e.target.value})} />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="anon" onCheckedChange={(checked) => setFormData({...formData, is_anonymous: !!checked})} />
              <label htmlFor="anon" className="text-sm font-medium leading-none">Publier anonymement</label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-10 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Merci pour votre participation !</h3>
            <p className="text-muted-foreground mt-2">Votre publication est en cours de traitement par nos administrateurs. Un mail de confirmation vous a été envoyé.</p>
          </div>
        )}
      </CardContent>

      {step < 5 && (
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>
              Suivant <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="bg-primary hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" /> {loading ? "Envoi..." : "Publier"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}