
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, COLORS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#F6F6F4]/95 backdrop-blur-sm border-b border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="text-xl tracking-[0.2em] font-serif uppercase text-[#1C1C1C]">Neer Caterers</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#7A7A7A] -mt-1">Montclair | New Jersey</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === item.path ? 'text-[#C6A15B]' : 'text-[#7A7A7A] hover:text-[#1C1C1C]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#1C1C1C]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#F6F6F4] border-b border-[#C6A15B]/20 p-8 flex flex-col space-y-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg tracking-widest uppercase font-serif text-[#1C1C1C]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
