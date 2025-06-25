'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false); 

  return (
    <header className="border-b h-20 px-6 flex items-center md:justify-around  justify-between relative">
      <Link href="/" className="text-3xl font-bold">Artistify</Link>

      <nav className="hidden md:flex space-x-12">
        <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
        <Link href="/artists" className="text-gray-700 hover:text-black">Artists</Link>
        <Link href="/onboard" className="text-gray-700 hover:text-black">Onboard</Link>
        <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
      </nav>

      <div className="md:hidden z-20">
        <button onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start px-6 py-4 space-y-4 z-10">
          <Link href="/" onClick={closeMenu} className="text-gray-700 hover:text-black">Home</Link>
          <Link href="/artists" onClick={closeMenu} className="text-gray-700 hover:text-black">Artists</Link>
          <Link href="/onboard" onClick={closeMenu} className="text-gray-700 hover:text-black">Onboard</Link>
          <Link href="/dashboard" onClick={closeMenu} className="text-gray-700 hover:text-black">Dashboard</Link>
        </div>
      )}
    </header>
  );
};

export { Navbar };
