"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"

const themeData = [
  { name: "Lieux de culte", value: 28, color: "hsl(162, 92%, 20%)" },
  { name: "Carrés confessionnels", value: 22, color: "hsl(43, 74%, 50%)" },
  { name: "Lutte contre l'islamophobie", value: 18, color: "hsl(230, 60%, 55%)" },
  { name: "Éducation", value: 15, color: "hsl(200, 70%, 50%)" },
  { name: "Commerce local", value: 10, color: "hsl(25, 87%, 55%)" },
  { name: "Jeunesse", value: 7, color: "hsl(340, 65%, 55%)" },
]

const priorities = [
  "Création de carrés confessionnels dans les cimetières municipaux",
  "Agrandissement et mise aux normes des salles de prière existantes",
  "Observatoire local de lutte contre l'islamophobie",
  "Programme de soutien scolaire dans les quartiers prioritaires",
  "Espaces polyvalents pour la jeunesse dans chaque quartier",
  "Marché local hebdomadaire de produits halal et bio",
  "Médiation interculturelle dans les services publics",
  "Accompagnement juridique pour les victimes de discriminations",
  "Aide à la création d'entreprises dans les quartiers",
  "Ateliers numériques pour les jeunes de 12 à 25 ans",
]

export function AnalysisSection() {
  return (
    <section id="consultations" className="bg-background px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Synthèse pour les candidats
          </h2>
          <p className="mt-2 text-muted-foreground">
            Données agrégées et anonymisées, prêtes à être présentées aux décideurs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              Répartition par thématique
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={themeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {themeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Part"]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {themeData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Priorities */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">
              10 Priorités Citoyennes
            </h3>
            <ol className="flex flex-col gap-3">
              {priorities.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Badge
                    variant="outline"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-primary/30 bg-primary/5 text-xs font-bold text-primary"
                  >
                    {i + 1}
                  </Badge>
                  <span className="text-sm leading-relaxed text-card-foreground">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
