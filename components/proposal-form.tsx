// components/proposal-form.tsx
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SECTORS, THEMES, SectorKey } from "@/lib/constants"
import { toast } from "@/hooks/use-toast"
import { submitProposal } from "@/lib/actions"
import { ChevronRight, ChevronLeft, Send, MapPin, Hash, PenLine, User, Check } from "lucide-react"

const formSchema = z.object({
  theme: z.string().min(1, "Requis"),
  sector: z.string().min(1, "Requis"),
  neighborhood: z.string().min(1, "Requis"),
  title: z.string().min(5, "5 caractères min."),
  content: z.string().min(20, "20 caractères min."),
  isAnonymous: z.boolean().default(false),
  email: z.string().email("Email invalide"),
  pseudo: z.string().optional(),
})

export function ProposalForm() {
  const [step, setStep] = useState(1)
  const [selectedSector, setSelectedSector] = useState<SectorKey | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isAnonymous: false, neighborhood: "Ville Globale", title: "", content: "", email: "", pseudo: "", theme: "", sector: "" },
  })

  const nextStep = async () => {
    let isValid = false
    if (step === 1) isValid = await form.trigger(["theme"])
    if (step === 2) isValid = await form.trigger(["sector", "neighborhood"])
    if (step === 3) isValid = await form.trigger(["title", "content"])
    if (isValid) setStep(s => s + 1)
  }

  const prevStep = () => setStep(s => s - 1)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await submitProposal(values)
      toast({ title: "Succès !", description: "Votre idée a été transmise aux modérateurs.", duration: 5000 })
      form.reset(); setStep(1); setSelectedSector("")
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez réessayer." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border shadow-xl overflow-hidden bg-background/80 backdrop-blur-sm">
      <div className="h-2 bg-muted w-full"><div className="h-full bg-primary transition-all duration-500 ease-in-out" style={{ width: `${(step/4)*100}%` }} /></div>
      
      <CardHeader className="text-center pt-8 pb-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            {step === 1 && <Hash className="w-6 h-6"/>}
            {step === 2 && <MapPin className="w-6 h-6"/>}
            {step === 3 && <PenLine className="w-6 h-6"/>}
            {step === 4 && <User className="w-6 h-6"/>}
        </div>
        <CardTitle className="text-2xl">
            {step === 1 && "Quelle est la thématique ?"}
            {step === 2 && "Où cela se passe-t-il ?"}
            {step === 3 && "Dites-nous tout"}
            {step === 4 && "Derniers détails"}
        </CardTitle>
        <CardDescription>Étape {step} sur 4</CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-10 min-h-[350px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* ETAPE 1 */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
                {THEMES.map((theme) => (
                  <div key={theme} onClick={() => form.setValue("theme", theme)}
                    className={`cursor-pointer rounded-xl border-2 p-4 flex items-center justify-between hover:border-primary/50 transition-all ${form.watch("theme") === theme ? "border-primary bg-primary/5" : "border-muted"}`}>
                    <span className="font-medium">{theme}</span>
                    {form.watch("theme") === theme && <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>}
                  </div>
                ))}
              </div>
            )}

            {/* ETAPE 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="sector" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secteur</FormLabel>
                        <Select onValueChange={(v) => {field.onChange(v); setSelectedSector(v as SectorKey)}} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Choisir..." /></SelectTrigger></FormControl>
                          <SelectContent>{Object.keys(SECTORS).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="neighborhood" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quartier</FormLabel>
                        <Select onValueChange={field.onChange} disabled={!selectedSector} value={field.value}>
                          <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Choisir..." /></SelectTrigger></FormControl>
                          <SelectContent>{selectedSector && SECTORS[selectedSector].map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormItem>
                  )}/>
                </div>
              </div>
            )}

            {/* ETAPE 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Titre court</FormLabel><FormControl><Input placeholder="Ex: Rénovation parc..." className="h-12 text-lg" {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem><FormLabel>Description détaillée</FormLabel><FormControl><Textarea placeholder="Expliquez votre projet..." className="min-h-[150px] resize-none" {...field} /></FormControl><FormMessage/></FormItem>
                )}/>
              </div>
            )}

            {/* ETAPE 4 */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="bg-muted/30 p-6 rounded-xl space-y-4">
                    <FormField control={form.control} name="isAnonymous" render={({ field }) => (
                        <FormItem className="flex items-center justify-between p-2">
                            <div className="space-y-0.5"><FormLabel>Anonyme</FormLabel><CardDescription>Masquer mon nom</CardDescription></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )}/>
                    {!form.watch("isAnonymous") && (
                        <FormField control={form.control} name="pseudo" render={({ field }) => (
                            <FormItem><FormLabel>Nom public</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )}/>
                    )}
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email (Privé)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                    )}/>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between p-6 bg-muted/20">
        <Button variant="ghost" onClick={prevStep} disabled={step === 1} className={step === 1 ? "invisible" : ""}><ChevronLeft className="mr-2 h-4 w-4"/> Retour</Button>
        {step < 4 ? <Button onClick={nextStep}>Suivant <ChevronRight className="ml-2 h-4 w-4"/></Button> : <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Envoi..." : "Valider ma proposition"}</Button>}
      </CardFooter>
    </Card>
  )
}