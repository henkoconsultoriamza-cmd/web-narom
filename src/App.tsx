import Header from "./components/Header"
import Hero from "./components/Hero"
import PromosBanner from "./components/PromosBanner"
import BrandsSection from "./components/BrandsSection"
import Top10Banner from "./components/Top10Banner"
import AboutSection from "./components/AboutSection"
import TeamSection from "./components/TeamSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromosBanner />
        <BrandsSection />
        <Top10Banner />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
