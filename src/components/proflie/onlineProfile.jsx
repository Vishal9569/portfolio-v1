import React from 'react';
import './profile.css';

const profiles = [
    {
        name: 'LeetCode',
        link: 'https://leetcode.com/u/Vishal-210545/#',
        description: '160+ problems solved',
    },
    {
        name: 'GeeksforGeeks',
        link: 'https://www.geeksforgeeks.org/user/vk965431/#',
        description: '70+ problems solved',
    },
    {
        name: 'CodeChef',
        link: 'https://www.codechef.com/users/vk965431',
        description: '100+ problems solved',
    },
    {
        name: 'GitHub',
        link: 'https://github.com/Vishal9569', // Replace with actual GitHub profile
        description: 'Open source contributions and projects',
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/vishal-kumar-kushwaha-431484236/',
        description: 'Professional profile and achievements',
    },
];

export default function Profiles() {
    return (
        <section className="profiles-section" id="profiles">
            <h2 className="section-title">Online Profiles</h2>
            <div className="profiles-list">
                <div className="profile-item">
                    <span className="profile-text">GitHub</span>
                    <a
                        className="profile-link"
                        href="https://github.com/Vishal9569"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View
                    </a>
                </div>
                <div className="profile-item">
                    <span className="profile-text">LinkedIn</span>
                    <a
                        className="profile-link"
                        href="https://www.linkedin.com/in/vishal-kumar-kushwaha-431484236/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View
                    </a>
                </div>
                <div className="profile-item">
                    <span className="profile-text">LeetCode: 160+ problems</span>
                    <a
                        className="profile-link"
                        href="https://leetcode.com/u/Vishal-210545/#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View
                    </a>
                </div>
                <div className="profile-item">
                    <span className="profile-text">GFG: 70+ problems</span>
                    <a
                        className="profile-link"
                        href="https://www.geeksforgeeks.org/user/vk965431/#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View
                    </a>
                </div>
                <div className="profile-item">
                    <span className="profile-text">CodeChef: 100+ problems</span>
                    <a
                        className="profile-link"
                        href="https://www.codechef.com/users/vk965431"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View
                    </a>
                </div>
            </div>
        </section>

    );
}
