export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">MH</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Montpellier Horizon</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#accueil" className="transition-colors hover:text-foreground">
              Accueil
            </a>
            <a href="#propositions" className="transition-colors hover:text-foreground">
              Propositions
            </a>
            <a href="#consultations" className="transition-colors hover:text-foreground">
              Synthèse
            </a>
            <a href="#manifeste" className="transition-colors hover:text-foreground">
              Manifeste
            </a>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Montpellier Horizon est une initiative citoyenne indépendante et non-partisane. Cette
            plateforme ne représente aucun parti politique, association cultuelle ou candidat.
            Les données collectées sont anonymisées et utilisées uniquement à des fins de
            synthèse citoyenne.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {"© 2026 Montpellier Horizon. Tous droits réservés. "}
            <a href="#" className="underline transition-colors hover:text-foreground">
              Mentions légales
            </a>
            {" · "}
            <a href="#" className="underline transition-colors hover:text-foreground">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
