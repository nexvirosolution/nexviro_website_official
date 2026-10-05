import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { abouts } from "../../data/content";
import ScrambleText from "../ScrambleText";
import "./about.css";

function TeamCard({ about, index }) {
  const Icon = about.social.icon;
  const reduce = useReducedMotion();

  // pointer position inside the card, 0..1
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });
  const glare = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(45, 227, 0, 0.3), transparent 55%)`,
  );

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      className="team_card"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.2, 0.7, 0.1, 1], delay: index * 0.12 }}
    >
      <motion.div
        className="team_tilt"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="team_photo">
          <img src={about.img} alt={about.name} loading="lazy" draggable={false} />
        </div>

        <motion.div className="team_glare" style={{ background: glare }} />
        <span className="team_scan" />
        <span className="team_corner tl" />
        <span className="team_corner tr" />
        <span className="team_corner bl" />
        <span className="team_corner br" />

        <div className="team_info">
          <h3>{about.name}</h3>
          <p className="team_role">{about.designation}</p>
          <div className="team_social">
            <Icon fontSize="small" />
            <span>{about.social.link}</span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function About() {
  return (
    <div className="about section">
      <ScrambleText as="h2" className="section-title" text="The team" />

      <div className="team_grid">
        {abouts.map((about, i) => (
          <TeamCard key={about.id} about={about} index={i} />
        ))}
      </div>
    </div>
  );
}

export default About;