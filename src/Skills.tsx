import React, { useState, useEffect } from "react";
import "./Skills.css";

interface Skill {
  name: string;
  img: string;
  category: string;
  level: number;
  description: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);

  const skills: Skill[] = [
    // Frontend
  
    
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "frontend", level: 80, description: "ES6+, DOM manipulation, Async programming" },
    { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "frontend", level: 50, description: "Type safety, interfaces, generics" },
    
    
    // Backend
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "backend", level: 50, description: "Server-side JavaScript, API development" },
    { name: "ASP.NET", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", category: "backend", level: 75, description: "Web API, MVC pattern, Entity Framework" },
    { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", category: "backend", level: 85, description: "OOP, LINQ, Async/Await patterns" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "backend", level: 70, description: "Web development, scripting, data analysis" },
    { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "backend", level: 80, description: "Laravel, server-side scripting" },
    
    // Database
    { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "database", level: 75, description: "Database design, optimization, queries" },
    { name: "SQL Server", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", category: "database", level: 75, description: "T-SQL, stored procedures, indexing" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "database", level: 50, description: "NoSQL, aggregation, document modeling" },
    
    // Tools
   
    { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "tools", level: 50, description: "Command line, server administration" },
    { name: "Unity", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", category: "tools", level: 70, description: "Game development, C# scripting" }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: '🚀' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'tools', name: 'Tools', icon: '🛠️' }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName && !visibleSkills.includes(skillName)) {
              setVisibleSkills(prev => [...prev, skillName]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Reset visible skills when category changes
    setVisibleSkills([]);
    
    // Observe skill cards with delay
    setTimeout(() => {
      const skillElements = document.querySelectorAll('[data-skill]');
      skillElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="skills-container">
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <span className="category-count">
              {category.id === 'all' 
                ? skills.length 
                : skills.filter(s => s.category === category.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${activeCategory}`}
            data-skill={skill.name}
            className={`skill-card ${visibleSkills.includes(skill.name) ? 'visible' : ''}`}
            style={{ 
              '--level': `${skill.level}%`,
              animationDelay: `${index * 0.1}s`
            } as React.CSSProperties}
          >
            <div className="skill-icon-wrapper">
              <img src={skill.img} alt={skill.name} className="skill-icon" />
            </div>
            
            <div className="skill-info">
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-level-badge">{skill.level}%</div>
              <p className="skill-description">{skill.description}</p>
              
              <div className="skill-level-bar">
                <div 
                  className="skill-level-fill" 
                  style={{ '--level': `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;