import React from 'react';
import { motion } from 'motion/react';

interface WindInstrumentProps {
  awa: number; // Apparent Wind Angle (-180 to 180)
  aws: number; // Apparent Wind Speed (knots)
  twa: number; // True Wind Angle
  tws: number; // True Wind Speed
  heading: number; // Heading
  className?: string;
}

const normalizeAngle = (angle: number) => {
  const normalized = ((angle % 360) + 360) % 360;
  return normalized > 180 ? normalized - 360 : normalized;
};

export const WindInstrument: React.FC<WindInstrumentProps> = ({ 
  awa, 
  aws, 
  twa, 
  tws, 
  heading,
  className 
}) => {
  const awaDisplay = normalizeAngle(awa);
  const twaDisplay = normalizeAngle(twa);
  const trueWindDir = Math.round(((heading + twa) % 360 + 360) % 360);
  const hdgDisplay = Math.round(heading);

  return (
    <div className={`relative w-80 h-80 flex items-center justify-center ${className || ''}`}>
      <div className="absolute inset-0 rounded-3xl bg-[#05080d] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-slate-400">
        <span className="font-black text-cyan-300">B&amp;G H5000</span>
        <span className="font-bold text-white">HDG {hdgDisplay.toString().padStart(3, '0')}°</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full border border-cyan-500/10 bg-[#081018]/90 shadow-[inset_0_0_40px_rgba(14,165,233,0.08)]">
          <div className="absolute inset-0 rounded-full border border-white/5" />
          {[...Array(24)].map((_, index) => {
            const angle = index * 15;
            const longTick = index % 2 === 0;
            return (
              <div
                key={angle}
                className="absolute inset-0 flex items-start justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className={longTick ? 'w-0.5 h-5 bg-white/80' : 'w-0.5 h-2.5 bg-white/30'} />
              </div>
            );
          })}

          <motion.div
            animate={{ rotate: awaDisplay }}
            transition={{ type: 'spring', damping: 18, stiffness: 70 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute bottom-14 w-1.5 h-36 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.5)]" />
            <div className="absolute bottom-48 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[24px] border-b-cyan-400 drop-shadow-[0_0_16px_rgba(34,211,238,0.45)]" />
          </motion.div>

          <motion.div
            animate={{ rotate: twaDisplay }}
            transition={{ type: 'spring', damping: 26, stiffness: 80 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute top-16 w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20" />
            <div className="absolute top-12 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-b-yellow-300 opacity-90" />
            <span className="absolute top-6 text-[8px] font-black uppercase text-yellow-300">TWA</span>
          </motion.div>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center text-[10px] font-black uppercase text-slate-300 tracking-[0.25em]">
            TRUE WIND {trueWindDir.toString().padStart(3, '0')}°
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.30)]">
          <div className="text-[8px] uppercase tracking-[0.25em] text-slate-400 mb-1">AWS</div>
          <div className="text-4xl font-black text-white font-mono tracking-tighter">{aws.toFixed(1)}</div>
          <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-300 mt-1">kn</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/70 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.30)]">
          <div className="text-[8px] uppercase tracking-[0.25em] text-slate-400 mb-1">TWS</div>
          <div className="text-4xl font-black text-white font-mono tracking-tighter">{tws.toFixed(1)}</div>
          <div className="text-[8px] uppercase tracking-[0.2em] text-amber-300 mt-1">kn</div>
        </div>
      </div>

      <div className="absolute top-20 left-4 right-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-white/10 bg-black/50 p-3 text-center">
          <div className="text-[8px] uppercase tracking-[0.25em] text-slate-400">AWA</div>
          <div className="text-2xl font-black text-cyan-300 font-mono">{Math.round(awaDisplay)}°</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/50 p-3 text-center">
          <div className="text-[8px] uppercase tracking-[0.25em] text-slate-400">TWA</div>
          <div className="text-2xl font-black text-yellow-300 font-mono">{Math.round(twaDisplay)}°</div>
        </div>
      </div>
    </div>
  );
};
