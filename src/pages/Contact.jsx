import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ContactSphere3D from '../components/ContactSphere3D';
import { useTheme } from '../context/ThemeContext';

const InputField = ({ label, type, value, onChange, placeholder, isTextArea = false }) => {
    const [focused, setFocused] = useState(false);
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const styleProps = {
        width: '100%',
        padding: '1.2rem',
        borderRadius: '12px',
        border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
        background: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        resize: isTextArea ? 'vertical' : 'none',
        boxShadow: isLight && focused ? '0 0 0 2px rgba(100, 108, 255, 0.2)' : 'none'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            <label style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.9, transition: 'color 0.3s', color: focused ? 'var(--accent-color)' : 'var(--text-color)' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                {isTextArea ? (
                    <textarea
                        rows={5}
                        placeholder={placeholder}
                        required
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={styleProps}
                    />
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={value}
                        onChange={onChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={styleProps}
                    />
                )}

                {/* Animated Glow Border (Dark Mode Only) */}
                {!isLight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: focused ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            inset: -2,
                            borderRadius: '14px',
                            background: 'linear-gradient(45deg, var(--accent-color), #bc13fe)',
                            zIndex: -1,
                            filter: 'blur(8px)'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (Simulated)');
    };

    return (
        <PageTransition>
            <div style={{ position: 'relative', minHeight: '100vh', padding: '6rem 2rem', overflow: 'hidden' }}>

                {/* Animated Pulse Background */}
                <motion.div
                    animate={{
                        background: isLight
                            ? [
                                'radial-gradient(circle at 20% 20%, #e0e7ff 0%, #ffffff 100%)',
                                'radial-gradient(circle at 80% 80%, #f3e8ff 0%, #ffffff 100%)',
                                'radial-gradient(circle at 20% 20%, #e0e7ff 0%, #ffffff 100%)'
                            ]
                            : [
                                'radial-gradient(circle at 20% 20%, #2b002b 0%, #000 100%)',
                                'radial-gradient(circle at 80% 80%, #001f3f 0%, #000 100%)',
                                'radial-gradient(circle at 20% 20%, #2b002b 0%, #000 100%)'
                            ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', inset: 0, zIndex: -1 }}
                />

                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '45% 50%', gap: '5%', alignItems: 'center' }}>

                    {/* Left: 3D Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }}
                    >
                        {/* Ambient Glow behind sphere */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '400px',
                            height: '400px',
                            background: isLight ? 'radial-gradient(circle, rgba(100,108,255,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%)',
                            filter: 'blur(50px)',
                            zIndex: -1
                        }} />
                        <ContactSphere3D />
                    </motion.div>

                    {/* Right: Glass Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            background: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(20px)',
                            padding: '3rem',
                            borderRadius: '30px',
                            border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: isLight ? '0 20px 50px rgba(0,0,0,0.1)' : '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--text-color)' }}>Get in Touch</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '2.5rem', color: 'var(--text-color)' }}>Start a conversation with our AI-powered future.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <InputField
                                    label="Name"
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                                <InputField
                                    label="Email"
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>

                            <InputField
                                label="Message"
                                type="text"
                                isTextArea={true}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                placeholder="Tell us about your project..."
                            />

                            <motion.button
                                whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,243,255,0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                style={{
                                    padding: '1.2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(90deg, var(--accent-color), #2de2e6)',
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.8rem',
                                    marginTop: '1rem',
                                    width: '100%',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}
                            >
                                Send Message <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
