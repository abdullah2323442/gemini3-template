import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Sparkles } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useTheme } from '../context/ThemeContext';
import heroTexture from '../assets/hero_texture.png';

const AnimatedObject = ({ position }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, heroTexture);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <torusKnotGeometry args={[1, 0.3, 128, 64]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#2200aa"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

const HeroScene = () => {
    const { theme } = useTheme();
    const ambientIntensity = theme === 'dark' ? 0.3 : 0.6;

    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* Lighting */}
            <ambientLight intensity={ambientIntensity} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
            <directionalLight position={[-5, 5, 5]} intensity={1} color="#ff00ff" />

            {/* Main Object - Abstract Tech */}
            <AnimatedObject position={[0, 0, 0]} />

            {/* Particles */}
            <Sparkles count={200} scale={6} size={2} speed={0.4} opacity={0.5} color="#00ffff" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Shadows */}
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color={theme === 'dark' ? 'black' : '#888'} />
        </Canvas>
    );
};

export default HeroScene;
