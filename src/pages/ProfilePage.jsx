import React, { useState, useContext, useEffect } from 'react';
import { getAuth, signOut, updateProfile, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import { AppContext } from '../App';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const { userId, auth, db } = useContext(AppContext);
  const user = auth?.currentUser;
  const [message, setMessage] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  // Fetch username from Firestore
  const fetchUsername = async (uid) => {
    if (uid && db) {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username || '');
        setUsernameInput(userDoc.data().username || '');
      } else {
        setUsername('');
        setUsernameInput('');
      }
    }
  };
  useEffect(() => {
    if (user && db) fetchUsername(user.uid);
  }, [user, db]);
  // Save username to Firestore
  const handleSaveUsername = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    if (!user || !db) {
      setMessage('User not ready. Please try again.');
      setUsernameLoading(false);
      return;
    }
    setUsernameLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { username: usernameInput.trim() }, { merge: true });
      await fetchUsername(user.uid); // Always re-fetch after update
      setMessage('Username updated!');
    } catch (err) {
      setMessage('Failed to update username.');
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (auth) {
      try {
        await signOut(auth);
        setMessage('Successfully signed out. You are now anonymous.');
      } catch (error) {
        setMessage('Failed to sign out.');
      }
    }
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const credential = EmailAuthProvider.credential(email, password);
      // Save the current username before upgrading
      const prevUsername = usernameInput.trim();
      await linkWithCredential(user, credential);
      // After upgrade, user.uid changes to the new registered user
      if (prevUsername && db && auth.currentUser) {
        await setDoc(doc(db, 'users', auth.currentUser.uid), { username: prevUsername }, { merge: true });
        await fetchUsername(auth.currentUser.uid); // Always re-fetch after upgrade
      }
      setMessage('Account created! Your anonymous data is now linked to your email.');
      setShowUpgrade(false);
    } catch (error) {
      setMessage('Upgrade failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md mx-auto border border-brand-blue/20 ring-2 ring-brand-blue/20 ring-offset-2 ring-offset-brand-blue/10">
      <h2 className="text-3xl font-bold font-montserrat text-brand-blue mb-6">Your Profile</h2>
      <div className="mb-6 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/30 shadow-inner">
        <p className="text-lg font-montserrat text-dark font-medium mb-2">User Status:</p>
        {user?.isAnonymous ? (
          <span className="inline-block px-3 py-1 bg-brand-blue/20 text-dark rounded-full text-sm font-semibold mb-2">Anonymous (Guest)</span>
        ) : (
          <span className="inline-block px-3 py-1 bg-brand-blue text-white rounded-full text-sm font-semibold mb-2">{user?.email || 'Registered User'}</span>
        )}
        <div className="mt-4 mb-2">
          <form onSubmit={handleSaveUsername} className="flex flex-col items-center gap-2">
            <label className="text-base font-montserrat text-dark font-medium">Username:</label>
            <input
              type="text"
              className="px-3 py-1 border border-brand-blue/40 rounded-lg text-center font-montserrat"
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              placeholder="Choose a username"
              maxLength={20}
              disabled={usernameLoading}
            />
            <button
              type="submit"
              className="px-4 py-1 bg-brand-blue text-black rounded-lg font-semibold hover:bg-brand-blue/80 mt-1"
              disabled={usernameLoading || !usernameInput.trim()}
            >
              {usernameLoading ? 'Saving...' : (username ? 'Update Username' : 'Set Username')}
            </button>
          </form>
          {username && (
            <div className="mt-2 text-sm font-montserrat text-brand-blue">Current username: <span className="font-semibold">{username}</span></div>
          )}
        </div>
        <p className="text-lg font-montserrat text-dark font-medium mt-4 mb-2">Your Unique User ID:</p>
        <p className="font-mono text-sm font-montserrat text-dark break-all bg-brand-blue/10 p-2 rounded-md select-all">{userId}</p>
        <p className="text-sm font-montserrat text-dark/60 mt-2">This ID helps us store your data securely.</p>
      </div>

      {user?.isAnonymous && !showUpgrade && (
        <button
          onClick={() => setShowUpgrade(true)}
          className="w-full py-3 mb-4 bg-brand-blue text-black font-semibold rounded-lg hover:bg-brand-blue/80 active:bg-brand-blue/60 transition duration-300 ease-in-out shadow-lg"
        >
          Create Account & Link Data
        </button>
      )}

      {showUpgrade && (
        <form onSubmit={handleUpgrade} className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-brand-blue/40 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-brand-blue/40 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-brand-blue text-black rounded-lg font-semibold hover:bg-brand-blue/80"
            disabled={loading}
          >
            {loading ? 'Linking...' : 'Link My Data'}
          </button>
          <button
            type="button"
            className="w-full py-2 mt-2 bg-black text-white rounded-lg font-semibold hover:bg-brand-blue/20"
            onClick={() => setShowUpgrade(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      )}

      <button
        onClick={handleSignOut}
        className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-brand-blue hover:text-black active:bg-brand-blue/80 transition duration-300 ease-in-out shadow-lg"
      >
        Sign Out
      </button>
      {message && (
        <div className="mt-4 p-3 bg-brand-blue/10 text-black rounded-lg text-center border border-brand-blue/30">
          {message}
        </div>
      )}
      <p className="text-sm font-montserrat text-dark/70 mt-4">
        {user?.isAnonymous
          ? 'You are currently using the app as a guest. You can create an account to save your data permanently and access it from any device.'
          : 'You are signed in with your account. Your data is securely linked to your email.'}
      </p>
    </div>
  );
};

export default ProfilePage;