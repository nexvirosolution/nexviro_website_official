import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import { setLenis } from "./lib/lenis";
import About from "./components/About";
import { CursorGlow, ScrollProgress } from "./components/Fx";
import Marquee from "./components/Marquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 }, // nav links glide to their section, clear of the navbar
    });
    setLenis(lenis);

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <Marquee />
        <section id="service">
          <Services />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="team">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;