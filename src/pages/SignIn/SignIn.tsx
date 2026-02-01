import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Beams from '../../ReactBits/Beams';
import { signInWithGoogle, signUpWithEmail, loginWithEmail } from '../../services/auth';


const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="signin-navBar">
      <img
        src="/logo.PNG"
        alt="Logo"
        className="signin-nav-logo"
        onClick={() => navigate('/')}
      />
      <ul className="signin-navLinks">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/TeamPage")}>Team</li>
        <li onClick={() => navigate("/contact")}>Contact Us</li>
      </ul>
    </nav>
  );
};


const SignIn = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLDivElement>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login with email and password
        await loginWithEmail(email, password);
        console.log('Login successful');
        navigate('/'); // Redirect to home page after successful login
      } else {
        // Sign up with email and password
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await signUpWithEmail(email, password);
        console.log('Signup successful');
        navigate('/'); // Redirect to home page after successful signup
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication');
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      await signInWithGoogle();
      console.log('Google authentication successful');
      navigate('/'); // Redirect to home page after successful Google auth
    } catch (error: any) {
      console.error('Google authentication error:', error);
      setError(error.message || 'An error occurred during Google authentication');
    }
  };

  return (
    <main className="signin-page">
      <div className="bgReact">
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <Beams
            beamWidth={2}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
      </div>

      <div className="signin-navContainer">
        <NavBar />
      </div>

      <div className="auth-container">
        <div
          ref={formRef}
          className="auth-form-wrapper"
          style={{
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
          } as React.CSSProperties}
        >
          <div className="auth-glow-effect"></div>

          <div className="auth-form-content">
            <div className="auth-header">
              <h1 className="auth-title">
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h1>
              <p className="auth-subtitle">
                {isLogin ? 'Enter your credentials to continue' : 'Create your account to get started'}
              </p>
            </div>

            {/* Google OAuth Button */}
            <button type="button" onClick={handleGoogleAuth} className="google-auth-button">
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">OR</span>
              <span className="divider-line"></span>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                color: '#ff4444',
                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                border: '1px solid rgba(255, 68, 68, 0.3)'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="name" className="input-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="auth-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                  <div className="input-glow"></div>
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-glow"></div>
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="auth-input"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                  />
                  <div className="input-glow"></div>
                </div>
              )}

              {isLogin && (
                <div className="auth-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="auth-button">
                <span className="button-text">{isLogin ? 'Sign In' : 'Create Account'}</span>
                <div className="button-glow"></div>
              </button>
            </form>

            <div className="auth-toggle">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="toggle-button"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
