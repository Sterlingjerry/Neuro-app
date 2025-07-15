import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Import Page Components
import HomePage from './pages/HomePage';
import CheckInPage from './pages/CheckInPage';
import JournalPage from './pages/JournalPage';
import BreathingExercisePage from './pages/BreathingExercisePage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage'; // New: Authentication Page

// Import UI Components
import Header from './components/Header';

// Create a context for Firebase and User data
export const AppContext = createContext(null);

// Main App Component
const App = () => {
  // db and auth are now imported from firebase.js
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New: Track authentication status
  const [currentPage, setCurrentPage] = useState('home'); // State for navigation
  const [error, setError] = useState(null); // Error state

  // Set up auth listener
  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          setIsAuthenticated(true);
        } else {
          setUserId(null);
          setIsAuthenticated(false);
        }
        setIsAuthReady(true);
        setError(null);
      }, (err) => {
        setError('Authentication error. Please try again later.');
        setIsAuthReady(true);
      });
    } catch (err) {
      setError('App initialization failed. Please check your Firebase configuration.');
      setIsAuthReady(true);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Provide context values to children
  const contextValue = { db, auth, userId, isAuthReady, isAuthenticated, setIsAuthenticated, setCurrentPage };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-teal to-black" aria-busy="true" aria-live="polite">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-brand-teal mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <div className="text-xl text-black">Loading app...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-teal to-black" aria-live="assertive">
        <div className="bg-white p-8 rounded shadow text-center border border-brand-teal">
          <div className="text-2xl text-brand-teal mb-2">Error</div>
          <div className="text-black mb-4">{error}</div>
          <button className="px-4 py-2 bg-brand-teal text-black rounded" onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      {/* Global container with a turquoise-black gradient background and Inter font */}
      <div className="fixed inset-0 min-h-screen w-screen bg-brand-blue font-inter text-black overflow-auto">
        {!isAuthenticated ? (
          <AuthPage />
        ) : (
          <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-stretch justify-start">
              {/* Render content based on currentPage state */}
              {currentPage === 'home' && <HomePage />}
              {currentPage === 'checkin' && <CheckInPage />}
              {currentPage === 'resources' && <ResourcesPage />}
              {currentPage === 'journal' && <JournalPage />}
              {currentPage === 'breathing' && <BreathingExercisePage />}
              {currentPage === 'profile' && <ProfilePage />}
            </main>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
