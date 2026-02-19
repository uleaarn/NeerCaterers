
import React from 'react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  return (
    <div className="pt-20 bg-[#F6F6F4] min-h-screen animate-in fade-in duration-700">
      {/* H1: Hero Section */}
      <section className="pt-32 pb-24 px-6 border-b border-[#C6A15B]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-8 text-[#1C1C1C]">Events We Cater</h1>
          <p className="text-[#7A7A7A] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            From 50-person dinners to 500+ guest celebrations, we structure service around specific needs. Every detail — from staffing ratios to plate timing — is planned in advance.
          </p>
        </div>
      </section>

      {/* H2: Event Curations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif mb-16 text-center text-[#1C1C1C]">Event Curations</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#C6A15B]/10 border border-[#C6A15B]/10">
          {/* H3: Weddings */}
          <div className="bg-white p-12 md:p-16">
            <h3 className="text-2xl font-serif mb-6 text-[#1C1C1C]">Weddings</h3>
            <p className="text-[#7A7A7A] text-sm font-light leading-relaxed mb-8">
              Multi-day Indian weddings with distinct menus for each function. Sangeet, mehndi, ceremony, and reception — each with its own food program, service style, and staffing plan.
            </p>
            <ul className="space-y-3 text-[11px] tracking-widest uppercase text-[#7A7A7A]">
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Multi-function menu planning across 2-5 events</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Guest counts from 100 to 500+</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Buffet, plated, and live station formats</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Coordination with venues and event planners</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Dedicated event manager assigned per wedding</li>
            </ul>
          </div>

          {/* H3: Corporate & Office */}
          <div className="bg-white p-12 md:p-16">
            <h3 className="text-2xl font-serif mb-6 text-[#1C1C1C]">Corporate & Office</h3>
            <p className="text-[#7A7A7A] text-sm font-light leading-relaxed mb-8">
              Structured service for corporate lunches, team events, product launches, and client entertaining. Clean presentation, punctual delivery, dietary accommodation as standard.
            </p>
            <ul className="space-y-3 text-[11px] tracking-widest uppercase text-[#7A7A7A]">
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Box lunch, buffet, and platter formats</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Conference and boardroom service</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Standing reception and cocktail setups</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Dietary labeling and allergen management</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Setup and breakdown within corporate timelines</li>
            </ul>
          </div>

          {/* H3: Religious & Community */}
          <div className="bg-white p-12 md:p-16">
            <h3 className="text-2xl font-serif mb-6 text-[#1C1C1C]">Religious & Community</h3>
            <p className="text-[#7A7A7A] text-sm font-light leading-relaxed mb-8">
              Temple events, prayer ceremonies, community gatherings, and festival celebrations. We understand the protocols. Sattvic menus, Jain options, and pure vegetarian kitchens available.
            </p>
            <ul className="space-y-3 text-[11px] tracking-widest uppercase text-[#7A7A7A]">
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Pure vegetarian and sattvic menu options</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Jain preparation without onion and garlic</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Temple and community hall service experience</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Large-format prasad and langar-style service</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Flexible timing for ceremony-dependent schedules</li>
            </ul>
          </div>

          {/* H3: Private Parties */}
          <div className="bg-white p-12 md:p-16">
            <h3 className="text-2xl font-serif mb-6 text-[#1C1C1C]">Private Parties</h3>
            <p className="text-[#7A7A7A] text-sm font-light leading-relaxed mb-8">
              House parties, milestone celebrations, intimate dinners, and family gatherings. Scaled-down operations with full-service quality. Chef-attended or drop-off formats available.
            </p>
            <ul className="space-y-3 text-[11px] tracking-widest uppercase text-[#7A7A7A]">
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Guest counts from 25 to 150</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Home kitchen and outdoor setup capability</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Chef-attended live cooking options</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Drop-off with warming instructions available</li>
              <li className="flex gap-3"><span className="text-[#C6A15B]">•</span> Custom menus built around personal preferences</li>
            </ul>
          </div>
        </div>
      </section>

      {/* H2: Cuisines & Menus */}
      <section className="py-32 px-6 bg-white border-y border-[#C6A15B]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8 text-[#1C1C1C]">Cuisines & Menus</h2>
          <p className="text-[#7A7A7A] text-lg font-light leading-relaxed mb-12">
            Our menus span hundreds of dishes across five culinary traditions. Every event menu is custom-built to match your preferences, guest count, and format.
          </p>
          <Link 
            to="/cuisines" 
            className="inline-block px-12 py-5 bg-[#1C1C1C] text-white uppercase tracking-widest text-[10px] hover:bg-black transition-all"
          >
            Explore Traditions
          </Link>
        </div>
      </section>

      {/* H2: About Neer Caterers */}
      <section className="py-32 px-6 bg-[#F6F6F4]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center text-[#1C1C1C]">About Neer Caterers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-[#7A7A7A] text-sm font-light leading-relaxed">
              <p>
                Neer Caterers is the catering division of legacy Jalwa: Modern Indian Dining. We operate from a dedicated commissary kitchen in Montclair, New Jersey, serving the tri-state area through a process-built methodology. Every event begins with structured consultation, menu architecture, and logistics planning, executed by trained teams with clear protocols and zero improvisation.
              </p>
            </div>
            <div className="space-y-6 text-[#7A7A7A] text-sm font-light leading-relaxed">
              <p>
                We maintain expertise across five traditions to meet the genuine requirements of complex events. Our kitchens are staffed by specialist cooks organized by cuisine line, while our logistics team manages transport, equipment, and breakdown without subcontracting. We prioritize consistency and timing at any scale, from 50 to 500 guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Operational Proof */}
      <section className="py-32 px-6 border-t border-[#C6A15B]/10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-16 text-center text-[#1C1C1C]">Operational Proof</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Dedicated Commissary Kitchen",
                desc: "All production from our own facility in Montclair. No shared kitchens. No outsourced prep."
              },
              {
                title: "Specialist Teams by Cuisine",
                desc: "Each cuisine tradition is led by cooks with deep, specific expertise. Not generalists."
              },
              {
                title: "Full-Service Operations",
                desc: "We handle food, equipment, staffing, setup, service, and breakdown. One point of contact."
              },
              {
                title: "Tri-State Coverage",
                desc: "New Jersey, New York, and Pennsylvania. We travel with our own equipment and teams."
              }
            ].map((proof, i) => (
              <div key={i} className="flex flex-col border-l border-[#C6A15B]/20 pl-6">
                <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1C] font-semibold mb-3">{proof.title}</h4>
                <p className="text-[12px] text-[#7A7A7A] font-light leading-relaxed">{proof.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1C1C1C] text-center">
        <h2 className="text-3xl font-serif text-white mb-10 italic">Ready to initiate your production?</h2>
        <Link 
          to="/contact" 
          className="inline-block px-12 py-5 border border-[#C6A15B] text-[#C6A15B] uppercase tracking-widest text-[10px] hover:bg-[#C6A15B] hover:text-white transition-all duration-500"
        >
          Request a Consultation
        </Link>
      </section>
    </div>
  );
};

export default Events;
