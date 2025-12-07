import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const TechSphere = () => {
    const sphereRef = useRef();
    const pointsRef = useRef();
    // Generate random points on a sphere
    const spherePoints = random.inSphere(new Float32Array(5000), { radius: 1.2 });

    useFrame((state, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y -= delta * 0.2;
            sphereRef.current.rotation.x -= delta * 0.1;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.1;
            pointsRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group>
            {/* Inner Wireframe Core - Glowing Cyan */}
            <Sphere ref={sphereRef} args={[1, 32, 32]}>
                <meshBasicMaterial
                    color="#00f3ff"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </Sphere>

            {/* Glowing Particles Cloud - Neon Pink */}
            <Points ref={pointsRef} positions={spherePoints} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ff00ff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>

            {/* Orbiting Ring 1 - Electric Blue */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.6, 0.02, 16, 100]} />
                <meshBasicMaterial color="#2de2e6" transparent opacity={0.8} />
            </mesh>

            {/* Orbiting Ring 2 - Hot Purple */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[1.8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} />
            </mesh>

            {/* Orbiting Ring 3 - Bright Yellow */}
            <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[1.4, 0.01, 16, 100]} />
                <meshBasicMaterial color="#f6019d" transparent opacity={0.5} />
            </mesh>
        </group>
    );
};

const ContactSphere3D = () => {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
                {/* Removed invalid background color to ensure transparency */}
                <ambientLight intensity={0.5} />
                <TechSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default ContactSphere3D;
