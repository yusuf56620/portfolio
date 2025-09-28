import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import "./index.css";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        {/* Hero / Slider */}
        <section id="hero" className="section">
          <Slider />
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <h2 className="title">About Me</h2>
          <div className="card">
            <p>
              Hi, I’m Yusuf 👋 I’m a passionate developer who loves building modern
              web applications with React, TypeScript, and creative UI.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="title">Skills ⚡</h2>
          <div className="card">
            <ul>
              <li>React / TypeScript</li>
              <li>TailwindCSS / Advanced CSS</li>
              <li>Node.js / Express</li>
              <li>Git / GitHub / Vercel</li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="title">Projects 🚀</h2>
          <div className="card">
            <p>Some of my featured projects will be shown here.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="title">Contact 📬</h2>
          <div className="card">
            <p>
              Let’s connect! You can reach me via{" "}
              <a href="yusufkapukaraa@gmail.com">email</a> or GitHub.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
