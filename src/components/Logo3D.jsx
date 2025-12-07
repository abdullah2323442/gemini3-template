import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Octahedron, MeshDistortMaterial, Float, Environment, Sphere } from '@react-three/drei';

const PolishedLogo = () => {
    const outerRef = useRef();
    const innerRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (outerRef.current) {
            // Oscillate 180 degrees (PI) - from -PI/2 to PI/2
            outerRef.current.rotation.y = Math.sin(t * 0.5) * (Math.PI / 2);
            outerRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = Math.sin(t * 0.5) * (Math.PI / 2);
            innerRef.current.rotation.z = Math.sin(t * 1) * 0.2;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Outer Ring */}
                <Torus ref={outerRef} args={[1.2, 0.2, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0}
                        metalness={1}
                        transmission={0.2}
                        thickness={1}
                        clearcoat={1}
                    />
                </Torus>

                {/* Inner Gem */}
                <Octahedron ref={innerRef} args={[0.8, 0]}>
                    <MeshDistortMaterial
                        color="#646cff"
                        emissive="#7000ff"
                        emissiveIntensity={0.8}
                        roughness={0.1}
                        metalness={0.8}
                        distort={0.3}
                        speed={3}
                    />
                </Octahedron>

                {/* Glow halo */}
                <pointLight position={[0, 0, 0]} intensity={2} color="#4400ff" distance={3} />
            </Float>

            <Environment preset="city" />
        </group>
    );
};

const Logo3D = () => {
    return (
        <div style={{ width: '60px', height: '60px' }}>
            <Canvas camera={{ position: [0, 0, 4.5] }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#00ffff" />
                <PolishedLogo />
            </Canvas>
        </div>
    );
};

export default Logo3D;
