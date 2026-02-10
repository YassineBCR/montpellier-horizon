"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Lock, LogOut, Check, X, Trash2, TrendingUp, Users, MapPin, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Mêmes couleurs que sur l'accueil pour la cohérence
const THEME_COLORS: Record<string, string> = {
  "Lieu de culte": "#4f46e5", // Indigo
  "Lutte contre l'islamophobie": "#dc2626", // Rouge
  "Jeunesse": "#059669", // Vert
  "Économique et Social": "#d97706", // Orange
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState("")
  const [proposals, setProposals] = useState<any[]>([])
  
  // États pour les statistiques avancées
  const [statsData, setStatsData] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [topZone, setTopZone] = useState("N/A")
  
  const { toast } = useToast()

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === "admin1980FR@") { 
      setIsAuthenticated(true)
      toast({ title: "Bienvenue", description: "Connexion administrateur réussie." })
      fetchProposals()
    } else {
      toast({ title: "Erreur", description: "Code incorrect.", variant: "destructive" })
    }
  }

  const fetchProposals = async () => {
    const { data } = await supabase.from('proposals').select('*').order('created_at', { ascending: false })
    if (data) {
      setProposals(data)
      calculateAdvancedStats(data)
    }
  }

  const calculateAdvancedStats = (data: any[]) => {
    // 1. Total
    setTotalCount(data.length)

    // 2. Répartition par thème avec couleurs
    const themesCount = data.reduce((acc: any, curr) => {
      acc[curr.thematic] = (acc[curr.thematic] || 0) + 1
      return acc
    }, {})
    
    const formattedStats = Object.keys(themesCount).map(key => ({
      name: key,
      value: themesCount[key],
      color: THEME_COLORS[key] || "#94a3b8"
    }))
    setStatsData(formattedStats)

    // 3. Zone la plus active
    if (data.length > 0) {
        const zonesCount = data.reduce((acc: any, curr) => {
            acc[curr.zone] = (acc[curr.zone] || 0) + 1
            return acc
        }, {})
        const top = Object.keys(zonesCount).reduce((a, b) => zonesCount[a] > zonesCount[b] ? a : b)
        setTopZone(top)
    }
  }

  const updateStatus = async (proposal: any, newStatus: string) => {
    await supabase.from('proposals').update({ status: newStatus }).eq('id', proposal.id)
    
    if (newStatus === 'published') {
        await fetch('/api/notify', {
            method: 'POST',
            body: JSON.stringify({
                email: proposal.user_email,
                pseudo: proposal.user_pseudo,
                title: proposal.title,
                type: 'publication_validee'
            })
        });
        toast({ title: "Validé", description: "Proposition publiée." })
    }
    fetchProposals()
  }

  const deleteProposal = async (id: string) => {
      if(confirm("Supprimer définitivement ?")) {
          await supabase.from('proposals').delete().eq('id', id)
          fetchProposals()
          toast({ title: "Supprimé", description: "Effacé de la base." })
      }
  }

  // Helper pour les badges de couleur dans le tableau
  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case 'Lieu de culte': return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 'Lutte contre l\'islamophobie': return "bg-red-100 text-red-700 border-red-200";
      case 'Jeunesse': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'Économique et Social': return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4"><Lock className="w-8 h-8 text-primary"/></div>
            <CardTitle>Accès Administration</CardTitle>
          </CardHeader>
          <form onSubmit={handleUnlock}>
            <CardContent><Input type="password" placeholder="Code d'accès" className="text-center text-lg tracking-widest" value={code} onChange={e => setCode(e.target.value)} autoFocus/></CardContent>
            <CardFooter><Button type="submit" className="w-full">Déverrouiller</Button></CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Lock className="w-5 h-5 text-primary"/> Dashboard</h1>
            <Button variant="ghost" onClick={() => setIsAuthenticated(false)} className="text-red-500 hover:bg-red-50"><LogOut className="mr-2 h-4 w-4"/> Quitter</Button>
          </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="pending" className="space-y-8">
            <TabsList className="w-full md:w-auto grid grid-cols-3 p-1 bg-white border rounded-xl shadow-sm">
                <TabsTrigger value="pending" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">À Valider ({proposals.filter(p => p.status === 'pending').length})</TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Vue Globale</TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Statistiques</TabsTrigger>
            </TabsList>

            {/* TAB: À VALIDER */}
            <TabsContent value="pending">
                <Card className="border-none shadow-md"><CardHeader><CardTitle>En attente de modération</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Proposition</TableHead><TableHead>Auteur</TableHead><TableHead className="text-right">Décision</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {proposals.filter(p => p.status === 'pending').map(p => (
                                <TableRow key={p.id}>
                                    <TableCell className="max-w-md">
                                        <div className="font-bold text-base mb-1">{p.title}</div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <Badge variant="outline" className={getThemeBadgeColor(p.thematic)}>{p.thematic}</Badge>
                                            <Badge variant="secondary">{p.zone}</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">{p.content}</p>
                                    </TableCell>
                                    <TableCell>{p.user_pseudo}<div className="text-xs text-muted-foreground">{p.neighborhood}</div></TableCell>
                                    <TableCell className="text-right space-x-2 whitespace-nowrap align-top pt-4">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm" onClick={() => updateStatus(p, 'published')}><Check className="w-4 h-4 mr-1"/> Valider</Button>
                                        <Button size="sm" variant="destructive" className="shadow-sm" onClick={() => updateStatus(p, 'rejected')}><X className="w-4 h-4 mr-1"/> Refuser</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {proposals.filter(p => p.status === 'pending').length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-12 text-muted-foreground">Aucune proposition en attente.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>

            {/* TAB: VUE GLOBALE */}
            <TabsContent value="all">
                <Card className="border-none shadow-md"><CardHeader><CardTitle>Historique complet</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {proposals.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell>
                                        <div className="font-medium">{p.title}</div>
                                        <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={p.status === 'published' ? 'default' : p.status === 'rejected' ? 'destructive' : 'secondary'}>
                                            {p.status === 'published' ? 'Publié' : p.status === 'rejected' ? 'Rejeté' : 'En attente'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-600" onClick={() => deleteProposal(p.id)}><Trash2 className="w-4 h-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>

            {/* TAB: STATISTIQUES (Identique Accueil) */}
            <TabsContent value="stats">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Carte Chiffres Clés */}
                    <Card className="md:col-span-1 border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Indicateurs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-200 text-blue-700 rounded-full"><Users className="w-5 h-5"/></div>
                                    <div><p className="text-sm text-muted-foreground">Total Contributions</p><p className="text-2xl font-bold">{totalCount}</p></div>
                                </div>
                             </div>
                             <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-200 text-orange-700 rounded-full"><MapPin className="w-5 h-5"/></div>
                                    <div><p className="text-sm text-muted-foreground">Zone la plus active</p><p className="text-xl font-bold text-orange-600">{topZone}</p></div>
                                </div>
                             </div>
                        </CardContent>
                    </Card>

                    {/* Carte Graphique */}
                    <Card className="md:col-span-2 border-none shadow-md">
                        <CardHeader><CardTitle>Répartition par Thématiques</CardTitle></CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={130} paddingAngle={5}>
                                        {statsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>)}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}/>
                                    <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}