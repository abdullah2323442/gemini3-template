import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import Logo3D from './Logo3D';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                // Enhanced Glassmorphism
                background: 'rgba(var(--bg-color-rgb), 0.6)',
                backdropFilter: 'blur(15px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-color)', textDecoration: 'none' }}>
                    <div style={{ width: '70px', height: '70px' }}>
                        <Logo3D />
                    </div>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--secondary-bg)', padding: '0.5rem', borderRadius: '50px', border: '1px solid var(--border-color)' }}>
                {links.map((link, i) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            position: 'relative',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '30px',
                            color: location.pathname === link.path ? '#fff' : 'var(--text-color)',
                            fontWeight: 600,
                            zIndex: 1,
                            transition: 'color 0.3s',
                        }}
                    >
                        {/* Fluid Hover Bubble */}
                        <AnimatePresence>
                            {hoveredIndex === i && (
                                <motion.div
                                    layoutId="nav-hover"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'var(--accent-color)', // Uses global fluid cursor accent
                                        borderRadius: '30px',
                                        zIndex: -1,
                                        opacity: 0.15, // Subtle highlight for hover
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Active State Background (Solid) */}
                        {location.pathname === link.path && (
                            <motion.div
                                layoutId="nav-active"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'var(--accent-color)',
                                    borderRadius: '30px',
                                    zIndex: -2,
                                    boxShadow: '0 0 20px var(--accent-color)', // Glow effect
                                }}
                            />
                        )}
                        <span style={{ position: 'relative', zIndex: 10 }}>{link.name}</span>
                    </Link>
                ))}

                <div style={{ marginLeft: '1rem' }}>
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
