
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(false);

    // Simulated high-trust verification delay
    setTimeout(() => {
      if (passcode === 'NEER2025') {
        sessionStorage.setItem('neer_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(true);
        setIsVerifying(false);
        setPasscode('');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12 animate-in fade-in duration-1000">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#C6A15B] mb-4 block">Executive Gateway</span>
          <h1 className="text-3xl font-serif mb-2">Staff Portal</h1>
          <p className="text-[#7A7A7A] text-[10px] tracking-widest uppercase italic">Restricted Ledger Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center space-y-4">
            <input 
              type="password"
              placeholder="ENTER PASSCODE"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.toUpperCase())}
              className={`w-full bg-transparent border-b text-center text-lg tracking-[0.5em] font-light py-4 outline-none transition-all ${
                error ? 'border-red-500 text-red-500' : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
              }`}
              disabled={isVerifying}
              autoFocus
            />
            {error && (
              <span className="text-[9px] text-red-500 tracking-[0.2em] uppercase">Invalid Credentials. Authorization Denied.</span>
            )}
          </div>

          <button 
            type="submit"
            disabled={isVerifying}
            className="w-full py-5 border border-[#C6A15B] text-[#C6A15B] uppercase tracking-[0.4em] text-[10px] font-semibold hover:bg-[#C6A15B] hover:text-[#1C1C1C] transition-all disabled:opacity-30"
          >
            {isVerifying ? 'Verifying Identity...' : 'Authorize Access'}
          </button>
        </form>

        <div className="mt-24 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-[9px] tracking-[0.3em] uppercase text-[#7A7A7A] hover:text-white transition-colors"
          >
            Return to Public Portfolio
          </button>
        </div>
      </div>
      
      {/* Decorative vertical lines for architecture feel */}
      <div className="fixed left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="fixed right-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
    </div>
  );
};

export default AdminLogin;
