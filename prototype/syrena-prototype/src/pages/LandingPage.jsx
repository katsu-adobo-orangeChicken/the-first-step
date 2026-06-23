import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import HowItWorks from '../components/HowItWorks'
import CareerTracks from '../components/CareerTracks'
import Personas from '../components/Personas'
import Stats from '../components/Stats'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <CareerTracks />
        <Personas />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
