import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Ouvrages from "@/components/landing/Ouvrages";
import Afrique from "@/components/landing/Afrique";
import Vision from "@/components/landing/Vision";
import Footer from "@/components/landing/Footer"; // Nous allons le créer ci-dessous

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <Ouvrages />
      <Afrique />
      <Vision />
      <Footer />
    </>
  );
}