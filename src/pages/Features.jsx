import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Code, Globe, Layers, Layout, Zap } from 'lucide-react';
import featuresBgAi from '../assets/features_bg_ai.png';
import PageTransition from '../components/PageTransition';
import { Tilt } from 'react-tilt';
import { useTheme } from '../context/ThemeContext';

const featuresData = [
    { icon: Box, title: '3D Elements', description: 'Integrated Three.js experiences.' },
    { icon: Zap, title: 'Fast Performance', description: 'Optimized via Vite and React.' },
    { icon: Layers, title: 'Responsive Layout', description: 'Works perfectly on all devices.' },
    { icon: Globe, title: 'Global Theming', description: 'Dark and light mode support.' },
    { icon: Code, title: 'Clean Code', description: 'Built with modern best practices.' },
    { icon: Layout, title: 'Dynamic UI', description: 'Smooth framer-motion animations.' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom cubic bezier
        },
    }),
};

const defaultTiltOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.02,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Features = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax effect
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <PageTransition>
            <div style={{ position: 'relative', minHeight: '100vh', padding: '6rem 2rem', overflow: 'hidden' }}>
                {/* Parallax Background */}
                <motion.div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%', // Taller for parallax
                    zIndex: -1,
                    backgroundImage: `url(${featuresBgAi})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    y: y1,
                    filter: isLight ? 'brightness(1.5) opacity(0.2)' : 'brightness(0.6)', // Adjust for light/dark
                }}>
                    {/* Gradient Overlay for Fade */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isLight
                            ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8))'
                            : 'linear-gradient(to bottom, transparent, var(--bg-color))'
                    }} />
                </motion.div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 800, textShadow: isLight ? 'none' : '0 10px 30px rgba(0,0,0,0.5)' }}>
                            <span style={{ color: isLight ? '#333' : '#fff' }}>Futuristic</span> <span style={{ color: 'var(--accent-color)' }}>Features</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, color: 'var(--text-color)' }}>
                            Explore the cutting-edge technologies that power our immersive digital experiences.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {featuresData.map((feature, i) => (
                            <Tilt key={i} options={defaultTiltOptions} style={{ height: '100%' }}>
                                <motion.div
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={cardVariants}
                                    style={{
                                        padding: '2.5rem',
                                        borderRadius: '24px',
                                        // Advanced Glassmorphism with Theme Support
                                        background: isLight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: isLight ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
                                        boxShadow: isLight ? '0 8px 32px 0 rgba(0, 0, 0, 0.1)' : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                                        transition: 'border-color 0.3s ease, background 0.3s ease',
                                        cursor: 'default',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}
                                    whileHover={{
                                        borderColor: 'var(--accent-color)',
                                        background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.07)',
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, var(--accent-color), #2de2e6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        color: '#fff',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                    }}>
                                        <feature.icon size={30} strokeWidth={1.5} />
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--text-color)' }}>{feature.title}</h3>
                                    <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: '1.05rem', color: 'var(--text-color)' }}>{feature.description}</p>
                                </motion.div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Features;
