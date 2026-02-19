
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_REFLECTIONS, FAQ_ITEMS } from '../constants';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First question open by default

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FLandingPageImage.avif?alt=media&token=c5664136-a46b-4ec7-9981-9a5679f8e5dd" 
          alt="Refined Event Space" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-8 leading-tight">
            Classic depth.<br />Modern execution.
          </h1>
          <p className="text-white/80 text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-12 font-light">
            Providing high-trust, large-scale catering solutions across the Tri-State area. Scaled with precision, delivered with calm confidence.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link 
              to="/contact" 
              className="relative px-12 py-5 bg-white text-[#1C1C1C] uppercase tracking-[0.25em] text-[10px] font-semibold hover:bg-[#F6F6F4] transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_20px_rgba(198,161,91,0.15)] group overflow-hidden border border-white"
            >
              {/* Subtle light beam internal effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-tr from-white via-[#C6A15B] to-white pointer-events-none" />
              <span className="relative z-10">Request a Catering Consultation</span>
            </Link>
            <Link 
              to="/events" 
              className="px-10 py-4 bg-transparent text-white/50 uppercase tracking-[0.25em] text-[10px] hover:text-white transition-all duration-500 border-b border-transparent hover:border-white/20"
            >
              Speak With Our Events Team
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">The Brand Standard</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                Executive reliability<br />at every scale.
              </h2>
            </div>
            <div className="text-[#7A7A7A] space-y-6 text-lg font-light leading-relaxed">
              <p>
                At Neer Caterers, we define luxury through operational excellence. We understand that large-scale events—whether a thousand-guest wedding or a critical corporate gala—demand more than just culinary skill; they require flawless logistics.
              </p>
              <p>
                From our kitchen in Montclair, we coordinate complex productions that span New Jersey, New York, and Pennsylvania, ensuring that every plate is a testament to our precision and every station a masterclass in guest flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Grid */}
      <section className="bg-[#1C1C1C] py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Operational Excellence', desc: 'Systems-driven management ensures consistency from the first appetizer to the final dessert.' },
            { title: 'Scale without Chaos', desc: 'Expertise in high-volume environments, managing guest movement with executive poise.' },
            { title: 'Multi-Cuisine Mastery', desc: 'Authentic flavor profiles across South Asian and World cuisines, handled with technical depth.' }
          ].map((item, i) => (
            <div key={i} className="border-t border-[#C6A15B]/20 pt-8">
              <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
              <p className="text-[#7A7A7A] font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Reflections */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-12 block text-center">Client Reflections</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {CLIENT_REFLECTIONS.map((item, i) => (
              <div key={i} className="flex flex-col">
                <blockquote className="text-[#1C1C1C] font-serif text-xl leading-relaxed mb-6 italic">
                  "{item.quote}"
                </blockquote>
                <cite className="text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] not-italic">
                  — {item.attribution}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-[#F6F6F4] border-t border-[#C6A15B]/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A7A7A] mb-4 block">Operational FAQ</span>
            <h2 className="text-2xl font-serif text-[#1C1C1C]">Common Inquiries</h2>
          </div>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="border-b border-[#C6A15B]/10">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-xs tracking-wider uppercase text-[#1C1C1C] font-medium group-hover:text-[#C6A15B] transition-colors">
                    {faq.question}
                  </span>
                  <span className={`text-[10px] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-[#7A7A7A] font-light leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image CTA / Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative h-[600px] group overflow-hidden">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2Fcorporatecatering2_fb.jpg?alt=media&token=ecd6cd38-820d-4ecc-9cd0-f3cbf2fe0e13" 
            alt="Event Detail" 
            className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl md:text-5xl text-white font-serif mb-8">Classic Depth. Delivered.</h2>
            <Link 
              to="/contact" 
              className="text-[#C6A15B] uppercase tracking-[0.3em] text-xs border-b border-[#C6A15B] pb-2 hover:text-white hover:border-white transition-all"
            >
              Initiate Consultation Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
