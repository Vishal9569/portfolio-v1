import React, { Suspense, useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './Hero.css';

function BinaryStream() {
    const characters = useMemo(() => Array.from({ length: 2000 }, () => (Math.random() > 0.5 ? '1' : '0')), []);
    const positions = useMemo(
        () => Array.from({ length: characters.length }, () => [
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 50
        ]),
        [characters.length]
    );

    return (
        <>
            {characters.map((char, idx) => (
                <Float
                    key={idx}
                    speed={Math.random() * 2 + 1}
                    rotationIntensity={Math.random() * 1.5 + 0.5}
                    floatIntensity={Math.random() * 2 + 1}
                >
                    <Text
                        position={positions[idx]}
                        fontSize={0.45}
                        color="#00ff99"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/FiraCode-Regular.ttf"
                        outlineWidth={0.002}
                        outlineColor="#004d33"
                    >
                        {char}
                    </Text>
                </Float>
            ))}
        </>
    );
}

function DecryptionText({ targetText, delay = 0, className }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let animationFrame;
        let startTime = null;
        const decryptionSpeed = 120;
        const initialScrambleDuration = targetText.length * 40;

        const generateBinaryString = (length) => {
            return Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
        };

        const animateDecryption = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < initialScrambleDuration) {
                setDisplayedText(generateBinaryString(targetText.length));
            } else {
                const revealCount = Math.min(
                    Math.floor((elapsed - initialScrambleDuration) / decryptionSpeed),
                    targetText.length
                );
                const revealed = targetText.slice(0, revealCount);
                const scrambled = generateBinaryString(targetText.length - revealCount);
                setDisplayedText(revealed + scrambled);

                if (revealCount >= targetText.length) return;
            }
            animationFrame = requestAnimationFrame(animateDecryption);
        };

        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animateDecryption);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrame);
        };
    }, [targetText, delay]);

    return <div className={className}>{displayedText}</div>;
}

export default function Hero() {
    const [reveal, setReveal] = useState(false);
    const infoRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => setReveal(true), 2000);
        return () => clearTimeout(timeout);
    }, []);

    const handleScrollToProjects = (e) => {
        e.preventDefault();
        const projects = document.querySelector('#projects');
        if (projects) {
            projects.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section scrollable">
            <Canvas camera={{ position: [0, 0, 20] }} style={{ height: '100vh', width: '100vw', background: '#000' }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.9} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                <Suspense fallback={null}>
                    <BinaryStream />
                </Suspense>
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
                </EffectComposer>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            <div className="overlay">
                {!reveal ? (
                    <>
                        <div className="left-card">
                            <pre>
                                <code>
                                    {'// Developer Intro\n'}
                                    {'const name = "Vishal Kumar";\n'}
                                    {'const role = "Full Stack Web & Software Developer";\n'}
                                    {'const techStack = ["React", "Node.js", "Three.js", "TypeScript", "TailwindCSS"];\n'}
                                    {'const location = "India";'}
                                </code>
                            </pre>
                        </div>
                        <button className="reveal-btn" onClick={() => setReveal(true)}>
                            Click to Decrypt Profile
                        </button>
                    </>
                ) : (
                    <div className="info-card fade-in" ref={infoRef}>
                        <DecryptionText targetText="Hello, I am" delay={0} className="greeting large-text" />
                        <DecryptionText targetText="Vishal Kumar" delay={1200} className="nameHeader extra-large-text" />
                        <DecryptionText targetText="Full Stack Web & Software Developer" delay={2500} className="titleHeader" />
                        <p className="description">
                            A <strong>Full Stack Software Developer</strong> building scalable, secure, and blazing-fast apps using <strong>React</strong>, <strong>Node.js</strong>, <strong>TypeScript</strong>, <strong>Three.js</strong>, and more.
                        </p>
                        <a href="#projects" className="hero-link" onClick={handleScrollToProjects}>Explore My Projects →</a>
                    </div>
                )}
            </div>
        </section>
    );
}
