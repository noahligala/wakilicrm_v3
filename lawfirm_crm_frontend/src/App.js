// App.js
import React, { useState, useEffect } from 'react';
import MainView from './MainView';
import SignIn from './pages/Signin';
import { TitleContext } from './components/TitleContext';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { LogOut, logoutInactiveUser } from './components/LogOut';

const LoaderContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffff', // Semi-transparent background
  zIndex: 9999, // Ensure it's above other content
  opacity: 1,
  transition: 'opacity 0.5s ease', // Fade-in and fade-out transition
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true); // Flag to track whether to show loader

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const minimumLoaderTime = 300; // 1 second minimum time for loader
    const maxLoginDuration = 500 * 60 * 1000; // 15 minutes in milliseconds
    const maxInactiveDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    let loginStartTime = null;
    let lastActivityTime = Date.now();

    // Fetch user data from local storage
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const lastLoginTime = userData.lastLoginTime;
      const currentTime = new Date().getTime();
      if (currentTime - lastLoginTime < maxLoginDuration) {
        setUser(userData);
        loginStartTime = lastLoginTime;
      } else {
        // Automatically logout if user has been logged in for more than 15 hours
        setUser(null);
        localStorage.removeItem('user');
      }
    }

    // Event listener for user activity
    const handleUserActivity = () => {
      lastActivityTime = Date.now();
    };

    // Set up event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('mousedown', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);

    // Perform health check
    const performHealthCheck = () => {
      axios
        .get('http://localhost:8000/api/health-check')
        .then(response => {
          if (response.status === 200) {
            // Backend is reachable, stop showing loader
            setLoading(false);
            setShowLoader(false);
          }
        })
        .catch(error => {
          // Backend is unreachable, perform logout after 20 seconds
          setTimeout(() => {
            LogOut(); // Logout the user
          }, 20000); // 20 seconds in milliseconds
        });
    };

    // Perform initial health check
    performHealthCheck();

    // Set up interval for periodic health checks
    const healthCheckInterval = setInterval(performHealthCheck, 5000); // Check every 5 seconds

    // Check if user is inactive
    const checkUserActivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime > maxInactiveDuration) {
        // User is inactive, logout the user
        logoutInactiveUser();
      }
    };

    // Set up interval for checking user activity
    const activityCheckInterval = setInterval(checkUserActivity, 60000); // Check every minute

    // Check if minimum loader time has elapsed
    const checkLoaderTime = () => {
      const elapsedTime = Date.now() - (loginStartTime || Date.now());
      if (elapsedTime >= minimumLoaderTime) {
        // Minimum loader time has elapsed, stop showing the loader
        setLoading(false);
        setShowLoader(false);
      } else {
        // Minimum loader time hasn't elapsed yet, continue showing the loader
        const remainingTime = minimumLoaderTime - elapsedTime;
        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, remainingTime);
      }
    };

    // Call checkLoaderTime after a short delay to ensure smooth rendering
    const timer = setTimeout(checkLoaderTime, 10);

    // Cleanup
    return () => {
      clearInterval(healthCheckInterval);
      clearInterval(activityCheckInterval);
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('mousedown', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
    };
  }, []);

  // Function to handle successful login
  const handleLogin = async userData => {
    userData.lastLoginTime = new Date().getTime();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  // Check if user is authenticated for rendering appropriate view
  const renderView = () => {
    if (user) {
      return (
        <BrowserRouter>
          <MainView user={user} onLogout={handleLogout} />
        </BrowserRouter>
      );
    } else {
      return <SignIn onLogin={handleLogin} />;
    }
  };

  return (
    <TitleContext.Provider value={{ title: 'Home' }}>
      {/* Show loader only if loading is true and showLoader flag is true */}
      {loading && showLoader && (
        <LoaderContainer>
          <CircularProgress color="primary" /> {/* Set color to primary */}
        </LoaderContainer>
      )}

      {/* Render main content once user data is fetched */}
      {!loading && renderView()}
    </TitleContext.Provider>
  );
}

