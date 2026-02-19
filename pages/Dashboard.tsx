
import React, { useState, useEffect, useMemo } from 'react';
import { Inquiry, InquiryStatus } from '../types';

type SortConfig = {
  key: keyof Inquiry | 'priority';
  direction: 'asc' | 'desc';
} | null;

const Dashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'priority', direction: 'desc' });

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

  const getSignals = (inq: Inquiry) => {
    const now = new Date().getTime();
    const created = new Date(inq.timestamp).getTime();
    const event = new Date(inq.eventDate).getTime();
    const guests = parseInt(inq.guestCount.replace(/\D/g, '')) || 0;
    const diffDays = (event - now) / (1000 * 60 * 60 * 24);
    const ageHours = (now - created) / (1000 * 60 * 60);

    const isStrategic = guests > 300;
    const isLarge = guests >= 150;
    const isMedium = guests >= 50;

    let heat: 'HOT' | 'WARM' | 'COLD' = 'COLD';
    if (diffDays > 0 && diffDays < 90 && isLarge) heat = 'HOT';
    else if ((diffDays > 0 && diffDays < 180) || isMedium) heat = 'WARM';

    let atRisk = false;
    if (inq.status === 'New Inquiry' && ageHours > 24) atRisk = true;
    if (inq.status === 'Proposal Sent' && ageHours > 72) atRisk = true;
    if (inq.status === 'Tentative Hold' && ageHours > 168) atRisk = true;

    const priorityScore = (heat === 'HOT' ? 100 : heat === 'WARM' ? 50 : 0) + (atRisk ? 80 : 0) + (isStrategic ? 60 : 0);

    return { heat, atRisk, isStrategic, guests, priorityScore };
  };

  const processedInquiries = useMemo(() => {
    let filtered = inquiries.filter(inq => {
      const isClosed = inq.status === 'Closed – Lost';
      const matchesStatus = statusFilter === 'All' 
        || (statusFilter === 'Active' && !isClosed)
        || (statusFilter === 'Action Required' && getSignals(inq).atRisk)
        || inq.status === statusFilter;
      
      const matchesSearch = inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) 
        || inq.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (sortConfig.key === 'priority') {
          const scoreA = getSignals(a).priorityScore;
          const scoreB = getSignals(b).priorityScore;
          return sortConfig.direction === 'asc' ? scoreA - scoreB : scoreB - scoreA;
        }

        let valA: any = a[sortConfig.key as keyof Inquiry];
        let valB: any = b[sortConfig.key as keyof Inquiry];

        if (sortConfig.key === 'timestamp' || sortConfig.key === 'eventDate') {
          valA = new Date(valA).getTime() || 0;
          valB = new Date(valB).getTime() || 0;
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [inquiries, statusFilter, searchTerm, sortConfig]);

  return (
    <div className="min-h-screen pt-24 bg-[#F6F6F4] px-6 pb-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col mb-12 gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-3 block font-semibold">Production Ledger</span>
              <h1 className="text-4xl font-serif text-[#1C1C1C]">Executive Operations</h1>
            </div>
            <input 
              type="text" 
              placeholder="SEARCH CLIENTS OR ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-neutral-200 px-4 py-3 text-[10px] tracking-widest outline-none focus:border-[#C6A15B] w-full md:w-80 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-white p-4 border border-neutral-100 shadow-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-[8px] uppercase tracking-widest text-[#7A7A7A] ml-1">Workflow Filter</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#F6F6F4] border-none px-3 py-2 text-[10px] tracking-widest outline-none min-w-[180px]"
              >
                <option value="Active">QUEUE: ALL ACTIVE</option>
                <option value="Action Required">QUEUE: ACTION REQUIRED (RISK)</option>
                <option value="New Inquiry">PIPELINE: NEW INQUIRY</option>
                <option value="Qualified – Needs Follow-up">PIPELINE: QUALIFIED</option>
                <option value="Proposal Sent">PIPELINE: PROPOSAL SENT</option>
                <option value="Revision in Progress">PIPELINE: REVISION</option>
                <option value="Tentative Hold">PIPELINE: TENTATIVE HOLD</option>
                <option value="Confirmed">PIPELINE: CONFIRMED</option>
                <option value="Closed – Lost">ARCHIVE: CLOSED</option>
                <option value="All">VIEW: ALL ENTRIES</option>
              </select>
            </div>
            
            <button 
              onClick={() => setSortConfig({ key: 'priority', direction: 'desc' })}
              className={`text-[9px] tracking-widest uppercase border px-4 py-2 transition-all ${sortConfig?.key === 'priority' ? 'bg-[#1C1C1C] text-[#C6A15B] border-[#1C1C1C]' : 'border-neutral-200 text-neutral-500'}`}
            >
              Surge Priority Leads
            </button>
          </div>
        </header>

        <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-semibold">Priority & ID</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-semibold">Client Detail</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-semibold">Logistics</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-semibold">Value Signal</th>
                <th className="p-6 text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A] font-semibold">Action & Pipeline Status</th>
              </tr>
            </thead>
            <tbody>
              {processedInquiries.map((inq) => {
                const signals = getSignals(inq);
                return (
                  <tr key={inq.id} className={`border-b border-neutral-50 hover:bg-[#F6F6F4]/40 transition-colors align-top ${signals.atRisk ? 'bg-red-50/30' : ''}`}>
                    <td className="p-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-[11px] font-bold text-[#1C1C1C]">{inq.id}</div>
                        <div className="flex gap-1 flex-wrap">
                          {signals.heat === 'HOT' && <span className="text-[7px] bg-[#C6A15B] text-white px-1.5 py-0.5 font-bold tracking-widest">HOT</span>}
                          {signals.atRisk && <span className="text-[7px] bg-red-600 text-white px-1.5 py-0.5 font-bold tracking-widest uppercase">Risk</span>}
                          {signals.isStrategic && <span className="text-[7px] bg-[#1C1C1C] text-[#C6A15B] px-1.5 py-0.5 font-bold tracking-widest uppercase">Strategic</span>}
                        </div>
                        <div className="text-[9px] text-[#7A7A7A] mt-1">Rec: {inq.timestamp}</div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-sm font-serif mb-1 text-[#1C1C1C]">{inq.clientName}</div>
                      <div className="text-[10px] text-[#7A7A7A] font-light">{inq.email}</div>
                      <div className="text-[10px] text-[#7A7A7A] font-light">{inq.phone}</div>
                    </td>
                    <td className="p-6">
                      <div className="text-[11px] uppercase tracking-wider text-[#1C1C1C] font-medium mb-1">{inq.eventType}</div>
                      <div className="text-[10px] text-[#7A7A7A] mb-1">{inq.eventDate}</div>
                      <div className="text-[9px] text-[#C6A15B] italic tracking-wide">{inq.location}</div>
                    </td>
                    <td className="p-6">
                      <div className="text-[11px] font-medium text-[#1C1C1C] mb-1">
                        {inq.guestCount} <span className="text-[9px] text-[#7A7A7A] font-light uppercase">Guests</span>
                      </div>
                      <div className="text-[9px] text-[#7A7A7A] uppercase tracking-widest">
                        Tier: {signals.guests > 300 ? 'Strategic' : signals.guests > 150 ? 'Large' : signals.guests > 50 ? 'Medium' : 'Small'}
                      </div>
                    </td>
                    <td className="p-6 min-w-[280px]">
                      <select 
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                        className="text-[9px] tracking-[0.2em] uppercase border border-neutral-200 px-3 py-2.5 outline-none w-full font-bold mb-3 shadow-sm bg-white"
                      >
                        <option value="New Inquiry">1. New Inquiry</option>
                        <option value="Qualified – Needs Follow-up">2. Qualified – Needs Follow-up</option>
                        <option value="Proposal Sent">3. Proposal Sent</option>
                        <option value="Revision in Progress">4. Revision in Progress</option>
                        <option value="Tentative Hold">5. Tentative Hold</option>
                        <option value="Confirmed">6. Confirmed</option>
                        <option value="Closed – Lost">7. Closed – Lost</option>
                      </select>
                      <textarea 
                        value={inq.internalNotes}
                        onChange={(e) => updateNotes(inq.id, e.target.value)}
                        placeholder="NEXT ACTION: (e.g., Call client, Verify kitchen availability...)"
                        className="w-full min-h-[100px] p-3 text-[10px] font-light leading-relaxed bg-[#F6F6F4] border border-neutral-100 focus:border-[#C6A15B]/40 focus:bg-white outline-none transition-all resize-y text-[#1C1C1C]"
                      />
                    </td>
                  </tr>
                );
              })}
              {processedInquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-24 text-center text-[#7A7A7A] font-serif italic text-lg">
                    Current queue is clear. Adjust filters to view archived production records.
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
