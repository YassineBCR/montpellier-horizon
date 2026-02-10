import { IdeasFeed } from "@/components/ideas-feed"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AllProposalsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-gray-50/50">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Toutes les Idées</h1>
            <p className="text-lg text-muted-foreground">
              Découvrez l'ensemble des contributions citoyennes, votez pour vos favorites et participez au débat démocratique.
            </p>
          </div>
          {/* On appelle le feed sans limite pour tout afficher */}
          <IdeasFeed />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}