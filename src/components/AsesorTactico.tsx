import React from 'react';
import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';

interface AsesorTacticoProps {
  onClose: () => void;
  message: string | null;
  onAccept: () => Promise<void>;
}

export const AsesorTactico: React.FC<AsesorTacticoProps> = ({ onClose, message, onAccept }) => {
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="absolute top-32 left-1/2 -translate-x-1/2 z-[7000] w-full max-w-md px-4"
    >
      <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-red-600 rounded-xl transition-all z-20 border border-slate-700 shadow-lg group"
          title="Cerrar Asesor"
        >
          <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
        <div className="bg-cyan-600/20 px-6 py-3 border-b border-cyan-500/30 flex items-center gap-3">
          <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-black text-white uppercase tracking-widest">Asesor Táctico</span>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm font-bold text-white leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 font-black uppercase tracking-widest rounded-xl transition-all text-[10px]"
            >
              Cerrar
            </button>
            <button 
              onClick={onAccept}
              className="flex-[2] py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest rounded-xl transition-all text-[10px] shadow-lg shadow-cyan-900/40"
            >
              Aceptar Ajuste
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
