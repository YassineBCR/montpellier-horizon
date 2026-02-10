"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, TrendingUp, MapPin, Users } from "lucide-react"

// Couleurs Hexadécimales pour le graphique
const THEME_HEX_COLORS: Record<string, string> = {
  "Lieu de culte": "#4f46e5", // Indigo
  "Lutte contre l'islamophobie": "#dc2626", // Rouge
  "Jeunesse": "#059669", // Vert
  "Économique et Social": "#d97706", // Orange
}

export function AnalysisSection() {
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [topZone, setTopZone] = useState("En attente")
  const [themeData, setThemeData] = useState<any[]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data } = await supabase.from('proposals').select('thematic, zone')
    
    if (data && data.length > 0) {
      setTotal(data.length)
      const themesCount = data.reduce((acc: any, curr) => {
        acc[curr.thematic] = (acc[curr.thematic] || 0) + 1
        return acc
      }, {})

      const formattedThemes = Object.keys(themesCount).map((key) => ({
        name: key,
        value: themesCount[key],
        color: THEME_HEX_COLORS[key] || "#94a3b8" // Gris par défaut
      }))
      setThemeData(formattedThemes)

      const zonesCount = data.reduce((acc: any, curr) => {
        acc[curr.zone] = (acc[curr.zone] || 0) + 1
        return acc
      }, {})
      
      const topZ = Object.keys(zonesCount).reduce((a, b) => zonesCount[a] > zonesCount[b] ? a : b)
      setTopZone(topZ)
    }
    setLoading(false)
  }

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>
  if (total === 0) return <div className="text-center py-20 text-muted-foreground">Aucune donnée pour le moment.</div>

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1 border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Tendances</CardTitle>
          <CardDescription>Indicateurs en temps réel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-full"><Users className="w-5 h-5"/></div>
                <div><p className="text-sm text-muted-foreground">Contributions</p><p className="text-2xl font-bold">{total}</p></div>
             </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-700 rounded-full"><MapPin className="w-5 h-5"/></div>
                <div><p className="text-sm text-muted-foreground">Zone active</p><p className="text-xl font-bold text-orange-600">{topZone}</p></div>
             </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Répartition par thèmes</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] px-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={themeData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                {themeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle"/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}