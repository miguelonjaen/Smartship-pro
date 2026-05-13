import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Volume2, 
  Flag, 
  Radio, 
  Lightbulb, 
  Navigation,
  Info,
  Anchor,
  Wind,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { VADEMECUM_DATA, VademecumItem } from '../data/vademecumData';

interface VademecumProps {
  onClose: () => void;
}

const Vademecum: React.FC<VademecumProps> = ({ onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('banderas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<VademecumItem | null>(null);

  const filteredData = VADEMECUM_DATA[activeSubTab]?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'acusticas': return <Volume2 className="w-5 h-5" />;
      case 'banderas': return <Flag className="w-5 h-5" />;
      case 'cabuyería': return <Anchor className="w-5 h-5" />;
      case 'prioridades': return <Layers className="w-5 h-5" />;
      case 'balizamiento': return <Navigation className="w-5 h-5" />;
      case 'beaufort': return <Wind className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto min-h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/20">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Vademécum Náutico</h2>
            <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Manual de Referencia Rápida</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900/30 p-4 rounded-3xl border border-slate-800/50 backdrop-blur-md shrink-0">
        <div className="flex-1 flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {Object.keys(VADEMECUM_DATA).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveSubTab(cat);
                setSearchQuery('');
              }}
              className={cn(
                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap",
                activeSubTab === cat 
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20" 
                  : "bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-800"
              )}
            >
              {getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Buscar en esta sección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs outline-none focus:border-cyan-500/50 transition-all font-bold"
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        {activeSubTab === 'banderas' && searchQuery === '' ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/50 sticky top-0 z-20 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-500 uppercase tracking-widest border-b border-slate-800">Bandera</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-500 uppercase tracking-widest border-b border-slate-800">Letra / Fonética</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-500 uppercase tracking-widest border-b border-slate-800">Representación Visual</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-500 uppercase tracking-widest border-b border-slate-800 text-center">Morse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-cyan-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedItem(item)}>
                    <td className="px-6 py-4">
                      <div className={cn("w-12 h-8 rounded shadow-lg border border-white/10 shrink-0", item.color)} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{item.title}</span>
                        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{item.title.substring(0, 1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[11px] text-slate-400 leading-tight max-w-xs italic">
                        {item.visual || item.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-black text-cyan-400 font-mono tracking-widest">{item.morse}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedItem(item)}
                  className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all group shadow-xl shadow-black/10 cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em]">{item.category}</span>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    {item.color && (
                      <div className={cn("w-12 h-9 rounded-xl shadow-inner border border-white/10 shrink-0", item.color)} />
                    )}
                    {item.symbol && (
                      <div className="px-3 py-1 bg-slate-800 rounded-lg text-cyan-400 font-mono text-sm border border-slate-700 shrink-0">
                        {item.symbol}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2 italic">
                    "{item.description}"
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Analizar detalles</span>
                    <ChevronRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-slate-800 mb-4 opacity-30" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No se encontraron resultados para "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-lg pointer-events-auto" onClick={() => setSelectedItem(null)} />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] pointer-events-auto flex flex-col max-h-[85vh] border-t-cyan-500 relative z-50"
            >
              {/* Header - Fixed height */}
              <div className={cn("h-64 relative flex items-end p-10 shrink-0", selectedItem.color || 'bg-slate-800')}>
                <div className="absolute inset-0 bg-black/40 z-0" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-8 right-8 p-4 bg-black hover:bg-red-600 text-white rounded-full transition-all border-2 border-white/20 z-50 shadow-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative z-10 space-y-4 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    <span className="text-11px font-black text-white uppercase tracking-[0.4em]">{selectedItem.category}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center min-w-[80px]">
                      {selectedItem.symbol ? (
                        <span className="text-4xl whitespace-pre-line leading-none flex flex-col items-center justify-center gap-1">
                          {selectedItem.symbol}
                        </span>
                      ) : (
                        <>
                          {activeSubTab === 'banderas' && <Flag className="w-10 h-10 text-white" />}
                          {activeSubTab === 'cabuyería' && <Anchor className="w-10 h-10 text-white" />}
                          {activeSubTab === 'prioridades' && <Layers className="w-10 h-10 text-white" />}
                          {activeSubTab === 'balizamiento' && <Navigation className="w-10 h-10 text-white" />}
                          {activeSubTab === 'beaufort' && <Wind className="w-10 h-10 text-white" />}
                        </>
                      )}
                    </div>
                    <h3 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">{selectedItem.title}</h3>
                  </div>
                </div>
              </div>

              {/* Content - Scrollable area */}
              <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-slate-950 relative z-10 custom-scrollbar">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-3">
                    <div className="w-2 h-4 bg-cyan-500 rounded-sm" />
                    PROTOCOLO E INFORMACIÓN TÁCTICA
                  </h4>
                  <p className="text-3xl text-white font-bold leading-tight">
                    {selectedItem.description}
                  </p>
                </div>

                {/* CIS Specific Info */}
                {selectedItem.category === 'CIS' && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[2rem] shadow-xl">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-5 block tracking-widest">CÓDIGO MORSE</span>
                      <p className="text-6xl font-black text-cyan-400 font-mono tracking-[0.5em]">{selectedItem.morse}</p>
                    </div>
                    <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[2rem] shadow-xl">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-5 block tracking-widest">SIGNIFICADO NÁUTICO</span>
                      <p className="text-2xl text-white font-black leading-snug uppercase">{selectedItem.medical}</p>
                    </div>
                    <div className="col-span-2 bg-slate-900 border-2 border-slate-800 p-10 rounded-[2rem] shadow-xl">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-5 block tracking-widest">ESPECIFICACIÓN VISUAL</span>
                      <p className="text-xl text-slate-200 font-bold leading-relaxed">{selectedItem.visual}</p>
                    </div>
                  </div>
                )}

                {/* Knots Specific Info */}
                {selectedItem.steps && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-3">
                        <div className="w-2 h-4 bg-cyan-500 rounded-sm" />
                        PROTOCOLO DE EJECUCIÓN
                      </h4>
                      <div className="space-y-4">
                        {selectedItem.steps.map((step, i) => (
                          <div key={i} className="flex gap-6 items-start">
                            <span className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-lg font-black text-cyan-400 shrink-0 border-2 border-slate-800 shadow-xl">
                              {i + 1}
                            </span>
                            <p className="text-xl text-white font-bold pt-2 leading-snug">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-8 bg-cyan-900/20 rounded-[2.5rem] border-2 border-cyan-500/40">
                      <span className="text-[11px] font-black text-cyan-400 uppercase mb-3 block tracking-widest">PROPIEDADES TÁCTICAS</span>
                      <p className="text-lg text-white font-black uppercase tracking-tight">{selectedItem.properties}</p>
                    </div>
                  </div>
                )}

                {/* RIPA Info */}
                {selectedItem.marks && (
                  <div className="space-y-8">
                    <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[2.5rem]">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-5 block tracking-widest">LUCES Y MARCAS (RIPA)</span>
                      <p className="text-xl text-white font-black leading-relaxed uppercase">{selectedItem.marks}</p>
                    </div>
                    {selectedItem.maneuver && (
                      <div className="bg-cyan-950/30 p-10 rounded-[2.5rem] border-2 border-cyan-500 border-l-[12px]">
                        <span className="text-[11px] font-black text-cyan-500 uppercase mb-5 block tracking-widest"> REGLA DE MANIOBRA PRIORITARIA</span>
                        <p className="text-2xl text-white font-black uppercase tracking-tight leading-tight">{selectedItem.maneuver}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* IALA Info */}
                {selectedItem.buoyColor && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[2.5rem] text-center">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-4 block tracking-widest">COLOR DE BOYA</span>
                      <p className="text-4xl font-black text-white uppercase">{selectedItem.buoyColor}</p>
                    </div>
                    <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[2.5rem] text-center">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-4 block tracking-widest">MARCA DE TOPE</span>
                      <p className="text-2xl font-black text-white uppercase">{selectedItem.topMark}</p>
                    </div>
                    <div className="col-span-2 bg-slate-900 border-2 border-slate-800 p-10 rounded-[2.5rem] text-center">
                      <span className="text-[11px] font-black text-slate-500 uppercase mb-4 block tracking-widest">RITMO DE LUZ</span>
                      <p className="text-3xl font-black text-cyan-400 uppercase tracking-[0.3em]">{selectedItem.lightRitmo}</p>
                    </div>
                  </div>
                )}
                
                <div className="pt-10 flex justify-end">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="px-12 py-5 bg-cyan-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.4em] hover:bg-cyan-500 transition-all shadow-[0_0_40px_rgba(8,145,178,0.4)] border-2 border-cyan-400/30"
                  >
                    CONFIRMADO, ALMIRANTE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vademecum;
