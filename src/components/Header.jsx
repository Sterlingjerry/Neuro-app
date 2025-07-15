import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import NavLink from './NavLink';
import Logo from './Logo';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const { setCurrentPage, userId, auth, db } = useContext(AppContext);
  const user = auth?.currentUser;
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async () => {
      if (user && db) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || '');
        } else {
          setUsername('');
        }
      }
    };
    fetchUsername();
  }, [user, db]);
  let userLabel = '';
  if (user) {
    if (username) {
      userLabel = username;
    } else if (user.isAnonymous) {
      userLabel = 'Anonymous';
    } else if (user.email) {
      userLabel = user.email;
    } else {
      userLabel = userId;
    }
  }
  return (
    <header className="bg-transparent shadow-none py-4 px-4 md:px-10 flex flex-col gap-2 md:gap-0 mb-6 md:mb-8 border-b-0 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
          <div className="flex items-center gap-3 md:gap-4">
            <Logo />
            <h1 className="text-3xl md:text-4xl font-extrabold font-montserrat text-brand-black tracking-tight drop-shadow">NEURO</h1>
          </div>
          <span className="text-xs md:text-base text-brand-black/80 font-medium font-montserrat md:ml-4 ml-1 mt-1 md:mt-0">Let&apos;s Talk, Let&apos;s Heal, Let&apos;s Grow</span>
        </div>
        {user && (
          <span className="text-brand-blue text-xs md:text-sm font-montserrat mt-2 md:mt-0 md:ml-8">Welcome, <span className="font-semibold">{userLabel}</span></span>
        )}
      </div>
      <nav className="flex flex-wrap justify-center md:justify-center gap-2 md:gap-4 mt-2 md:mt-4 w-full">
        <NavLink onClick={() => setCurrentPage('home')}>Home</NavLink>
        <NavLink onClick={() => setCurrentPage('checkin')}>Daily Check-in</NavLink>
        <NavLink onClick={() => setCurrentPage('journal')}>Journal</NavLink>
        <NavLink onClick={() => setCurrentPage('breathing')}>Breathing</NavLink>
        <NavLink onClick={() => setCurrentPage('resources')}>Resources</NavLink>
        <NavLink onClick={() => setCurrentPage('profile')}>Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;
