import { projects, services } from "../../data/content";
import "./marquee.css";

// Built from your own data: service names + project tags.
const words = [
  ...new Set([...services.map((s) => s.name), ...projects.flatMap((p) => Object.values(p.tags))]),
];

function Row() {
  return (
    <ul className="marquee_row">
      {words.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ul>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee_track">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}

export default Marquee;