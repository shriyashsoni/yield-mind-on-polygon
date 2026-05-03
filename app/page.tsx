"use client"

import { ParticleCanvas } from "@/components/landing/particle-canvas"
import { SiteNav } from "@/components/landing/site-nav"
import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { StatsSection } from "@/components/landing/stats-section"
import { Wave6Section } from "@/components/landing/wave6-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { PolygonSection } from "@/components/landing/polygon-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"
import { useScrollReveal } from "@/components/landing/use-reveal"

export default function HomePage() {
  useScrollReveal()

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ParticleCanvas />
      <SiteNav />

      <div className="relative z-10">
        <Hero />
        <Marquee />
        <StatsSection />
        <Wave6Section />
        <BenefitsSection />
        <HowItWorks />
        <PolygonSection />
        <FinalCTA />
        <SiteFooter />
      </div>
    </main>
  )
}
