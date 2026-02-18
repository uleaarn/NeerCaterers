
import React, { useState } from 'react';
import { Inquiry, InquiryStatus } from '../types';
import { EMAIL_TEMPLATES } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Wedding',
    date: '',
    guests: '',
    location: '',
    notes: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: Inquiry = {
      id: generateInquiryId(),
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.type,
      eventDate: formData.date,
      guestCount: parseInt(formData.guests) || 0,
      location: formData.location,
      status: 'New' as InquiryStatus,
      assignedTo: 'Unassigned',
      internalNotes: '',
      timestamp: new Date().toLocaleString()
    };

    // 1) Internal Storage (Mock Database)
    const existingInquiries = JSON.parse(localStorage.getItem('neer_inquiries') || '[]');
    localStorage.setItem('neer_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

    // 2) Trigger Client Confirmation
    const clientEmail = EMAIL_TEMPLATES.CLIENT_CONFIRMATION(newInquiry.clientName);
    simulateEmailSend(clientEmail.subject, clientEmail.body, newInquiry.email);

    // 3) Trigger Internal Notification
    const internalEmail = EMAIL_TEMPLATES.INTERNAL_NOTIFICATION(newInquiry);
    simulateEmailSend(internalEmail.subject, internalEmail.body, 'events@neercaterers.com');

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-60 px-6 text-center animate-in zoom-in duration-500">
        <h2 className="text-4xl font-serif mb-6">Consultation Requested</h2>
        <p className="text-[#7A7A7A] max-w-md mx-auto font-light leading-relaxed">
          Your inquiry has been logged within our production system. A senior coordinator will evaluate the logistical requirements and contact you within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 animate-in fade-in duration-700">
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block text-center">Initial Inquiry</span>
        <h1 className="text-5xl font-serif mb-12 text-center">Request a Consultation</h1>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Full Name</label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Email Address</label>
              <input 
                required 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Phone Number</label>
              <input 
                required 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Event Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors"
              >
                <option>Wedding</option>
                <option>Corporate</option>
                <option>Religious</option>
                <option>Private</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Event Date / Timeframe</label>
              <input 
                type="text" 
                placeholder="MM/DD/YYYY or General Season" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Guest Count (Approx)</label>
              <input 
                type="number" 
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Event Location / Venue Details</label>
            <input 
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors" 
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#7A7A7A]">Additional Notes (Cuisines, Requirements)</label>
            <textarea 
              rows={4} 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="bg-transparent border-b border-[#C6A15B]/30 py-2 focus:border-[#C6A15B] outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button type="submit" className="w-full py-6 bg-[#1C1C1C] text-white uppercase tracking-[0.3em] text-xs hover:bg-black transition-all">
            Initiate Consultation
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
