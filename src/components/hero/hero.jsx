import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './Hero.css';

function isMobile() {
    return window.innerWidth <= 768;
}

function BinaryStream({ count = 200 }) {
    const characters = useMemo(() =>
        Array.from({ length: count }, () => (Math.random() > 0.5 ? '1' : '0')), [count]);

    const positions = useMemo(() =>
        Array.from({ length: count }, () => [
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 50
        ]), [count]);

    return characters.map((char, idx) => (
        <Float
            key={idx}
            speed={1 + Math.random()}
            rotationIntensity={0.5 + Math.random()}
            floatIntensity={1 + Math.random()}
        >
            <Text
                position={positions[idx]}
                fontSize={isMobile() ? 0.3 : 0.45}
                color="#00ff99"
                anchorX="center"
                anchorY="middle"
                font="/fonts/FiraCode-Regular.ttf"
                outlineWidth={0.0015}
                outlineColor="#004d33"
                maxWidth={2}
                letterSpacing={-0.01}
                frustumCulled
            >
                {char}
            </Text>
        </Float>
    ));
}

function AutoRotateStars() {
    const { scene } = useThree();
    useFrame((_, delta) => {
        scene.rotation.y += delta * 0.02;
    });
    return null;
}

function DecryptionText({ targetText, delay = 0, className }) {
    const [text, setText] = useState('');

    useEffect(() => {
        let raf;
        let start = null;
        const speed = 120;
        const scrambleTime = targetText.length * 40;

        const generateBinary = len =>
            Array.from({ length: len }, () => (Math.random() > 0.5 ? '1' : '0')).join('');

        const decrypt = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;

            if (elapsed < scrambleTime) {
                setText(generateBinary(targetText.length));
            } else {
                const revealCount = Math.min(
                    Math.floor((elapsed - scrambleTime) / speed),
                    targetText.length
                );
                const revealed = targetText.slice(0, revealCount);
                const scrambled = generateBinary(targetText.length - revealCount);
                setText(revealed + scrambled);
                if (revealCount >= targetText.length) return;
            }

            raf = requestAnimationFrame(decrypt);
        };

        const timeout = setTimeout(() => {
            raf = requestAnimationFrame(decrypt);
        }, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
        };
    }, [targetText, delay]);

    return <div className={className}>{text}</div>;
}

export default function Hero() {
    const [reveal, setReveal] = useState(false);
    const [mobile, setMobile] = useState(isMobile());

    useEffect(() => {
        const timer = setTimeout(() => setReveal(true), 2000);
        window.addEventListener('resize', () => setMobile(isMobile()));
        return () => clearTimeout(timer);
    }, []);

    const scrollToProjects = (e) => {
        e.preventDefault();
        const el = document.querySelector('#projects');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={`hero-section ${mobile ? 'low-power' : ''}`}>
            <Canvas camera={{ position: [0, 0, 20] }}>
                <ambientLight intensity={mobile ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={mobile ? 0.5 : 0.8} />
                <AutoRotateStars />
                <Stars
                    radius={100}
                    depth={40}
                    count={mobile ? 1500 : 3500}
                    factor={3}
                    saturation={0}
                    fade
                />
                <Suspense fallback={null}>
                    <BinaryStream count={mobile ? 120 : 250} />
                </Suspense>
                {!mobile && (
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} height={300} />
                    </EffectComposer>
                )}
            </Canvas>

            <div className="overlay">
                {!reveal ? (
                    <>
                        <div className="left-card">
                            <pre>
                                <code>
                                    {'// Developer Intro\n'}
                                    {'const name = "Vishal Kumar";\n'}
                                    {'const role = "Full Stack Developer or Software Developer";\n'}
                                    {'const stack = ["React", "Node.js","MongoDB","Express.js", "Three.js","Cpp" ,"DSA];\n'}
                                    {'const location = "India";'}
                                </code>
                            </pre>
                        </div>
                        <button className="reveal-btn" onClick={() => setReveal(true)}>
                            Click to Decrypt Profile
                        </button>
                    </>
                ) : (
                    <div className="info-card fade-in">
                        <DecryptionText targetText="Hello, I am" delay={0} className="greeting large-text" />
                        <DecryptionText targetText="Vishal Kumar" delay={1200} className="nameHeader extra-large-text" />
                        <DecryptionText targetText="Full Stack Web & Software Developer" delay={2500} className="titleHeader" />
                        <p className="description">
                            A <strong>Full Stack Developer</strong> building fast, scalable apps with <strong>React</strong>, <strong>Node.js</strong>, and <strong>Three.js</strong>.
                        </p>
                        <a href="#projects" className="hero-link" onClick={scrollToProjects}>
                            Explore My Projects →
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
