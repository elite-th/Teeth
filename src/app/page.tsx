"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/lumina/CustomCursor";
import ScrollProgress from "@/components/lumina/ScrollProgress";
import Header from "@/components/lumina/Header";
import Hero from "@/components/lumina/Hero";
import TrustBar from "@/components/lumina/TrustBar";
import About from "@/components/lumina/About";
import Services from "@/components/lumina/Services";
import Process from "@/components/lumina/Process";
import Gallery from "@/components/lumina/Gallery";
import Testimonials from "@/components/lumina/Testimonials";
import Booking from "@/components/lumina/Booking";
import Footer from "@/components/lumina/Footer";
import MobileStickyCta from "@/components/lumina/MobileStickyCta";

export default function Home() {
  // Prevent auto-scroll on page load (e.g., browser restoring scroll position)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
