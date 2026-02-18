
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white py-24 px-6 border-t border-[#C6A15B]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* HQ Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#7A7A7A] mb-8 font-medium">Headquarters</h4>
          <p className="text-lg font-serif">Montclair, New Jersey</p>
          <p className="text-[#7A7A7A] text-sm mt-2 font-light">Serving NJ | NY | PA</p>
          <div className="mt-8 flex flex-col space-y-1">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#C6A15B]/60">Operational Studio</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#7A7A7A]">Executive Portfolios</span>
          </div>
        </div>

        {/* Contact Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#7A7A7A] mb-8 font-medium">Inquiries</h4>
          <p className="text-lg font-serif">973.555.0123</p>
          <p className="text-[#7A7A7A] text-sm mt-2 font-light hover:text-[#C6A15B] transition-colors">
            <a href="mailto:events@neercaterers.com">events@neercaterers.com</a>
          </p>
        </div>

        {/* Social Column */}
        <div className="col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#7A7A7A] mb-8 font-medium">Connect</h4>
          <div className="flex flex-col space-y-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#7A7A7A] hover:text-white transition-all duration-500 group">
              <svg className="w-3.5 h-3.5 text-[#C6A15B] opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-[9px] tracking-[0.3em] uppercase">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#7A7A7A] hover:text-white transition-all duration-500 group">
              <svg className="w-3.5 h-3.5 text-[#C6A15B] opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="text-[9px] tracking-[0.3em] uppercase">LinkedIn</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#7A7A7A] hover:text-white transition-all duration-500 group">
              <svg className="w-3.5 h-3.5 text-[#C6A15B] opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="text-[9px] tracking-[0.3em] uppercase">Facebook</span>
            </a>
          </div>
        </div>

        {/* Operational Note */}
        <div className="col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#7A7A7A] mb-8 font-medium">Engagement Status</h4>
          <p className="text-[#7A7A7A] text-sm leading-relaxed font-light italic">
            "To preserve our commitment to logistical absolute, we maintain a restricted production schedule. We are currently accepting consultations for the 2025-2026 season."
          </p>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.2em] uppercase text-[#4A4A4A]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
          <span className="text-white/30 font-light">&copy; {new Date().getFullYear()} Neer Caterers Production Group.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#C6A15B] transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-[#C6A15B] transition-colors">Accessibility Standards</a>
          </div>
        </div>
        <div className="mt-8 md:mt-0 text-[#C6A15B]/40">
          Montclair • New York • Philadelphia
        </div>
      </div>
    </footer>
  );
};

export default Footer;
