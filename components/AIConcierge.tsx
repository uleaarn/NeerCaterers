
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConciergeResponse } from '../services/geminiService';
import { Message } from '../types';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Good day. I am the Neer Catering Concierge. How may I assist you with your upcoming event strategy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getConciergeResponse([...messages, userMsg]);
    
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsLoading(false);
  };

  const isMenuRelated = (content: string) => {
    const keywords = ['menu', 'dishes', 'what do you serve', 'food list', 'choices'];
    return keywords.some(k => content.toLowerCase().includes(k));
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-4 bg-[#1C1C1C] text-white text-[10px] tracking-[0.3em] uppercase border border-[#C6A15B]/50 hover:bg-black transition-all shadow-xl"
        >
          Concierge
        </button>
      )}

      {isOpen && (
        <div className="w-[380px] h-[550px] bg-[#F6F6F4] border border-[#C6A15B]/30 flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-[#C6A15B]/20 flex justify-between items-center bg-[#1C1C1C]">
            <div>
              <h3 className="text-white text-[10px] tracking-[0.3em] uppercase">Neer Concierge</h3>
              <p className="text-[#C6A15B] text-[8px] tracking-widest uppercase mt-0.5">Executive Support</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              CLOSE
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#C6A15B]/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 text-xs leading-relaxed font-light ${
                  msg.role === 'user' 
                    ? 'bg-[#C6A15B]/10 text-[#1C1C1C] border border-[#C6A15B]/20' 
                    : 'bg-white text-[#1C1C1C] border border-[#1C1C1C]/5'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && i === messages.length - 1 && isMenuRelated(msg.content) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        window.location.hash = '/menu';
                      }}
                      className="text-[9px] tracking-widest uppercase px-3 py-2 bg-[#1C1C1C] text-white hover:bg-black transition-all"
                    >
                      View Detailed Menu
                    </button>
                    <button 
                      onClick={() => handleSend("I'd like help curating a custom menu for my event.")}
                      className="text-[9px] tracking-widest uppercase px-3 py-2 border border-[#C6A15B] text-[#1C1C1C] hover:bg-[#C6A15B]/10 transition-all"
                    >
                      Help Me Curate
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 text-[10px] tracking-widest uppercase text-[#7A7A7A] italic">
                  Processing...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#C6A15B]/10">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Inquire here..."
                className="flex-grow text-xs outline-none py-2 font-light"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="text-[10px] tracking-widest uppercase text-[#C6A15B] font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConcierge;
