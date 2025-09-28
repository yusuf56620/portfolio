import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "skills", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMenu();
  };

  const navItems = [
    { id: "hero", label: "About Me", icon: "👨‍💻" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📩" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => scrollToSection("hero")}>
          <FaCode className="logo-icon" />
          <span className="logo-text">
            Yusuf<span className="logo-dot">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                  {activeSection === item.id && <div className="nav-indicator" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <div className="logo mobile-logo">
                <FaCode className="logo-icon" />
                <span className="logo-text">
                  Yusuf<span className="logo-dot">.</span>
                </span>
              </div>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item, i) => (
                <li
                  key={item.id}
                  style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`mobile-nav-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-footer">
              <p>Let’s build amazing projects together!</p>
            </div>
          </div>
        </nav>

        {isOpen && <div className="mobile-nav-overlay" onClick={closeMenu} />}
      </div>
    </header>
  );
};

export default Header;
