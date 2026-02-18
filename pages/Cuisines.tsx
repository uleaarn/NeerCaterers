
import React from 'react';
import { Link } from 'react-router-dom';
import { CUISINES } from '../constants';

const Cuisines: React.FC = () => {
  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="py-24 px-6 border-b border-[#C6A15B]/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Culinary Architecture</span>
          <h1 className="text-5xl font-serif mb-8">A Depth of Capability</h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We do not simply offer menus; we architect culinary experiences. Our kitchens are staffed with masters of regional authenticity and modern technique.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {CUISINES.map((cuisine, index) => (
            <div key={cuisine.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-neutral-100 relative group">
                <img 
                  src={cuisine.image} 
                  alt={cuisine.title} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.015] group-hover:contrast-[1.06] group-hover:brightness-[1.03]"
                />
                
                {/* Premium Focus & Spotlight Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
                  style={{
                    background: `
                      radial-gradient(circle at 45% 40%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%),
                      radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 100%)
                    `
                  }} 
                />

                {/* Hover Spotlight Enhancement (Desktop Only) */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out hidden md:block"
                  style={{
                    background: 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 50%)',
                    mixBlendMode: 'soft-light'
                  }} 
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-serif mb-6">{cuisine.title}</h2>
                <div className="w-12 h-[1px] bg-[#C6A15B] mb-8" />
                <p className="text-[#7A7A7A] text-lg font-light leading-relaxed mb-10">
                  {cuisine.description}
                </p>
                <div className="flex flex-col space-y-4">
                  <Link 
                    to={`/menu?section=${cuisine.id}`}
                    className="text-[11px] tracking-widest uppercase text-[#1C1C1C] border-b border-[#1C1C1C]/20 w-max pb-1 hover:border-[#C6A15B] hover:text-[#C6A15B] transition-all"
                  >
                    Explore Representative Dishes
                  </Link>
                  <p className="text-[#7A7A7A] text-[10px] italic">
                    Final menus are customized per event.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cuisines;
