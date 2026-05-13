import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Zap, Terminal, AlertTriangle, Info, Loader2, CheckCircle2 } from 'lucide-react';

interface TacticalAdvisorBarProps {
  windSpeed: number;
  shipSpeed: number;
  fuelLevel: number;
  batteryLevel: number;
  depth: number;
  isEngineOn: boolean;
  xte: number;
  isNavigating: boolean;
  aisTargets?: any[];
  externalAdvice?: { text: string; priority: 'info' | 'warning' | 'critical' | 'success'; timestamp: number } | null;
  isProcessing?: boolean;
  onSendMessage?: (message: string) => void;
}

interface Advice {
  text: string;
  priority: 'info' | 'warning' | 'critical' | 'success';
  timestamp: number;
}

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

export const TacticalAdvisorBar: React.FC<TacticalAdvisorBarProps> = ({
  windSpeed = 0,
  shipSpeed = 0,
  fuelLevel = 0,
  batteryLevel = 0,
  depth = 0,
  isEngineOn = false,
  xte = 0,
  isNavigating = false,
  aisTargets = [],
  externalAdvice,
  isProcessing = false,
  onSendMessage
}) => {
  const [currentAdvice, setCurrentAdvice] = useState<Advice | null>(null);
  const [isRecentlyVisible, setIsRecentlyVisible] = useState(true);
  const [internalIsProcessing, setInternalIsProcessing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const visibilityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- LÓGICA DE VISUALIZACIÓN ---
  const adviceToDisplay = externalAdvice || currentAdvice || { 
    text: 'Iniciando sistemas tácticos... Estableciendo conexión PRO.', 
    priority: 'success' as const, 
    timestamp: Date.now() 
  };
  
  const processingState = isProcessing || internalIsProcessing;

  useEffect(() => {
    if (adviceToDisplay) {
      setIsRecentlyVisible(true);
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
      if (isFocused) return;

      const duration = (adviceToDisplay.priority === 'critical' || adviceToDisplay.priority === 'warning') ? 30000 : 15000;
      
      visibilityTimerRef.current = setTimeout(() => {
        if (!isFocused) setIsRecentlyVisible(false);
      }, duration);
    }
    return () => { if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current); };
  }, [adviceToDisplay?.text, adviceToDisplay?.timestamp, isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && onSendMessage) {
      onSendMessage(userInput.trim());
      setUserInput('');
      setIsRecentlyVisible(true);
    }
  };

  return (
    <AnimatePresence>
      {isRecentlyVisible && (
        <motion.div 
          initial={{ y: -150, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: -150, x: '-50%', opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-6 left-1/2 w-fit max-w-[90vw] px-4 pointer-events-none"
          style={{ zIndex: 99999 }}
        >
          <div className={`
            relative overflow-hidden pointer-events-auto
            bg-slate-900/90 backdrop-blur-xl 
            border-b-4 border-x-2 rounded-2xl p-5
            flex flex-col gap-3 shadow-2xl
            ${adviceToDisplay.priority === 'critical' ? 'border-red-600 shadow-red-900/20' : 
              adviceToDisplay.priority === 'warning' ? 'border-amber-500' : 
              adviceToDisplay.priority === 'success' ? 'border-emerald-500' :
              'border-cyan-500 shadow-cyan-900/20'}
          `}>
            <div className="flex items-center gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border-2
                ${adviceToDisplay.priority === 'critical' ? 'bg-red-500/20 border-red-500/50 text-red-500' : 
                  adviceToDisplay.priority === 'warning' ? 'bg-amber-500/20 border-amber-500/50 text-amber-500' : 
                  'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'}
              `}>
                {adviceToDisplay.priority === 'critical' ? <ShieldAlert size={24} /> : 
                 adviceToDisplay.priority === 'warning' ? <AlertTriangle size={24} /> : 
                 <Terminal size={20} />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/70">Tactical Advisor</span>
                  <span className="text-[9px] font-mono text-slate-500">{new Date(adviceToDisplay.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-sm md:text-base font-bold font-mono text-slate-100 leading-snug">
                  <TypewriterText text={adviceToDisplay.text} />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-2">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Introducir órdenes al centro táctico..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </form>

            {processingState && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 origin-left"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};