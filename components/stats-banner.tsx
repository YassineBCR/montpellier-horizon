import { FileText, Users, LayoutGrid } from "lucide-react"

const stats = [
  {
    label: "Contributions",
    value: "847",
    icon: FileText,
  },
  {
    label: "Citoyens engagés",
    value: "1 243",
    icon: Users,
  },
  {
    label: "Thématiques analysées",
    value: "6",
    icon: LayoutGrid,
  },
]

export function StatsBanner() {
  return (
    <section className="border-y border-border bg-secondary px-4 py-12 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <span className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {stat.value}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
