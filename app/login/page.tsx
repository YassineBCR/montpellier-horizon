"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  // Champs du formulaire
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pseudo, setPseudo] = useState("")

  // --- CONNEXION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      toast({ title: "Erreur", description: "Email ou mot de passe incorrect.", variant: "destructive" })
    } else {
      toast({ title: "Succès", description: "Connexion réussie." })
      router.refresh()
      router.push("/admin/dashboard")
    }
    setLoading(false)
  }

  // --- INSCRIPTION ---
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Le Trigger SQL s'occupera de créer le profil Admin automatiquement
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: pseudo } // Envoi du pseudo pour le SQL
      }
    })

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" })
    } else {
      // Connexion directe car confirmation email désactivée
      if (data.session) {
        toast({ title: "Compte créé !", description: "Bienvenue sur le dashboard." })
        router.refresh()
        router.push("/admin/dashboard")
      }
    }
    
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>
        
        {/* LOGIN */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Connexion Admin</CardTitle>
              <CardDescription>Accédez au tableau de bord.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <Input type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Se connecter
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* REGISTER */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Nouvel Admin</CardTitle>
              <CardDescription>Créez votre compte administrateur.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pseudo</Label>
                  <Input required onChange={(e) => setPseudo(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <Input type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Créer le compte
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}