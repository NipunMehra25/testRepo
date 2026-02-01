import Lanyard from '../../components/Lanyard'
import './TeamPage.css'
import { useNavigate } from 'react-router-dom'
import LightRays from '../../ReactBits/LightRays';
import { GithubIcon, type GithubIconHandle } from '../../components/GithubIcon';
import { LinkedinIcon, type LinkedinIconHandle } from '../../components/LinkedinIcon';
import { MailCheckIcon, type MailCheckIconHandle } from '../../components/MailCheckIcon';
import { ArrowBigLeftDashIcon, type ArrowBigLeftDashIconHandle } from '../../components/ArrowBigLeftDashIcon';
import { ArrowBigRightDashIcon, type ArrowBigRightDashIconHandle } from '../../components/ArrowBigRightDashIcon';
import { useRef, useState, useEffect } from 'react';

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="team-navBar">
            <img
                src="/logo.PNG"
                alt="Logo"
                className="team-nav-logo"
                onClick={() => navigate('/')}
            />
            <ul className="team-navLinks">
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/team')}>Team</li>
                <li onClick={() => navigate('/contact')}>Contact Us</li>
            </ul>
        </nav>
    )
}

const TeamPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const totalPages = 4;

    const githubIconRef = useRef<GithubIconHandle>(null);
    const linkedinIconRef = useRef<LinkedinIconHandle>(null);
    const mailIconRef = useRef<MailCheckIconHandle>(null);

    const githubIconRef2 = useRef<GithubIconHandle>(null);
    const linkedinIconRef2 = useRef<LinkedinIconHandle>(null);
    const mailIconRef2 = useRef<MailCheckIconHandle>(null);

    const leftArrowRef = useRef<ArrowBigLeftDashIconHandle>(null);
    const rightArrowRef = useRef<ArrowBigRightDashIconHandle>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const goToPage = (pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            setCurrentPage(pageIndex);
            if (scrollContainerRef.current) {
                const translateX = pageIndex * window.innerWidth;
                scrollContainerRef.current.style.transform = `translateX(-${translateX}px)`;
            }
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    };

    const copyEmailToClipboard = (email: string) => {
        navigator.clipboard.writeText(email).then(() => {
            setShowCopiedMessage(true);
            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 2000);
        });
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                nextPage();
            } else if (event.key === 'ArrowLeft') {
                prevPage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage]); // Re-run when currentPage changes

    return (
        <div className="team-page">
            <NavBar />
            <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 1 }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>

            {/* Navigation Arrows */}
            {currentPage > 0 && (
                <button
                    className="nav-arrow nav-arrow-left"
                    onClick={prevPage}
                    onMouseEnter={() => leftArrowRef.current?.startAnimation()}
                    onMouseLeave={() => leftArrowRef.current?.stopAnimation()}
                >
                    <ArrowBigLeftDashIcon ref={leftArrowRef} size={32} />
                </button>
            )}
            {currentPage < totalPages - 1 && (
                <button
                    className="nav-arrow nav-arrow-right"
                    onClick={nextPage}
                    onMouseEnter={() => rightArrowRef.current?.startAnimation()}
                    onMouseLeave={() => rightArrowRef.current?.stopAnimation()}
                >
                    <ArrowBigRightDashIcon ref={rightArrowRef} size={32} />
                </button>
            )}

            {/* Page Dots */}
            <div className="page-dots">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`page-dot ${index === currentPage ? 'active' : ''}`}
                        onClick={() => goToPage(index)}
                    />
                ))}
            </div>

            {/* Copied Message */}
            {showCopiedMessage && (
                <div className="copied-message">
                    Mail copied ✓
                </div>
            )}

            {/* Horizontal Scroll Container */}
            <div className="team-scroll-container" ref={scrollContainerRef}>
                {/* First Team Member - Nipun Mehra */}
                <div className="team-member-section">
                    <div className="lanyard-grid">
                        {/* Left Side - Hero Section */}
                        <div className="hero-section">
                            <div className="hero-badge" style={{ marginBottom: '2.5rem' }}>
                                <span className="badge-icon">⭐</span>
                                <span className="badge-text">HERO</span>
                            </div>
                            <div className="hero-badge">
                                <span className="badge-icon">✦</span>
                                <span className="badge-text">TEAM LEAD</span>
                            </div>

                            <h1 className="hero-title">
                                Nipun Mehra
                                <br />
                                <span className="hero-subtitle">
                                    <span className="flip-word" style={{ animationDelay: '0s' }}>Team</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.1s' }}>Lead</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.2s' }}>and</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.3s' }}>Architect</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.4s' }}>of</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.5s' }}>Cyrus</span>
                                </span>
                            </h1>

                            <p className="hero-description">
                                Led the development of Cyrus, playing a major role in system architecture, API design, backend systems, and frontend development. Focused on building scalable, well-structured solutions with seamless user experiences, modern web architectures, and interactive and seamless UI/UX design.
                            </p>

                            <div className="hero-socials">
                                <a
                                    href="https://github.com/NipunMehra25"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn github"
                                    onMouseEnter={() => githubIconRef.current?.startAnimation()}
                                    onMouseLeave={() => githubIconRef.current?.stopAnimation()}
                                >
                                    <GithubIcon ref={githubIconRef} size={20} />
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/nipun-mehra-4864a5308/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn linkedin"
                                    onMouseEnter={() => linkedinIconRef.current?.startAnimation()}
                                    onMouseLeave={() => linkedinIconRef.current?.stopAnimation()}
                                >
                                    <LinkedinIcon ref={linkedinIconRef} size={20} />
                                    LinkedIn
                                </a>
                                <button
                                    onClick={() => copyEmailToClipboard('nipun.mehra.05@gmail.com')}
                                    className="social-btn mail"
                                    onMouseEnter={() => mailIconRef.current?.startAnimation()}
                                    onMouseLeave={() => mailIconRef.current?.stopAnimation()}
                                >
                                    <MailCheckIcon ref={mailIconRef} size={20} />
                                    Email
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Lanyard */}
                        <div className="lanyard-item">
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
                        </div>
                    </div>
                </div>

                {/* Second Team Member */}
                <div className="team-member-section">
                    <div className="lanyard-grid">
                        {/* Left Side - Hero Section */}
                        <div className="hero-section">
                            <div className="hero-badge">
                                <span className="badge-icon">✦</span>
                                <span className="badge-text">BACKEND LEAD</span>
                            </div>

                            <h1 className="hero-title">
                                Harsh Pathak
                                <br />
                                <span className="hero-subtitle">
                                    <span className="flip-word" style={{ animationDelay: '0s' }}>Lead</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.1s' }}>Backend</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.2s' }}>Developer</span>
                                </span>
                            </h1>

                            <p className="hero-description">
                                Architecting powerful server-side solutions and APIs with precision.
                                Expert in building scalable backend systems and optimizing database performance
                                for high-traffic applications.
                            </p>

                            <div className="hero-socials">
                                <a
                                    href="https://github.com/ClasherFTW"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn github"
                                    onMouseEnter={() => githubIconRef2.current?.startAnimation()}
                                    onMouseLeave={() => githubIconRef2.current?.stopAnimation()}
                                >
                                    <GithubIcon ref={githubIconRef2} size={20} />
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/harsh-pathak-849722228"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn linkedin"
                                    onMouseEnter={() => linkedinIconRef2.current?.startAnimation()}
                                    onMouseLeave={() => linkedinIconRef2.current?.stopAnimation()}
                                >
                                    <LinkedinIcon ref={linkedinIconRef2} size={20} />
                                    LinkedIn
                                </a>
                                <button
                                    onClick={() => copyEmailToClipboard('harshpathak629@gmail.com')}
                                    className="social-btn mail"
                                    onMouseEnter={() => mailIconRef2.current?.startAnimation()}
                                    onMouseLeave={() => mailIconRef2.current?.stopAnimation()}
                                >
                                    <MailCheckIcon ref={mailIconRef2} size={20} />
                                    Email
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Lanyard */}
                        <div className="lanyard-item">
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} cardModel="Harsh_card.glb" />
                        </div>
                    </div>
                </div>

                {/* Third Team Member */}
                <div className="team-member-section">
                    <div className="lanyard-grid">
                        <div className="hero-section">
                            <div className="hero-badge" style={{ marginBottom: '2.5rem' }}>
                                <span className="badge-icon">⭐</span>
                                <span className="badge-text">HERO</span>
                            </div>
                            <div className="hero-badge">
                                <span className="badge-icon">✦</span>
                                <span className="badge-text">FRONTEND LEAD</span>
                            </div>

                            <h1 className="hero-title">
                                Lavanay Bhatia
                                <br />
                                <span className="hero-subtitle">
                                    <span className="flip-word" style={{ animationDelay: '0s' }}>Frontend</span>{' '}
                                    <span className="flip-word" style={{ animationDelay: '0.1s' }}>Lead</span>
                                </span>
                            </h1>

                            <p className="hero-description">
                                Frontend Lead focused on building responsive, modern user interfaces, with close collaboration on backend APIs to ensure seamless integration and performance. Passionate about creating smooth, pixel-perfect user experiences.
                            </p>

                            <div className="hero-socials">
                                <a href="https://github.com/LavanayBhatia" target="_blank" rel="noopener noreferrer" className="social-btn github">
                                    <GithubIcon size={20} />
                                    GitHub
                                </a>
                                <a href="https://www.linkedin.com/in/lavanay/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                                    <LinkedinIcon size={20} />
                                    LinkedIn
                                </a>
                                <button onClick={() => copyEmailToClipboard('vnml.meet@gmail.com')} className="social-btn mail">
                                    <MailCheckIcon size={20} />
                                    Email
                                </button>
                            </div>
                        </div>

                        <div className="lanyard-item">
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} cardModel="lavanay.glb" />
                        </div>
                    </div>
                </div>

                {/* Fourth Team Member */}
                <div className="team-member-section">
                    <div className="lanyard-grid">
                        <div className="hero-section">
                            <div className="hero-badge">
                                <span className="badge-icon">✦</span>
                                <span className="badge-text">TEAM MEMBER</span>
                            </div>

                            <h1 className="hero-title">
                                Hardik Batra
                                <br />
                                <span className="hero-subtitle">
                                    <span className="flip-word" style={{ animationDelay: '0s' }}>Developer</span>
                                </span>
                            </h1>

                            <p className="hero-description">
                                Contributing to both frontend and backend development with dedication.
                                Eager to learn and grow while building innovative solutions
                                for complex challenges.
                            </p>

                            <div className="hero-socials">
                                <a
                                    href="https://github.com/Hardik250406"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn github"
                                >
                                    <GithubIcon size={20} />
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/hardik-batra-34652a352/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn linkedin"
                                >
                                    <LinkedinIcon size={20} />
                                    LinkedIn
                                </a>
                                <button
                                    onClick={() => copyEmailToClipboard('hardik0406.becse24@chitkara.edu.in')}
                                    className="social-btn mail"
                                >
                                    <MailCheckIcon size={20} />
                                    Email
                                </button>
                            </div>
                        </div>

                        <div className="lanyard-item">
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} cardModel="Hardik.glb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamPage
