
import React from 'react';

const Process: React.FC = () => {
  return (
    <div className="pt-20 animate-in fade-in duration-700">
      <section className="py-24 px-6 border-b border-[#C6A15B]/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Our Methodology</span>
          <h1 className="text-5xl font-serif mb-8">Precision-Led Catering</h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Reliability over hype. We have spent decades refining a process that eliminates variables and guarantees results.
          </p>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          {[
            { step: '01', title: 'Consultation & Strategy', desc: 'We begin by understanding the architectural goals of your event—guest counts, timeline constraints, and dietary protocols.' },
            { step: '02', title: 'Menu Orchestration', desc: 'Selecting a cuisine portfolio that balances tradition with modern presentation, tailored to the logistical flow of the venue.' },
            { step: '03', title: 'Site Inspection & Deployment', desc: 'Our team performs rigorous site assessments to ensure power, water, and load-in logistics are flawlessly planned.' },
            { step: '04', title: 'Production & Service', desc: 'The execution phase. Managed by veteran captains with a focus on silence, speed, and standard-of-excellence.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-12">
              <span className="text-3xl font-serif text-[#C6A15B] pt-1">{item.step}</span>
              <div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-[#7A7A7A] font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Process;
