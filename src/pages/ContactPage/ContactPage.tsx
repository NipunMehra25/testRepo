import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetallicPaint from '../../ReactBits/MetallicPaint';
import logo from '/logo.svg';
import './ContactPage.css';


export default function ContactPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="contact-page">
            {/* Navigation */}
            <nav className="contact-nav">
                <button onClick={() => navigate('/')} className="nav-back-btn">
                    ← Back to Home
                </button>
            </nav>

            <div className="contact-container">
                {/* Left Side - Metallic Logo */}
                <div className="contact-logo-section">
                    <div className="metallic-logo-wrapper">
                        <MetallicPaint
                            imageSrc={logo}
                            seed={42}
                            scale={4}
                            patternSharpness={1}
                            noiseScale={0.5}
                            speed={0.3}
                            liquid={0.75}
                            mouseAnimation={false}
                            brightness={2}
                            contrast={0.5}
                            refraction={0.01}
                            blur={0.015}
                            chromaticSpread={2}
                            fresnel={1}
                            angle={0}
                            waveAmplitude={1}
                            distortion={1}
                            contour={0.2}
                            lightColor="#ffffff"
                            darkColor="#000000"
                            tintColor="#feb3ff"
                        />
                    </div>
                    <h1 className="contact-logo-title">Get in Touch</h1>
                    <p className="contact-logo-subtitle">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Right Side - Contact Form */}
                <div className="contact-form-section">
                    <div className="contact-form-wrapper">
                        <h2 className="contact-form-title">Contact Us</h2>

                        {submitted && (
                            <div className="success-message">
                                ✓ Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us what's on your mind..."
                                    rows={6}
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
