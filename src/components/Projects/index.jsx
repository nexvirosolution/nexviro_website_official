import "./projects.css";
import { projects } from "../../data/content";
import { useRef } from "react";

function Projects() {
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = sliderRef.current;

    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const slider = sliderRef.current;

    if (!slider.isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5;

    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    sliderRef.current.isDown = false;
  };

  const handleMouseLeave = () => {
    sliderRef.current.isDown = false;
  };

  return (
    <div className="projects_container">
      <h1>FEATURED PROJECTS</h1>

      <div
        ref={sliderRef}
        className="projects_cards"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project) => {
          return (
            <div key={project.id} className="projects_card">
              <div className="projects_img">
                <img src={project.img} alt={project.name} />
              </div>

              <div className="projects_detail">
                <h2>{project.name}</h2>

                <p>{project.description}</p>

                <div className="project_tags">
                  {Object.values(project.tags).map((tag) => (
                    <span key={tag} className="project_single_tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
