import React, { useRef, useEffect, useState } from 'react';
import { Terminal, History, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@lib/utils';

interface Message {
  role: 'user' | 'ai';
  text: string;
  id?: string;
}

interface TacticalTerminalProps {
  messages: Message[];
  onClearHistory: () => void;
  isIntMin: boolean;
  setIsIntMin: (val: boolean) => void;
}

export const TacticalTerminal: React.FC<TacticalTerminalProps> = ({
  messages,
  onClearHistory,
  isIntMin,
  setIsIntMin
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const prevMessagesLength = useRef(0);

  const handleScroll = () => {
    if (!terminalRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
    // Si el usuario sube manualmente, desactivamos el auto-scroll
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 30;
    setIsAutoScrollEnabled(isAtBottom);
  };

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      if (isAutoScrollEnabled && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isAutoScrollEnabled]);

  return (
    <div className={cn(
      "absolute top-6 left-6 z-[1000] w-80 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col transition-all duration-300",
      isIntMin ? "h-12" : "max-h-[85%] h-[600px]"
    )}>
      <div 
        className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 cursor-pointer select-none"
        onClick={() => setIsIntMin(!isIntMin)}
      >
        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" /> SmartSHIP
        </span>
        <div className="flex gap-2">
          <button 
            className="text-slate-500 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClearHistory();
            }}
            title="Clear History"
          >
            <History size={14} />
          </button>
          <button className="text-slate-500 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setIsIntMin(!isIntMin); }}>
            <motion.div animate={{ rotate: isIntMin ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>
        </div>
      </div>
      {!isIntMin && (
        <div ref={terminalRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("text-xs font-mono break-words p-2 rounded-lg", msg.role === 'ai' ? "text-emerald-400 bg-emerald-500/5" : "text-cyan-400 bg-cyan-500/5 border-l border-cyan-500/30")}>
              {msg.role === 'ai' ? `IA_OFFICER: ${msg.text}` : `> ${msg.text}`}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};