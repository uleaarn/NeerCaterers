
import React from 'react';
import { LIVE_STATIONS } from '../constants';

const LiveStations: React.FC = () => {
  return (
    <div className="pt-20 animate-in fade-in duration-700">
      <section className="py-24 px-6 bg-[#1C1C1C] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Theatrical Precision</span>
          <h1 className="text-5xl font-serif mb-8">Live Stations & Experiences</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Operational confidence meets culinary theater. Our live stations are engineered for high throughput without sacrificing the artisanal touch.
          </p>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
          {LIVE_STATIONS.map((station, i) => (
            <div key={i} className="group">
              <div className="overflow-hidden mb-8 aspect-video bg-neutral-200">
                 <img 
                    src={station.image || `https://picsum.photos/seed/station-${i}/800/450`} 
                    className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-[1.05] group-hover:contrast-[1.05]" 
                    alt={station.title}
                  />
              </div>
              <h3 className="text-2xl font-serif mb-4">{station.title}</h3>
              <div className="w-full h-[1px] bg-[#C6A15B]/20 mb-6" />
              <p className="text-[#7A7A7A] font-light leading-relaxed">
                {station.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#F6F6F4] border-t border-[#C6A15B]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8 italic">“Flow is as important as flavor.”</h2>
          <p className="text-[#7A7A7A] font-light">
            Our teams are trained in guest management to ensure that the excitement of live cooking never results in an executive bottleneck.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LiveStations;