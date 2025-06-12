import React from 'react';
import './Project.css';

const projects = [
    {
        title: 'SkillScope Assessment-Portal',
        description:
            'A full-stack web platform for technical assessments. Includes coding questions, MCQs, and project-based assignments with real-time feedback after submission.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        live: 'https://skill-scope-web-application.vercel.app/',
        repo: 'https://github.com/Vishal9569/SkillScope-Web-Application',
    }
    ,
    {
        title: 'FoodieCart Web App',
        description:
            'A responsive frontend food ordering app with features like add-to-cart, order placement, and food customization. Built for UI/UX practice and state management fundamentals.',
        tech: ['React', 'CSS Modules', 'Context API', 'Vite'],
        live: 'https://foodapp-inky-xi.vercel.app/',
        repo: 'https://github.com/Vishal9569/foodapp',
    }
    ,
    {
        title: 'Personal Portfolio Website',
        description:
            'A modern, responsive portfolio site built with React to showcase projects, skills, and contact info. Includes smooth scrolling, working contact form (Formspree), and reusable components.',
        tech: ['React', 'Formspree', 'Tailwind CSS', 'Framer Motion'],
        live: 'https://yourportfolio.vercel.app', // Replace with your deployed portfolio URL
        repo: 'https://github.com/yourusername/portfolio', // Replace with your GitHub repo
    }

];

export default function Projects() {
    return (
        <section className="projects-section" id="projects">
            <h2 className="projects-title">Featured Projects</h2>
            <div className="projects-grid">
                {projects.map((proj, idx) => (
                    <article key={idx} className="project-card">
                        <header>
                            <h3 className="project-title">{proj.title}</h3>
                        </header>
                        <p className="project-description">{proj.description}</p>
                        <ul className="tech-list">
                            {proj.tech.map((tech, index) => (
                                <li key={index} className="tech-badge">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                        <div className="project-links">
                            <a
                                href={proj.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="live-btn"
                            >
                                🔗 Live
                            </a>
                            <a
                                href={proj.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="repo-btn"
                            >
                                💻 Code
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
