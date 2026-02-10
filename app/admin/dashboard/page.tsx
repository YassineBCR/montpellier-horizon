"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const [proposals, setProposals] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    const { data } = await supabase.from('proposals').select('*').order('created_at', { ascending: false })
    if (data) {
      setProposals(data)
      calculateStats(data)
    }
  }

  const calculateStats = (data: any[]) => {
    const themes = data.reduce((acc: any, curr) => {
      acc[curr.thematic] = (acc[curr.thematic] || 0) + 1
      return acc
    }, {})
    setStats(Object.keys(themes).map(key => ({ name: key, value: themes[key] })))
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('proposals').update({ status }).eq('id', id)
    fetchProposals()
    // Ici vous déclencheriez l'envoi de mail via une API Route ou Edge Function
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard Administration</h1>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">À valider</TabsTrigger>
          <TabsTrigger value="all">Toutes les publications</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Zone/Quartier</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.filter(p => p.status === 'pending').map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.zone} - {p.neighborhood}</TableCell>
                  <TableCell>{p.user_pseudo}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" className="bg-green-600" onClick={() => updateStatus(p.id, 'published')}>Valider</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(p.id, 'rejected')}>Rejeter</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader><CardTitle>Répartition par Thématiques</CardTitle></CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    {stats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}