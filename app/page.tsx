// app/dashboard/page.tsx
import { createClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Check, ShieldAlert, X, ArrowLeft, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { updateProposalStatus } from "@/lib/actions" 
import { logout } from "@/app/login/actions"

// Force le chargement dynamique pour éviter le cache
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. VERIFICATION UTILISATEUR
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // 2. VERIFICATION ROLE ADMIN
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  // Si pas admin -> Retour accueil
  if (!profile || profile.role !== 'admin') {
    redirect("/")
  }

  // 3. CHARGEMENT DONNÉES
  const { data: pending } = await supabase
    .from('proposals')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const { count: totalCount } = await supabase.from('proposals').select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div className="bg-background border rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <ArrowLeft className="w-4 h-4 mr-2" /> 
              Retour au site
          </Link>
          <div className="flex items-center gap-3 border-l pl-6">
             <div className="p-2 bg-primary/10 rounded-lg text-primary hidden md:block"><LayoutDashboard className="w-6 h-6" /></div>
             <div><h1 className="text-xl font-bold tracking-tight">Administration</h1><p className="text-xs text-muted-foreground">Espace de modération</p></div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium">{user.email}</span>
                <Badge variant="outline" className="text-[10px] px-2 py-0 border-green-500 text-green-600 bg-green-50">Admin Connecté</Badge>
            </div>
            <form action={logout}><Button variant="destructive" size="sm" className="gap-2"><LogOut className="w-4 h-4"/> <span className="hidden sm:inline">Déconnexion</span></Button></form>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-l-4 border-l-orange-500">
            <CardHeader className="pb-2 pt-4"><CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{pending?.length || 0}</div></CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-blue-500">
            <CardHeader className="pb-2 pt-4"><CardTitle className="text-sm font-medium text-muted-foreground">Total Projets</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{totalCount || 0}</div></CardContent>
        </Card>
      </div>

      {/* TABLEAU */}
      <Card className="shadow-md overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-muted/10 border-b py-4"><CardTitle className="flex items-center gap-2 text-lg"><ShieldAlert className="w-5 h-5"/> À modérer</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-muted/5">
                <TableHead>Titre</TableHead><TableHead>Auteur</TableHead><TableHead>Description</TableHead><TableHead className="text-right pr-6">Décision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending?.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center text-muted-foreground">Aucune proposition en attente.</TableCell></TableRow>
              ) : (
                pending?.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/5">
                    <TableCell className="font-semibold">{p.title}</TableCell>
                    <TableCell>{p.author_pseudo || "Anonyme"}</TableCell>
                    <TableCell className="max-w-[300px]"><p className="text-sm text-muted-foreground line-clamp-1">{p.content}</p></TableCell>
                    <TableCell className="text-right space-x-2 pr-4">
                        <div className="flex justify-end gap-2">
                            <form><Button formAction={async () => { "use server"; await updateProposalStatus(p.id, 'published') }} size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-xs shadow-sm"><Check className="w-3 h-3 mr-1"/> Valider</Button></form>
                            <form><Button formAction={async () => { "use server"; await updateProposalStatus(p.id, 'rejected') }} size="sm" variant="destructive" className="h-8 text-xs shadow-sm"><X className="w-3 h-3 mr-1"/> Rejeter</Button></form>
                        </div>
                    </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}