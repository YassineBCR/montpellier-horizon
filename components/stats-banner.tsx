// components/stats-banner.tsx
import { Users, Lightbulb, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsBanner() {
  const stats = [
    { label: "Citoyens engagés", value: "2,450+", icon: Users, color: "text-blue-500" },
    { label: "Idées proposées", value: "142", icon: Lightbulb, color: "text-yellow-500" },
    { label: "Projets validés", value: "89", icon: CheckCircle2, color: "text-green-500" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-none bg-transparent md:bg-background/50 md:border md:shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`p-3 rounded-full bg-background border shadow-sm ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}