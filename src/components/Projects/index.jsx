import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { projects } from "../../data/content";
import ScrambleText from "../ScrambleText";
import "./projects.css";

function Projects() {
  const n = projects.length;
  const [index, setIndex] = useState(0);
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((dir) => setIndex((i) => (i + dir + n) % n), [n]);

  // shortest way round the loop: 0 = centre card, -1 = left, 1 = right
  const half = Math.floor(n / 2);
  const offsetOf = (i) => ((i - index + n + half) % n) - half;

  const step = narrow ? 80 : 98; // % of card width between cards
  const tilt = narrow ? 24 : 30; // degrees

  const onPanEnd = (_, info) => {
    if (info.offset.x < -50 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <div className="projects section">
      <div className="projects_head">
        <ScrambleText as="h2" className="section-title" text="Selected work" />
        <div className="carousel_controls">
          <button className="carousel_btn" onClick={() => go(-1)} aria-label="Previous project">
            <ArrowBackIcon />
          </button>
          <span className="carousel_count">
            {index + 1} / {n}
          </span>
          <button className="carousel_btn" onClick={() => go(1)} aria-label="Next project">
            <ArrowForwardIcon />
          </button>
        </div>
      </div>

      <motion.div
        className="carousel_stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPanEnd={onPanEnd}
      >
        {projects.map((project, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          return (
            <div
              key={project.id}
              className="carousel_slot"
              style={{ zIndex: 10 - abs, pointerEvents: abs > 1 ? "none" : undefined }}
            >
              <motion.article
                className={`carousel_card ${off === 0 ? "is_active" : ""}`}
                animate={{
                  x: `${off * step}%`,
                  z: -abs * 160,
                  rotateY: -off * tilt,
                  scale: 1 - abs * 0.1,
                  opacity: abs > 1 ? 0 : abs === 1 ? 0.55 : 1,
                }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 130, damping: 20 }}
                onClick={() => off !== 0 && setIndex(i)}
                aria-hidden={abs > 0}
              >
                <div className="carousel_img">
                  <img src={project.img} alt={project.name} draggable={false} loading="lazy" />
                </div>
                <div className="carousel_detail">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project_tags">
                    {Object.values(project.tags).map((tag) => (
                      <span key={tag} className="project_single_tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </div>
          );
        })}
      </motion.div>

      <div className="carousel_dots">
        {projects.map((project, i) => (
          <button
            key={project.id}
            className={`carousel_dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show ${project.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;