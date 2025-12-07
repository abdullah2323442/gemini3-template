import React from 'react';
import HeroScene from '../scenes/HeroScene';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import TextReveal from '../components/TextReveal';

const Home = () => {
    return (
        <PageTransition>
            <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>

                {/* 3D Background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <HeroScene />
                </div>

                {/* Content Overlay */}
                <div style={{ position: 'relative', zIndex: 1, paddingTop: '15vh', pointerEvents: 'none' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', pointerEvents: 'auto' }}>

                        <div style={{ maxWidth: '700px' }}>
                            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--text-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <TextReveal text="Experience the" />
                                <div style={{ flexBasis: '100%', height: 0 }} /> {/* Line break hack */}
                                <TextReveal text="Next Dimension" />
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6 }}
                            >
                                A fully animated, 3D-enabled landing page template designed for the modern web. Built with React Three Fiber.
                            </motion.p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/features">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--accent-color)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '1rem 2rem',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderRadius: '50px',
                                            border: 'none',
                                            backgroundColor: 'var(--accent-color)',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>

                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05, backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '1rem 2rem',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderRadius: '50px',
                                            border: '2px solid var(--text-color)',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-color)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Contact Us
                                    </motion.button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;
