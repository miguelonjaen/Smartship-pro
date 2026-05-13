import React from 'react';

export const TravelLogPage = ({ trip1, trip2, onAction }: any) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center bg-white p-10 overflow-hidden">
    {/* Background Grid */}
    <div className="absolute inset-0 grid grid-cols-2 border-zinc-100 pointer-events-none">
        <div className="border-r border-zinc-100" />
        <div />
    </div>

    <div className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1 relative z-10">REGISTRO DE VIAJE</div>
    
    <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 w-full mt-6 relative z-10 shadow-sm">
        <div className="bg-white p-6 flex flex-col items-center">
            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">VIAJE 1 (AGUA)</span>
            <span className="text-3xl font-black text-black font-mono leading-none tracking-tighter">{trip1.toFixed(1)}<span className="text-xs ml-1 font-bold text-zinc-400 uppercase">NM</span></span>
        </div>
        <div className="bg-white p-6 flex flex-col items-center">
            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">VIAJE 2 (GPS)</span>
            <span className="text-3xl font-black text-black font-mono leading-none tracking-tighter">{trip2.toFixed(1)}<span className="text-xs ml-1 font-bold text-zinc-400 uppercase">NM</span></span>
        </div>
    </div>

    <div className="mt-12 flex gap-3 relative z-10 w-full justify-center">
        <button onClick={() => onAction('start')} className="flex-1 max-w-[80px] bg-black text-white px-3 py-3 rounded border border-black font-black text-[9px] uppercase shadow-sm active:scale-95">START</button>
        <button onClick={() => onAction('stop')} className="flex-1 max-w-[80px] bg-red-600 text-white px-3 py-3 rounded border border-red-700 font-black text-[9px] uppercase shadow-sm active:scale-95">STOP</button>
        <button onClick={() => onAction('reset')} className="flex-1 max-w-[80px] bg-white text-black px-3 py-3 rounded border border-zinc-300 font-black text-[9px] uppercase shadow-sm active:scale-95">RESET</button>
    </div>
  </div>
);
