import { useState, useEffect, useRef } from "react";
import { FaGithub, FaCode, FaStar, FaEye } from "react-icons/fa";
import "./Slider.css";

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
        "CineFlow takes the experience of watching movies with friends to the next level with real-time chat, synchronized video playback, and user rooms. Using WebSocket technology, it ensures perfect synchronization.",
      image: "/src/assets/6.png",
      status: "completed",
      featured: true,
      stats: { stars: 45, views: 1200, commits: 128 },
    },
    {
      id: "ecommerce",
      name: "E-Commerce Platform",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      description:
        "A modern and user-friendly e-commerce site offering a smooth shopping experience.",
      longDescription:
        "A fully featured e-commerce platform including product management, cart system, payment integration, user management, and an admin panel. It comes with a responsive design and PWA support.",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80",
     
      status: "completed",
      featured: true,
      stats: { stars: 78, views: 2100, commits: 234 },
    },
    {
      id: "weather",
      name: "WeatherApp Advanced",
      tech: ["React", "TypeScript", "OpenWeather API", "PWA"],
      description:
        "A user-friendly weather app delivering real-time weather data to help with daily planning.",
      longDescription:
        "A progressive web app featuring 7-day forecasts, real-time alerts, location-based suggestions, and offline capabilities.",
      image: "/src/assets/1.png",
      github: "https://github.com/username/weather-advanced",
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
      image: "/src/assets/3.png",
      status: "planned",
      featured: true,
      stats: { stars: 0, views: 0, commits: 0 },
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, projects.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );

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

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return "Unknown";
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
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="slide-overlay" />

              {/* Project Status Badge */}
              <div
                className="status-badge"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {getStatusText(project.status)}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )}

              {/* Project Content */}
              <div className="slide-content">
                <div className="project-header">
                  <h2 className="project-title">{project.name}</h2>
                  <div className="project-stats">
                    <div className="stat">
                      <FaStar className="stat-icon" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="stat">
                      <FaEye className="stat-icon" />
                      <span>{project.stats.views}</span>
                    </div>
                    <div className="stat">
                      <FaCode className="stat-icon" />
                      <span>{project.stats.commits}</span>
                    </div>
                  </div>
                </div>

                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
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

        {/* Navigation Controls */}
        <div className="slider-controls">
          <button className="slider-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="slider-btn next" onClick={nextSlide}>
            ❯
          </button>
        </div>

        {/* Play/Pause Button */}
        <button
          className="play-pause-btn"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          >
            <span className="indicator-progress" />
          </button>
        ))}
      </div>

      {/* Project Thumbnails */}
      <div className="project-thumbnails">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="thumbnail-overlay">
              <h4>{project.name}</h4>
              <span className="thumbnail-tech">{project.tech[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <div className="modal-header">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="modal-image"
              />
              <div className="modal-info">
                <h2>{selectedProject.name}</h2>
                <div className="modal-stats">
                  {Object.entries(selectedProject.stats).map(
                    ([key, value]) => (
                      <div key={key} className="modal-stat">
                        <span className="stat-label">{key}</span>
                        <span className="stat-value">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-tech">
                <h3>Technologies</h3>
                <div className="tech-list">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-description">
                <h3>Project Description</h3>
                <p>{selectedProject.longDescription}</p>
              </div>

              <div className="modal-actions">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn github"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
