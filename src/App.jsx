import "./App.css";
import About from "./components/About/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services/index.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
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

      <Footer />
    </div>
  );
}

export default App;
