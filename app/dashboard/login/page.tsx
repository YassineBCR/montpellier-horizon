// app/login/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login, signup } from "./actions"
import { toast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData, action: typeof login | typeof signup, type: 'login' | 'signup') => {
    setIsLoading(true)
    try {
      const result = await action(formData)
      if (result?.error) {
        toast({ variant: "destructive", title: "Erreur", description: result.error })
      } else {
        toast({ title: type === 'login' ? "Connexion réussie" : "Compte créé", description: "Bienvenue sur Montpellier Horizon." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <div className="absolute top-8 left-8">
        <Button variant="ghost" asChild>
           <Link href="/"><ArrowLeft className="mr-2 h-4 w-4"/> Retour au site</Link>
        </Button>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Espace Citoyen</CardTitle>
          <CardDescription>Connectez-vous pour participer à la vie de la ville.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>

            {/* FORMULAIRE CONNEXION */}
            <TabsContent value="login">
              <form action={(fd) => handleSubmit(fd, login, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="nom@exemple.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Se connecter"}
                </Button>
              </form>
            </TabsContent>

            {/* FORMULAIRE INSCRIPTION */}
            <TabsContent value="register">
              <form action={(fd) => handleSubmit(fd, signup, 'signup')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="nom@exemple.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pseudo">Pseudo (Optionnel)</Label>
                    <Input id="pseudo" name="pseudo" type="text" placeholder="Comment voulez-vous être appelé ?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" name="password" type="password" required minLength={6} />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" disabled={isLoading}>
                   {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Créer un compte"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}