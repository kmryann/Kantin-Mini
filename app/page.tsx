import { NavBar } from "@/components/nav-bar"
import Hero from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pb-20 md:pb-0" style={{ paddingBottom: "max(5rem, calc(env(safe-area-inset-bottom) + 4rem))" }}>
        <Hero />
        <div id="menu">
          <MenuSection />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
