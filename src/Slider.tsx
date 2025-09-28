import { useState, useEffect, useRef } from "react";
import { FaGithub, FaCode, FaStar, FaEye } from "react-icons/fa";
import "./Slider.css";

// 🔹 Görseller
import img1 from "./assets/1.png";
import img3 from "./assets/3.png";
import img6 from "./assets/6.png";

interface Project {
  id: string;
  name: string;
  tech: string[];
  description: string;
  longDescription: string;
  image: string;
  github?: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  stats: {
    stars: number;
    views: number;
    commits: number;
  };
}

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const projects: Project[] = [
    {
      id: "cineflow",
      name: "CINEFLOW",
      tech: ["PHP", "MySQL", "JavaScript", "WebSocket"],
      description:
        "An interactive platform that lets you watch movies in sync with your friends.",
      longDescription:
        "CineFlow takes the experience of watching movies with friends to the next level with real-time chat, synchronized video playback, and user rooms.",
      image: img6,
      status: "completed",
      featured: true,
      stats: { stars: 45, views: 1200, commits: 128 },
    },
    {
      id: "weather",
      name: "WeatherApp Advanced",
      tech: ["React", "TypeScript", "OpenWeather API", "PWA"],
      description:
        "A user-friendly weather app delivering real-time weather data.",
      longDescription:
        "A progressive web app featuring 7-day forecasts, real-time alerts, location-based suggestions, and offline capabilities.",
      image: img1,
      status: "completed",
      featured: false,
      stats: { stars: 23, views: 567, commits: 93 },
    },
    {
      id: "ai-assistant",
      name: "AI Code Assistant",
      tech: ["Python", "FastAPI", "OpenAI API", "React"],
      description:
        "An AI-powered assistant for developers to write and debug code.",
      longDescription:
        "Using machine learning and natural language processing, this assistant suggests code, helps debug, and improves overall code quality.",
      image: img3,
      status: "planned",
      featured: true,
      stats: { stars: 0, views: 0, commits: 0 },
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === projects.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, projects.length]);

  const goToSlide = (i: number) => setCurrentIndex(i);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "planned":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="projects-container">
      {/* Main Slider */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`slide ${i === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="slide-overlay" />

              <div
                className="status-badge"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {project.status}
              </div>

              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )}

              <div className="slide-content">
                <div className="project-header">
                  <h2>{project.name}</h2>
                  <div className="project-stats">
                    <div className="stat">
                      <FaStar /> {project.stats.stars}
                    </div>
                    <div className="stat">
                      <FaEye /> {project.stats.views}
                    </div>
                    <div className="stat">
                      <FaCode /> {project.stats.commits}
                    </div>
                  </div>
                </div>

                <div className="tech-stack">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-actions">
                  <button
                    className="btn-detail"
                    onClick={() => setSelectedProject(project)}
                  >
                    <FaEye /> Details
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-github"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="slider-controls">
          <button className="slider-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="slider-btn next" onClick={nextSlide}>
            ❯
          </button>
        </div>

        <button
          className="play-pause-btn"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* Indicators */}
      <div className="slide-indicators">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="project-thumbnails">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`thumbnail ${i === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(i)}
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="thumbnail-overlay">
              <h4>{project.name}</h4>
              <span>{project.tech[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            <h2>{selectedProject.name}</h2>
            <img src={selectedProject.image} alt={selectedProject.name} />
            <p>{selectedProject.longDescription}</p>
            <div className="tech-list">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub /> View on GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
