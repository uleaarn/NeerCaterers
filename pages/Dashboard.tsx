
import React, { useState, useEffect } from 'react';
import { Inquiry, InquiryStatus } from '../types';

const Dashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('neer_inquiries') || '[]');
    setInquiries(data);
  }, []);

  const updateStatus = (id: string, newStatus: InquiryStatus) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    localStorage.setItem('neer_inquiries', JSON.stringify(updated));
  };

  const updateNotes = (id: string, notes: string) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, internalNotes: notes } : inq);
    setInquiries(updated);
    localStorage.setItem('neer_inquiries', JSON.stringify(updated));
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = filter === 'All' || inq.status === filter;
    const matchesSearch = 
      inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inq.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 bg-[#F6F6F4] px-6 pb-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-3 block">Internal Operations</span>
            <h1 className="text-4xl font-serif text-[#1C1C1C]">Consultation Ledger</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <input 
              type="text" 
              placeholder="SEARCH CLIENTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-neutral-200 px-4 py-2 text-[10px] tracking-widest outline-none focus:border-[#C6A15B] w-64"
            />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white border border-neutral-200 px-4 py-2 text-[10px] tracking-widest outline-none"
            >
              <option value="All">ALL STATUSES</option>
              <option value="New">NEW</option>
              <option value="Contacted">CONTACTED</option>
              <option value="Qualified">QUALIFIED</option>
              <option value="Booked">BOOKED</option>
              <option value="Closed">CLOSED</option>
            </select>
          </div>
        </header>

        <div className="bg-white border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-medium">ID / Time</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-medium">Client Detail</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-medium">Event Strategy</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-medium">Status</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-medium">Internal Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-neutral-50 hover:bg-[#F6F6F4]/50 transition-colors">
                  <td className="p-6">
                    <div className="text-[11px] font-medium text-[#1C1C1C] mb-1">{inq.id}</div>
                    <div className="text-[9px] text-[#7A7A7A]">{inq.timestamp}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-serif mb-1">{inq.clientName}</div>
                    <div className="text-[10px] text-[#7A7A7A]">{inq.email}</div>
                    <div className="text-[10px] text-[#7A7A7A]">{inq.phone}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-[11px] uppercase tracking-wider text-[#1C1C1C] mb-1">{inq.eventType}</div>
                    <div className="text-[10px] text-[#7A7A7A]">{inq.eventDate} • {inq.guestCount} Guests</div>
                    <div className="text-[10px] text-[#7A7A7A] italic mt-1">{inq.location}</div>
                  </td>
                  <td className="p-6">
                    <select 
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                      className={`text-[9px] tracking-widest uppercase border px-2 py-1 outline-none transition-colors ${
                        inq.status === 'New' ? 'border-[#C6A15B] text-[#C6A15B] bg-[#C6A15B]/5' : 
                        inq.status === 'Booked' ? 'border-green-600 text-green-600 bg-green-50' : 
                        'border-neutral-300 text-neutral-600'
                      }`}
                    >
                      <option value="New">NEW</option>
                      <option value="Contacted">CONTACTED</option>
                      <option value="Qualified">QUALIFIED</option>
                      <option value="Booked">BOOKED</option>
                      <option value="Closed">CLOSED</option>
                    </select>
                  </td>
                  <td className="p-6">
                    <textarea 
                      placeholder="ADD INTERNAL NOTE..."
                      value={inq.internalNotes}
                      onChange={(e) => updateNotes(inq.id, e.target.value)}
                      className="w-full bg-transparent border-none text-[11px] font-light resize-none outline-none focus:ring-0"
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-[#7A7A7A] font-serif italic">
                    No inquiries match the current ledger filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
