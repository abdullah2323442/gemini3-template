import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { icon: Github, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid var(--border-color)',
                zIndex: 10,
                background: 'rgba(var(--bg-color-rgb), 0.5)',
                backdropFilter: 'blur(5px)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated Gradient Border Top */}
            <motion.div
                animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--bg-color), var(--accent-color), var(--bg-color))',
                    backgroundSize: '200% 100%'
                }}
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {socialLinks.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.href}
                            whileHover={{ y: -5, color: 'var(--accent-color)' }}
                            style={{ color: 'var(--text-color)', opacity: 0.7, transition: 'color 0.2s' }}
                        >
                            <link.icon size={24} />
                        </motion.a>
                    ))}
                </div>

                <p style={{ opacity: 0.6, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    &copy; {new Date().getFullYear()} Animated Landing Page. Made with <Heart size={14} fill="hotpink" color="hotpink" /> by Antigravity.
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;
