
import React, { useState } from 'react';
import { Inquiry, InquiryStatus } from '../types';
import { EMAIL_TEMPLATES } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Wedding Production',
    date: '',
    guests: '',
    location: '',
    natureOfEvent: '',
    serviceStyle: 'Executive Buffet',
    dietaryMandates: 'Mixed Portfolio',
    cuisines: [] as string[],
    notes: ''
  });

  const cuisineOptions = ["North Indian", "South Indian", "Gujarati", "Indo-Chinese", "World Inter-Mix"];

  const generateInquiryId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NEER-${year}-${random}`;
  };

  const simulateEmailSend = (subject: string, body: string, recipient: string) => {
    console.group(`SIMULATED EMAIL TO: ${recipient}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`BODY: \n${body}`);
    console.groupEnd();
  };

  const toggleCuisine = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: Inquiry = {
      id: generateInquiryId(),
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.type,
      eventDate: formData.date,
      guestCount: formData.guests,
      location: formData.location,
      natureOfEvent: formData.natureOfEvent,
      serviceStyle: formData.serviceStyle,
      dietaryMandates: formData.dietaryMandates,
      cuisines: formData.cuisines,
      internalNotes: formData.notes,
      status: 'New Inquiry' as InquiryStatus,
      assignedTo: 'Unassigned',
      timestamp: new Date().toLocaleString()
    };

    const existingInquiries = JSON.parse(localStorage.getItem('neer_inquiries') || '[]');
    localStorage.setItem('neer_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

    const clientEmail = EMAIL_TEMPLATES.CLIENT_CONFIRMATION(newInquiry.clientName);
    simulateEmailSend(clientEmail.subject, clientEmail.body, newInquiry.email);

    const internalEmail = EMAIL_TEMPLATES.INTERNAL_NOTIFICATION(newInquiry);
    simulateEmailSend(internalEmail.subject, internalEmail.body, 'events@neercaterers.com');

    setSubmitted(true);
  };

  // Get today's date in YYYY-MM-DD for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="pt-40 pb-60 px-6 text-center animate-in zoom-in duration-500 bg-[#F6F6F4] min-h-screen">
        <h2 className="text-4xl font-serif mb-6 text-[#1C1C1C]">Inquiry Registered</h2>
        <p className="text-[#7A7A7A] max-w-md mx-auto font-light leading-relaxed">
          Your request has been successfully logged within our operational ledger. We are currently evaluating your requirements against our production schedule. You can expect a response regarding preliminary feasibility within 24–48 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#F6F6F4] min-h-screen animate-in fade-in duration-700">
      <section className="py-24 px-6 max-w-4xl mx-auto">
        {/* Page Title & Subtitle */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-serif mb-8 text-[#1C1C1C]">Request a Consultation</h1>
          <p className="text-[#7A7A7A] text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
            This formal inquiry allows our team to assess the logistical scope and feasibility of your production. 
            Neer Caterers maintains a restricted engagement schedule to preserve the absolute integrity of our service standards.
          </p>
        </div>
        
        <div className="bg-white border border-[#C6A15B]/10 p-12 md:p-20 shadow-sm">
          <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#C6A15B] mb-20 block text-center border-b border-[#F6F6F4] pb-8">
            Initial Inquiry Protocol
          </h2>

          <form onSubmit={handleSubmit} className="space-y-24">
            {/* Personnel Information */}
            <div className="space-y-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold border-l-2 border-[#C6A15B] pl-4">
                Personnel Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Professional Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Primary Contact Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                </div>
              </div>
            </div>

            {/* Logistical Overview */}
            <div className="space-y-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold border-l-2 border-[#C6A15B] pl-4">
                Logistical Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Engagement Classification</label>
                  <select 
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light appearance-none cursor-pointer"
                  >
                    <option>Wedding Production</option>
                    <option>Corporate & Executive</option>
                    <option>Religious & Community</option>
                    <option>Private Celebration</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Proposed Event Date</label>
                  <input 
                    required
                    type="date" 
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light appearance-none w-full" 
                  />
                  <span className="text-[9px] text-[#7A7A7A] italic">Valid future date required for internal surge-priority and lead-heat calculations.</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Estimated Guest Volume</label>
                  <input 
                    required
                    type="text" 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                  <span className="text-[9px] text-[#7A7A7A] italic">Numeric estimate required (e.g., 250). Used for strategic tiering and production volume modeling.</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Proposed Venue / Geographic Location</label>
                  <input 
                    required
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                  <span className="text-[9px] text-[#7A7A7A] italic">Specify venue name or City/State. Required for logistical feasibility and travel-risk assessment.</span>
                </div>
              </div>
            </div>

            {/* Service & Culinary Architecture */}
            <div className="space-y-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold border-l-2 border-[#C6A15B] pl-4">
                Service & Culinary Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Nature of Event</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sangeet, Boardroom Luncheon"
                    value={formData.natureOfEvent}
                    onChange={(e) => setFormData({...formData, natureOfEvent: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light" 
                  />
                  <span className="text-[9px] text-[#7A7A7A] italic">e.g., Sangeet, Boardroom Luncheon, Multi-day Gala, Reception.</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Preferred Service Format</label>
                  <select 
                    value={formData.serviceStyle}
                    onChange={(e) => setFormData({...formData, serviceStyle: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light appearance-none cursor-pointer"
                  >
                    <option>Executive Buffet</option>
                    <option>Plated Service</option>
                    <option>Live Station Theater</option>
                    <option>Multi-Format</option>
                    <option>Undetermined</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Dietary Mandates</label>
                  <select 
                    value={formData.dietaryMandates}
                    onChange={(e) => setFormData({...formData, dietaryMandates: e.target.value})}
                    className="bg-transparent border-b border-[#C6A15B]/20 py-2 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light appearance-none cursor-pointer"
                  >
                    <option>Vegetarian (Pure)</option>
                    <option>Jain</option>
                    <option>Sattvic</option>
                    <option>Mixed Portfolio</option>
                    <option>Undetermined</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Culinary Pillars of Interest</label>
                  <div className="grid grid-cols-1 gap-2">
                    {cuisineOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          onClick={() => toggleCuisine(opt)}
                          className={`w-4 h-4 border transition-colors flex items-center justify-center ${formData.cuisines.includes(opt) ? 'bg-[#1C1C1C] border-[#1C1C1C]' : 'border-[#C6A15B]/40 group-hover:border-[#C6A15B]'}`}
                        >
                          {formData.cuisines.includes(opt) && <div className="w-1.5 h-1.5 bg-[#C6A15B]" />}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] group-hover:text-[#1C1C1C]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Requirements */}
            <div className="space-y-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold border-l-2 border-[#C6A15B] pl-4">
                Contextual Requirements
              </h3>
              <div className="flex flex-col space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Production Notes & Logistical Constraints</label>
                <textarea 
                  rows={4} 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="bg-transparent border border-[#C6A15B]/10 p-4 focus:border-[#C6A15B] outline-none transition-colors text-sm font-light resize-none"
                  placeholder="Detail specific site requirements, cultural protocols, or specialized timeline considerations."
                ></textarea>
                <span className="text-[9px] text-[#7A7A7A] italic text-right">Detail specific site requirements, cultural protocols, or specialized timeline considerations.</span>
              </div>
            </div>

            {/* CTA SECTION */}
            <div className="pt-16 flex flex-col items-center space-y-8">
              <button 
                type="submit" 
                className="w-full md:w-auto px-20 py-6 bg-[#1C1C1C] text-white uppercase tracking-[0.4em] text-[10px] font-semibold hover:bg-black transition-all border border-transparent shadow-lg"
              >
                Initiate Production Inquiry
              </button>
              <p className="text-[10px] tracking-widest text-[#7A7A7A] uppercase text-center max-w-sm">
                Upon submission, your inquiry enters our executive review queue. A senior events coordinator will contact you to discuss availability.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
