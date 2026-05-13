import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface WindInstrumentProps {
  awa: number; // Apparent Wind Angle (-180 to 180)
  aws: number; // Apparent Wind Speed (knots)
  twa: number; // True Wind Angle
  tws: number; // True Wind Speed
  heading: number; // Heading
  className?: string;
}

export const WindInstrument: React.FC<WindInstrumentProps> = ({ 
  awa, 
  aws, 
  twa, 
  tws, 
  heading,
  className 
}) => {
  // Normalize angles for display
  const awaFixed = awa; // Relative to bow
  
  return (
    <div className={cn("relative w-72 h-72 flex items-center justify-center", className)}>
      {/* Background Circular Plate with Glass Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/80 to-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)]" />
      
      {/* Degree Scale Ticks (30° intervals) */}
      <div className="absolute inset-0 rounded-full">
        {[...Array(12)].map((_, i) => {
          const angle = i * 30;
          return (
            <div 
              key={i} 
              className="absolute inset-0 flex justify-center" 
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className={cn(
                "w-1 h-3 mt-1",
                angle === 0 ? "bg-red-500 w-1.5 h-5 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-white/20"
              )} />
              <span 
                className="absolute top-7 text-[9px] font-black text-white/30 font-mono"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                {angle === 0 ? 'BOW' : angle}
              </span>
            </div>
          );
        })}
      </div>

      {/* TWA Pointer (Yellow Outline) */}
      <motion.div 
        animate={{ rotate: twa }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
        className="absolute inset-0 z-10 flex justify-center"
      >
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[30px] border-b-yellow-500/80 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)] mt-8" />
        <span className="absolute top-[70px] text-[8px] font-black text-yellow-500">TWA</span>
      </motion.div>

      {/* AWA Needle (Cyan Neon) */}
      <motion.div 
        animate={{ rotate: awaFixed }}
        transition={{ type: 'spring', damping: 20, stiffness: 40 }}
        className="absolute inset-0 z-20 flex justify-center"
      >
        <div className="w-1.5 h-32 bg-gradient-to-t from-transparent via-cyan-500 to-white shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full mt-10 origin-bottom" style={{ transform: 'translateY(-16px)' }} />
        <div className="absolute top-10 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Central Tactical Display */}
      <div className="relative z-30 w-40 h-40 rounded-full bg-black/40 border border-white/5 flex flex-col items-center justify-center shadow-inner">
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AWS</p>
          <div className="text-5xl font-black text-white font-mono tracking-tighter">{aws.toFixed(1)}</div>
          <p className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em]">KNOTS</p>
        </div>
        
        <div className="mt-4 flex gap-6 pt-4 border-t border-white/5">
          <div className="text-center">
            <p className="text-[8px] font-bold text-slate-500 uppercase">AWA</p>
            <p className="text-sm font-black text-white font-mono">{Math.round(awa)}°</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-bold text-slate-500 uppercase">TWA</p>
            <p className="text-sm font-black text-yellow-500 font-mono">{Math.round(twa)}°</p>
          </div>
        </div>
      </div>

      {/* Ship Silhouette (Static in center center) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-8 h-16 bg-white rounded-t-[50%] rounded-b-[10%] shadow-lg shadow-white/10" />
      </div>
    </div>
  );
};
