
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DETAILED_MENUS } from '../constants';
import { MenuCuisine, MenuDish } from '../types';

const DetailedMenu: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const initialSection = query.get('section') || DETAILED_MENUS[0].id;

  const [activeCuisineId, setActiveCuisineId] = useState(initialSection);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    vegOnly: false,
    liveOnly: false,
    butlerOnly: false,
    extraCharge: false
  });

  useEffect(() => {
    const section = query.get('section');
    if (section) setActiveCuisineId(section);
  }, [search]);

  const activeCuisine = useMemo(() => 
    DETAILED_MENUS.find(m => m.id === activeCuisineId) || DETAILED_MENUS[0],
    [activeCuisineId]
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const expandAll = () => {
    setExpandedCategories(activeCuisine.sections.map(s => s.category));
  };

  const collapseAll = () => {
    setExpandedCategories([]);
  };

  const isDishVisible = (dish: MenuDish) => {
    if (searchQuery && !dish.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.vegOnly && !dish.isVeg) return false;
    if (filters.liveOnly && !dish.isLive) return false;
    if (filters.butlerOnly && !dish.isButlerPassed) return false;
    if (filters.extraCharge && !dish.isExtraCharge) return false;
    return true;
  };

  const filteredSections = useMemo(() => {
    return activeCuisine.sections.map(section => ({
      ...section,
      visibleDishes: section.dishes.filter(isDishVisible)
    })).filter(section => section.visibleDishes.length > 0);
  }, [activeCuisine, searchQuery, filters]);

  const cuisineSummary = useMemo(() => {
    const totalSelections = filteredSections.reduce((acc, s) => acc + s.visibleDishes.length, 0);
    const hasLive = filteredSections.some(s => s.visibleDishes.some(d => d.isLive));
    return {
      title: activeCuisine.title,
      categoryCount: filteredSections.length,
      selectionCount: totalSelections,
      hasLive
    };
  }, [filteredSections, activeCuisine]);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-20 bg-[#F6F6F4] min-h-screen animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 border-b border-[#C6A15B]/10 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Reference Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-[#1C1C1C]">Detailed Menu Reference</h1>
          <p className="text-[#7A7A7A] text-sm max-w-2xl mx-auto font-light leading-relaxed italic">
            This reference outlines our complete culinary range. Final menus are curated per event based on guest count, service style, and preferences.
          </p>
        </div>
      </section>

      {/* Sticky Navigation & Utility Bar */}
      <div className="sticky top-20 z-40 bg-white border-b border-[#C6A15B]/10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Cuisine Selector */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-[#F6F6F4]">
            {DETAILED_MENUS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveCuisineId(m.id);
                  setExpandedCategories([]);
                }}
                className={`whitespace-nowrap px-8 py-5 text-[10px] tracking-[0.2em] uppercase transition-all border-b-2 ${
                  activeCuisineId === m.id 
                    ? 'text-[#1C1C1C] border-[#C6A15B]' 
                    : 'text-[#7A7A7A] border-transparent hover:text-[#1C1C1C]'
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>

          {/* Utility Bar */}
          <div className="px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#F6F6F4]/50">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="SEARCH DISHES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#C6A15B]/20 px-4 py-2.5 text-[10px] tracking-widest outline-none focus:border-[#C6A15B] transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'VEGETARIAN', key: 'vegOnly' as const },
                { label: 'LIVE STATIONS', key: 'liveOnly' as const },
                { label: 'BUTLER PASSED', key: 'butlerOnly' as const },
                { label: 'PREMIUM (+)', key: 'extraCharge' as const },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => toggleFilter(f.key)}
                  className={`group relative px-5 py-2.5 border text-[9px] tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                    filters[f.key] 
                      ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]' 
                      : 'border-[#C6A15B]/20 text-[#7A7A7A] hover:text-[#1C1C1C] bg-white'
                  }`}
                >
                  <span className="relative z-10">{f.label}</span>
                  
                  {/* Focus Beam - Underline */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#C6A15B] transition-all duration-500 ease-out ${
                    filters[f.key] ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100'
                  }`} />
                  
                  {/* Focus Beam - Wash */}
                  <div className={`absolute inset-0 bg-[#C6A15B] pointer-events-none transition-opacity duration-500 ${
                    filters[f.key] ? 'opacity-[0.06]' : 'opacity-0 group-hover:opacity-[0.04]'
                  }`} />
                </button>
              ))}
              {(searchQuery || Object.values(filters).some(Boolean)) && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ vegOnly: false, liveOnly: false, butlerOnly: false, extraCharge: false });
                  }}
                  className="text-[9px] ml-2 tracking-widest uppercase text-[#C6A15B] border-b border-transparent hover:border-[#C6A15B] transition-all"
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine Summary Bar */}
      <div className="bg-white border-b border-[#C6A15B]/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] tracking-widest uppercase text-[#7A7A7A]">
          <div className="flex items-center gap-4">
            <span className="text-[#1C1C1C] font-semibold">{cuisineSummary.title} Portfolio</span>
            <span className="text-[#C6A15B] opacity-50">•</span>
            <span>{cuisineSummary.categoryCount} Categories</span>
            <span className="text-[#C6A15B] opacity-50">•</span>
            <span>{cuisineSummary.selectionCount} Selections</span>
            {cuisineSummary.hasLive && (
              <>
                <span className="text-[#C6A15B] opacity-50">•</span>
                <span className="text-[#C6A15B]">Live Stations Available</span>
              </>
            )}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={expandAll} className="hover:text-[#1C1C1C] transition-colors">Expand All</button>
            <button onClick={collapseAll} className="hover:text-[#1C1C1C] transition-colors">Collapse All</button>
          </div>
        </div>
      </div>

      {/* Main Content Panel */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {filteredSections.length > 0 ? (
          <div className="space-y-4">
            {filteredSections.map((section, idx) => {
              const isExpanded = expandedCategories.includes(section.category) || searchQuery.length > 0;
              return (
                <div key={idx} className="bg-white border border-[#C6A15B]/10 group transition-all duration-300 hover:border-[#C6A15B]/50">
                  <button
                    onClick={() => toggleCategory(section.category)}
                    className={`w-full flex items-center justify-between p-8 text-left transition-colors ${isExpanded ? 'bg-[#F6F6F4]/30' : 'hover:bg-[#F6F6F4]/50'}`}
                  >
                    <div>
                      <h3 className="text-xl font-serif text-[#1C1C1C]">{section.category}</h3>
                      <p className="text-[10px] tracking-widest text-[#7A7A7A] uppercase mt-2">
                        {section.description} <span className="mx-2 opacity-30">·</span> {section.visibleDishes.length} selections
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-[#C6A15B]/20 flex items-center justify-center transition-transform duration-500 ${isExpanded ? 'rotate-180 bg-[#C6A15B]/10' : ''}`}>
                      <span className="text-[10px] text-[#C6A15B]">↓</span>
                    </div>
                  </button>

                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] border-t border-[#C6A15B]/10' : 'max-h-0'}`}>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                      {section.visibleDishes.map((dish, dIdx) => (
                        <div key={dIdx} className="flex items-start justify-between group py-2 border-b border-[#F6F6F4]">
                          <span className="text-sm text-[#1C1C1C] tracking-wide uppercase font-light">
                            {dish.name}
                          </span>
                          <div className="flex gap-2">
                            {dish.isLive && <span className="text-[7px] bg-[#C6A15B]/10 text-[#C6A15B] px-1 py-0.5 border border-[#C6A15B]/20">LIVE</span>}
                            {dish.isButlerPassed && <span className="text-[7px] bg-neutral-100 text-neutral-500 px-1 py-0.5">BUTLER</span>}
                            {dish.isExtraCharge && <span className="text-[7px] bg-neutral-800 text-white px-1 py-0.5 font-bold">PREMIUM</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-8 pb-8">
                       <p className="text-[10px] text-[#7A7A7A] italic">
                         Final selections and pairings are determined during the consultation phase to ensure event narrative and flow.
                       </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-[#7A7A7A] font-serif text-2xl italic mb-4">No results matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({ vegOnly: false, liveOnly: false, butlerOnly: false, extraCharge: false });
              }}
              className="text-[10px] tracking-widest uppercase text-[#C6A15B] border-b border-[#C6A15B]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Footer Note */}
      <section className="py-24 px-6 bg-[#1C1C1C] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] mb-8">Executive Planning</p>
          <h2 className="text-3xl font-serif mb-8 italic">Ready to curate your production?</h2>
          <p className="text-white/60 font-light max-w-xl mx-auto mb-12">
            The dishes listed here are architectural components. We recommend a consultation to discuss the flow and narrative of your specific event.
          </p>
          <a 
            href="#/contact" 
            className="inline-block px-12 py-5 border border-[#C6A15B] text-[#C6A15B] uppercase tracking-widest text-[10px] hover:bg-[#C6A15B] hover:text-white transition-all duration-500"
          >
            Initiate Consultation Process
          </a>
        </div>
      </section>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DetailedMenu;
