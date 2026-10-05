import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./hero.css";

// three.js loads after the text, so the headline shows instantly
const Scene = lazy(() => import("./Scene"));

const lines = ["We build,", "market and scale", "digital products."];
const ease = [0.2, 0.7, 0.1, 1];

function Hero() {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  // pause the 3D scene when the hero is off-screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero" ref={ref}>
      <div className="hero_canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene active={inView} />
        </Suspense>
      </div>

      <div className="hero_scroll" aria-hidden="true">
        <span className="hero_scroll_line" />
        Scroll
      </div>

      <div className="hero_content">
        <h1 className="hero_title">
          {lines.map((line, i) => (
            <span className="hero_line" key={line}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero_sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          From idea to market-ready product, we help startups launch and grow.
        </motion.p>

        <motion.div
          className="hero_actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          <a className="btn" href="#contact">
            Start your project
          </a>
          <a className="link" href="#projects">
            See our work
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;