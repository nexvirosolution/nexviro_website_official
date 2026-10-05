import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import "./scramble.css";

const GLYPHS = "!<>-_/[]{}=+*^?#01";

// Heading that "decodes" from random characters when it scrolls into view.
function ScrambleText({ text, as: Tag = "span", className = "", duration = 900 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        s += c === " " || i < revealed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(p < 1 ? s : text);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, duration]);

  return (
    <Tag ref={ref} className={`scramble ${className}`} aria-label={text}>
      {/* invisible copy keeps the layout steady while letters change */}
      <span className="scramble_ghost">{text}</span>
      <span className="scramble_live" aria-hidden="true">
        {out}
      </span>
    </Tag>
  );
}

export default ScrambleText;