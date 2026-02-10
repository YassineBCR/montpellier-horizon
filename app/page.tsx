// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Check, ShieldAlert, X, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const pending = [
    { id: 101, title: "Nettoyage berges du Lez", author: "Lucas", theme: "Urbanisme", status: "En attente" },
    { id: 102, title: "Fête des voisins Antigone", author: "Sarah", theme: "Jeunesse", status: "En attente" },
  ]

  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-10 space-y-8">
      {/* HEADER AVEC BOUTON RETOUR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" /> Retour au site
              </Link>
            </Button>
            <Badge variant="outline" className="px-3 py-1 border-green-500 text-green-600 bg-green-50">
              <Activity className="w-3 h-3 mr-2"/> Système En ligne
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-muted-foreground">Espace de modération et de pilotage.</p>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{pending.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Validés ce mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">1,204</div>
          </CardContent>
        </Card>
      </div>

      {/* TABLEAU DE MODÉRATION */}
      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary"/> Modération requise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sujet</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Thème</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Aucune action requise pour le moment.</TableCell>
                </TableRow>
              ) : (
                pending.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.author}</TableCell>
                    <TableCell><Badge variant="secondary">{p.theme}</Badge></TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0">
                        <Check className="w-4 h-4"/>
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                        <X className="w-4 h-4"/>
                      </Button>
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