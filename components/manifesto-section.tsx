import { Shield, Eye, Scale } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Neutralité",
    description:
      "Cette plateforme n'est affiliée à aucun parti politique. Elle est un outil citoyen au service de la communauté.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Toutes les données collectées sont anonymisées et publiquement accessibles. Aucune information personnelle n'est partagée.",
  },
  {
    icon: Scale,
    title: "Équité",
    description:
      "Chaque voix compte. Les propositions sont traitées sans distinction de quartier, d'âge ou de statut social.",
  },
]

export function ManifestoSection() {
  return (
    <section id="manifeste" className="bg-secondary px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Notre manifeste</h2>
          <p className="mt-2 text-muted-foreground">
            Les valeurs qui guident cette démarche citoyenne.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
