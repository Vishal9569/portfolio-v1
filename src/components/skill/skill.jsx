import React from 'react';
import './skill.css';

export default function Skills() {
    return (
        <section className="skills-section" id="skills">
            <h2 className="skills-title">Skills & Technologies</h2>
            <div className="skills-grid">

                {/* MERN Stack */}
                <div className="skill-card">
                    <h3 className="skill-category">MERN Stack</h3>
                    <ul className="skill-list">
                        <li>MongoDB</li>
                        <li>Express.js</li>
                        <li>React.</li>
                        <li>Node.js</li>
                    </ul>
                </div>

                {/* Languages & DSA */}
                <div className="skill-card">
                    <h3 className="skill-category">Languages & DSA</h3>
                    <ul className="skill-list">
                        <li>JavaScript <a href="#" className="cert-badge">Certified</a></li>
                        <li>C++ <a href="#" className="cert-badge">Problem Solving</a></li>
                        <li>Java</li>
                        <li>DSA</li>
                    </ul>
                </div>

                {/* Frameworks & Tools */}
                <div className="skill-card">
                    <h3 className="skill-category">Frameworks & Tools</h3>
                    <ul className="skill-list">
                        <li>Bootstrap</li>
                        <li>Git</li>
                        <li>GitHub</li>
                        <li>Tailwind CSS</li>
                    </ul>
                </div>


            </div>
        </section>
    );
}
