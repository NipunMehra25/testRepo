import Spline from '@splinetool/react-spline'
import LiquidEther from '../../ReactBits/LiquidEther'
import FancyInput from '../../components/FancyInput'
import './hero.css'
import TryCyrusButton from '../../components/TryCyrusButton';
import { useNavigate } from "react-router-dom";
import FeaturesSection from '../../components/FeaturesSection';
import AnimatedPreviewPanels from '../../components/AnimatedPreviewPanels';
import OrbSectionWithCards from '../../components/OrbSectionWithCards';
import GridSectionWithCards from '../../components/GridSectionWithCards';
import CTASection from '../../components/CTASection';
import ScrollToTop from '../../components/ScrollToTop';



const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navBar">
      <img
        src="/logo.PNG"
        alt="Logo"
        className="nav-logo"
        onClick={() => navigate('/')}
      />
      <ul className="navLinks">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/TeamPage")}>Team</li>
        <li onClick={() => navigate("/contact")}>Contact Us</li>
      </ul>
    </nav>
  );
};


function App() {

  return (
    <>
      {/* GLOBAL BACKGROUND */}
      <div className="liquid-bg">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={40}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* HERO - FIRST 100VH (NIPUN) */}
      <section className="hero">
        <div className="spline-center">
          <Spline scene="https://prod.spline.design/YILrcTQy-1d19GF5/scene.splinecode" />
        </div>

        <div style={{ height: '15vh', width: '25vw', background: 'black', position: 'absolute', right: '0', bottom: '1vh', zIndex: '3', pointerEvents: 'none' }}></div>

        <div className="navBar">
          <div className="navContainer">
            <NavBar />
          </div>
        </div>


        {/* 🔥 YOUR FANCY INPUT */}
        <div className="hero-fancy-input">
          <FancyInput />
        </div>


        <div className='tryButton'>
          <TryCyrusButton />
        </div>

      </section>


      {/* LAVANAY SECTIONS - AFTER 100VH */}

      {/* Features Section */}
      <FeaturesSection />

      {/* Animated Preview Panels (See It In Action) */}
      <AnimatedPreviewPanels />

      {/* Orb section with premium feature cards in front */}
      <OrbSectionWithCards />

      {/* Grid section with premium feature cards in front */}
      <GridSectionWithCards />

      {/* CTA Section */}
      <CTASection />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  )
}

export default App
