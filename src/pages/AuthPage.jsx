import React, { useState, useContext } from 'react';
import { getAuth, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AppContext } from '../App'; // Adjust path

const AuthPage = () => {
  const { auth, setIsAuthenticated, setCurrentPage } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthAction = async (actionType) => {
    setIsLoading(true);
    setMessage('');
    try {
      if (actionType === 'anonymous') {
        await signInAnonymously(auth);
        setMessage("Signed in as guest! Redirecting to home...");
        setTimeout(() => setCurrentPage('home'), 1000);
      } else if (actionType === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Registration successful! You are now logged in.");
      } else if (actionType === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
      }
      // Authentication state is handled by onAuthStateChanged in App.jsx,
      // which will then update isAuthenticated and render the main app.
      setCurrentPage('home'); // Redirect to home page after successful auth
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage(`Authentication failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-teal to-black p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full border border-brand-blue/20 ring-2 ring-brand-blue/20 ring-offset-2 ring-offset-brand-blue/10">
        <h2 className="text-3xl font-bold text-brand-blue mb-6">
          {isRegistering ? 'Register' : 'Login'} to Well-being Hub
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleAuthAction(isRegistering ? 'register' : 'login'); }} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            className="w-full px-4 py-3 border border-brand-blue/40 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition duration-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            className="w-full px-4 py-3 border border-brand-blue/40 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition duration-200 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-brand-blue text-black font-semibold rounded-lg hover:bg-black hover:text-brand-blue active:bg-brand-blue/80 transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>

        <p className="text-gray-600 mb-4">
          Or {isRegistering ? 'login' : 'register'} with:
        </p>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full py-2 mb-4 text-brand-blue font-semibold rounded-lg border border-brand-blue hover:bg-brand-blue/10 transition duration-300 ease-in-out"
          disabled={isLoading}
        >
          Switch to {isRegistering ? 'Login' : 'Register'}
        </button>

        <div className="mb-2 text-gray-500 text-sm">No account? You can explore as a guest. Your data will not be saved permanently.</div>
        <button
          onClick={() => handleAuthAction('anonymous')}
          className="w-full py-3 bg-black text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-black active:bg-brand-blue/80 transition duration-300 ease-in-out shadow-md"
          disabled={isLoading}
        >
          Continue as Guest
        </button>

        {message && (
          <div className="mt-4 p-3 bg-brand-blue/10 text-black rounded-lg text-center border border-brand-blue/30">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
