
import React from 'react';
import { Link } from 'react-router-dom';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="pt-20 animate-in fade-in duration-700 bg-[#F6F6F4]">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Production Portfolios</span>
          <h1 className="text-5xl font-serif mb-16 leading-tight max-w-3xl">Orchestrating Scale with Calm Precision.</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#C6A15B]/10 border border-[#C6A15B]/10">
            {EVENTS.map((event, i) => {
              const isPrimary = event.title === 'Weddings';
              const ctaText = 
                event.title === 'Weddings' ? 'View Wedding Capabilities' :
                event.title === 'Corporate & Office' ? 'View Corporate Services' :
                event.title === 'Religious & Community' ? 'View Community Events' :
                'View Private Event Capabilities';

              return (
                <div 
                  key={i} 
                  className={`relative group bg-white p-16 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between ${isPrimary ? 'md:col-span-2 py-24' : ''}`}
                >
                  {/* Subtle Light Beam / Focus Effect */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isPrimary ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(198,161,91,0.06) 0%, rgba(198,161,91,0) 70%)'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A7A7A] block mb-6">{event.focus}</span>
                    <h3 className={`font-serif mb-8 ${isPrimary ? 'text-4xl' : 'text-2xl'}`}>{event.title}</h3>
                    <p className={`text-[#7A7A7A] font-light leading-relaxed mb-12 ${isPrimary ? 'max-w-3xl text-lg' : 'max-w-lg'}`}>
                      {event.description}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <Link 
                      to="/contact" 
                      className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] border-b border-transparent hover:border-[#C6A15B] transition-all pb-1"
                    >
                      {ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1C1C1C] py-32 px-6 text-white overflow-hidden relative">
        {/* Subtle background wash for the footer section */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at center, #C6A15B 0%, transparent 80%)' }} />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Standard Operations</span>
            <h2 className="text-4xl font-serif mb-8">Executive Staffing & Orchestration</h2>
            <p className="text-white/60 font-light leading-relaxed mb-8">
              Reliability is the currency of high-stakes events. Every Neer production is overseen by an executive captain with extensive large-scale logistical training. Our methodology ensures that complexity never compromises the guest experience.
            </p>
            <ul className="space-y-4 text-[10px] tracking-widest uppercase text-[#C6A15B]">
              <li>• Senior Captain Oversight</li>
              <li>• Standardized Logistics Protocol</li>
              <li>• High-Throughput Guest Flow Management</li>
            </ul>
          </div>
          <div className="aspect-square bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/5">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FChefService1.jpg?alt=media&token=d52b53e1-500a-48e8-9a29-40db22bdc512" 
              alt="Staff Detail" 
              className="w-full h-full object-cover opacity-80 transition-all duration-700 ease-out hover:opacity-100 hover:scale-[1.02]" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
