import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Zap, Wind, Box } from 'lucide-react';

export const SailSteerPage = ({ sog, twa, twd, tws, hdg }: any) => (
  <div className="relative w-full h-full flex flex-col bg-black">
    {/* Background Grid */}
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-white/5 pointer-events-none">
        <div className="border-r border-b border-white/5" />
        <div className="border-b border-white/5" />
        <div className="border-r border-white/5" />
        <div />
    </div>

    {/* Center Instrument: SailSteer Wind Rose */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center scale-90">
            {/* Ship Heading Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                <div className="bg-white px-2 py-0.5 rounded shadow-lg border border-black/10">
                    <span className="text-[10px] font-black text-black font-mono tracking-tighter">
                        {Math.round(hdg).toString().padStart(3, '0')}
                    </span>
                </div>
            </div>

            {/* Main Rose */}
            <div className="relative w-44 h-44 rounded-full border border-white/10 bg-slate-900/20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {/* Wind Sectors (Red Port, Green Starboard) */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-[-90deg]">
                    <path d="M 50 50 L 50 10 A 40 40 0 0 1 85 30 Z" fill="#22c55e" fillOpacity="0.3" />
                    <path d="M 50 50 L 50 10 A 40 40 0 0 0 15 30 Z" fill="#ef4444" fillOpacity="0.3" />
                </svg>

                <motion.div 
                  animate={{ rotate: -hdg }}
                  transition={{ type: 'spring', damping: 40 }}
                  className="absolute inset-0 rounded-full"
                >
                    {[...Array(36)].map((_, i) => (
                        <div key={i} className="absolute inset-x-0 top-0 bottom-0 flex justify-center" style={{ transform: `rotate(${i * 10}deg)` }}>
                            <div className={cn(
                                "w-0.5", 
                                i % 9 === 0 ? "h-3 bg-white" : i % 3 === 0 ? "h-1.5 bg-slate-500" : "h-1 bg-slate-700"
                            )} />
                            {i % 9 === 0 && (
                                <span className="absolute top-4 text-[6px] font-black text-slate-400" style={{ transform: `rotate(${-i * 10 + hdg}deg)` }}>
                                    {['N', '090', '180', '270'][i/9]}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Ship Silhouette (Light for black bg) */}
                    <div className="w-4 h-9 bg-white rounded-t-[60%] rounded-b-[15%] shadow-md border border-white/20" />
                    
                    {/* Wind Indicator (Triton² uses a blue arrow for TWA) */}
                    <motion.div animate={{ rotate: twa }} className="absolute inset-0 z-20">
                        <div className="absolute top-0 left-1/2 -ml-[10px] -mt-1 scale-75">
                            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-b-cyan-500 drop-shadow-sm" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black text-white">T</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>

    {/* Integrated Corners (Active pointer events) */}
    <div className="relative z-10 w-full h-full grid grid-cols-2 grid-rows-2">
        <div className="p-3 flex flex-col">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">BSPD kt</span>
            <span className="text-xl font-black text-white font-mono leading-none tracking-tighter">{sog.toFixed(1)}</span>
        </div>
        <div className="p-3 flex flex-col items-end">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 text-right">TWA</span>
            <span className="text-xl font-black text-white font-mono leading-none tracking-tighter text-right">{Math.round(twa)}°</span>
        </div>
        <div className="p-3 flex flex-col justify-end">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">TWD</span>
            <span className="text-xl font-black text-white font-mono leading-none tracking-tighter">{Math.round(twd).toString().padStart(3, '0')}°</span>
        </div>
        <div className="p-3 flex flex-col items-end justify-end">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 text-right">TWS kt</span>
            <span className="text-xl font-black text-white font-mono leading-none tracking-tighter text-right">{tws.toFixed(1)}</span>
        </div>
    </div>
  </div>
);
