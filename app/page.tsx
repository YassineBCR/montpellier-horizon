import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { StatsBanner } from "@/components/stats-banner"
import { IdeasFeed } from "@/components/ideas-feed"
import { ProposalForm } from "@/components/proposal-form"
import { AnalysisSection } from "@/components/analysis-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsBanner />
        <IdeasFeed />
        <ProposalForm />
        <AnalysisSection />
        <ManifestoSection />
      </main>
      <SiteFooter />
    </div>
  )
}
