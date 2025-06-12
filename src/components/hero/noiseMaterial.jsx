// NoiseMaterial.js
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Define the NoiseMaterial using shaderMaterial from drei
const NoiseMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.1, 0.2) }, // Uniforms: time for animation, color for base color
    // Vertex Shader: Basic passthrough, transforms vertices from local to clip space
    `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader: Generates noise pattern and colors the fragment
    `
    uniform float time; // Time uniform for animation
    uniform vec3 color; // Base color uniform
    
    // Hash function to generate pseudo-random numbers
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Perlin-like noise function
    float noise (in vec2 st) {
      vec2 i = floor(st); // Integer part of the coordinate
      vec2 f = fract(st); // Fractional part of the coordinate
      
      // Get random values for the four corners of the current grid cell
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      // Smooth interpolation using a cubic curve (3x^2 - 2x^3)
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      // Interpolate in X, then interpolate in Y
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / 800.0; // Scale screen coordinates for noise
      st.x *= 1.5; // Correct aspect ratio, make noise stretch horizontally a bit
      
      float n = noise(st * 5.0 + time * 0.05); // Generate noise pattern, animate it slowly
      
      // Mix the base color with a darker shade based on noise value
      // This creates the swirling, dynamic background effect
      gl_FragColor = vec4(mix(vec3(0.05, 0.05, 0.1), color, n * 1.5), 1.0); // Multiply noise for more contrast
    }
  `
);

// Extend Three.js with our custom material so it can be used as a JSX element
extend({ NoiseMaterial });

export { NoiseMaterial }; // Export for use in Hero.js