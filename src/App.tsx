import  { useEffect, useState } from "react";
import Header from "./Header";
import Skills from "./Skills";
import Slider from "./Slider";
import "./index.css";
import "./App.css";
import { FaGithub, FaInstagram, FaLinkedin, FaRocket, FaEnvelope } from "react-icons/fa";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    setTimeout(() => setIsLoaded(true), 500);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={`app-wrapper ${isLoaded ? "loaded" : ""}`}>
      <Header />

      <main>
        {/* === Hero Section === */}
        <section id="hero" className="section hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <FaRocket className="hero-badge-icon" />
              <span>Fullstack Developer</span>
            </div>

            <h1 className="hero-title">
              Hello, I'm{" "}
              <span className="tech-name">Yusuf</span>
            </h1>

            <p className="hero-subtitle">
              A graduate of <strong>Karabük University</strong> in Computer
              Programming, passionate about building modern and user-friendly
              digital experiences. I love creating clean, scalable, and
              innovative web solutions that not only solve real-world problems
              but also make life easier. My biggest motivation is contributing
              to technology that shapes the future.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>

            <div className="hero-actions">
              <a className="btn-primary" href="#projects">
                <FaRocket className="btn-icon" />
                Explore My Work
              </a>
            </div>

            <div className="social-links hero-social">
              <a
                href="https://github.com/yusuf56620"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-link github"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/yusuf-kapukara-aa17ab363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app /"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-link linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/ysufkp._"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:yusufkapukara@gmail.com"
                aria-label="Email"
                className="social-link email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="profile-container">
              <div className="profile-glow"></div>
              <img
                src="/src/assets/fotograf.jpg"
                alt="Yusuf - Fullstack Developer"
                className="profile-img"
              />
              <div className="profile-ring"></div>
            </div>
          </div>
        </section>

        {/* === Skills Section === */}
        <section id="skills" className="section skills-section">
          <div className="section-header">
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-subtitle">
              The tools and technologies I work with
            </p>
          </div>
          <Skills />
        </section>

        {/* === Projects Section === */}
        <section id="projects" className="section projects-section">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              A showcase of some of my recent work
            </p>
          </div>
          <Slider />
        </section>

        {/* === Contact Section === */}
        <section id="contact" className="section contact-section">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Interested in working together? Let's connect!
            </p>
          </div>
        </section>
      </main>

      {/* === Footer === */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Yusuf. All rights reserved.</p>
          <p>Built with ❤️ using React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

export default App;