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
  ChevronRight,
  Shield,
  RadioTower
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
    (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'acusticas': return <Volume2 className="w-4 h-4" />;
      case 'banderas': return <Flag className="w-4 h-4" />;
      case 'cabuyería': return <Anchor className="w-4 h-4" />;
      case 'prioridades': return <Layers className="w-4 h-4" />;
      case 'balizamiento': return <Shield className="w-4 h-4" />;
      case 'beaufort': return <Wind className="w-4 h-4" />;
      case 'radio': return <Radio className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };
  const TopMark = ({ type }: { type: string | undefined }) => {
  if (!type) return null;
  
  // Clases comunes para el contenedor de la marca
  const baseClass = "absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center";
  
  return (
    <div className="absolute -top-4 z-20 flex justify-center w-full">
      {type.includes('Cilindro') && <div className="w-4 h-6 bg-green-500 border border-black" />}
      {type.includes('Cono') && type.includes('arriba') && <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-red-600" />}
      {type.includes('2 Conos') && type.includes('bases') && (
        <div className="flex flex-col items-center">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-black" />
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-black" />
        </div>
      )}
      {type.includes('Esfera') && <div className="w-5 h-5 bg-red-600 rounded-full border border-black" />}
      {/* Añade más condiciones aquí para otras formas */}
    </div>
  );
};

  // Listado completo del Alfabeto Náutico de la OMI para la sección Radio
  const alfabetoOmi = [
    { l: 'A', p: 'Alfa' }, { l: 'B', p: 'Bravo' }, { l: 'C', p: 'Charlie' }, { l: 'D', p: 'Delta' },
    { l: 'E', p: 'Echo' }, { l: 'F', p: 'Foxtrot' }, { l: 'G', p: 'Golf' }, { l: 'H', p: 'Hotel' },
    { l: 'I', p: 'India' }, { l: 'J', p: 'Juliet' }, { l: 'K', p: 'Kilo' }, { l: 'L', p: 'Lima' },
    { l: 'M', p: 'Mike' }, { l: 'N', p: 'November' }, { l: 'O', p: 'Oscar' }, { l: 'P', p: 'Papa' },
    { l: 'Q', p: 'Quebec' }, { l: 'R', p: 'Romeo' }, { l: 'S', p: 'Sierra' }, { l: 'T', p: 'Tango' },
    { l: 'U', p: 'Uniform' }, { l: 'V', p: 'Victor' }, { l: 'W', p: 'Whiskey' }, { l: 'X', p: 'X-ray' },
    { l: 'Y', p: 'Yankee' }, { l: 'Z', p: 'Zulu' }
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto min-h-full flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/20">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Vademécum Náutico</h2>
            <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Manual de Referencia Rápida Táctica</p>
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
          {['banderas', 'cabuyería', 'balizamiento', 'beaufort', 'radio', 'prioridades', 'acusticas'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveSubTab(cat);
                setSearchQuery('');
              }}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap",
                activeSubTab === cat 
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20 border border-cyan-500/30" 
                  : "bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-800 border border-slate-800/60"
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
            placeholder="Buscar parámetro táctico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs outline-none focus:border-cyan-500/50 transition-all font-bold"
          />
        </div>
      </div>

      {/* Contenido Dinámico según Pestaña */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        
        {/* 1. SECCIÓN BANDERAS: Código Internacional Completo */}
        {activeSubTab === 'banderas' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/80 sticky top-0 z-20 backdrop-blur-md">
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Bandera</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Letra / Fonética</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Significado Principal</th>
                  <th className="px-6 py-5 text-[10px] font-black text-cyan-400 uppercase tracking-widest text-center">Código Morse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-cyan-500/5 transition-colors group cursor-pointer" onClick={() => setSelectedItem(item)}>
                    <td className="px-6 py-4">
                      {/* Renderizado de bandera con color y bordes */}
                      <div className={cn("w-14 h-9 rounded shadow-md border border-white/10 shrink-0 overflow-hidden relative", item.color)}>
                        {/* Clases internas simuladas para banderas complejas si no usan imágenes */}
                        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{item.title}</span>
                        <span className="text-[9px] text-slate-500 font-mono tracking-widest font-bold">LETRA {item.title.substring(0, 1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-300 leading-tight max-w-xl font-medium">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-cyan-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 tracking-widest">{item.morse || '• —'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. SECCIÓN CABUYERÍA: Nudos Marineros con Fotos Reales */}
        {activeSubTab === 'cabuyería' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filteredData.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 rounded-[2rem] p-5 flex flex-col justify-between transition-all group shadow-xl cursor-pointer"
              >
                <div>
                  {/* Foto del nudo desde la carpeta pública */}
                  <div className="w-full h-44 bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden mb-4 shadow-inner flex items-center justify-center relative">
                    <img 
                      src={`/nudos/${item.id}.png`} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        // Fallback elegante si la imagen no se ha descargado aún
                        (e.target as HTMLImageElement).src = `https://placehold.co/400x250/0f172a/22d3ee?text=${item.title}`;
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-lg text-[9px] font-mono text-cyan-400 uppercase">
                      Cabuyería
                    </div>
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3 italic">
                    "{item.description}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Ver pasos de ejecución</span>
                  <ChevronRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. SECCIÓN BALIZAMIENTO: IALA Completa con Marcas en Vertical */}
{activeSubTab === 'balizamiento' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
    {filteredData.map((item) => (
      <div 
        key={item.id}
        onClick={() => setSelectedItem(item)}
           className="bg-slate-900/50 pt-10 border border-slate-800 hover:border-cyan-500/30 rounded-[2rem] p-6 flex flex-col items-center text-center cursor-pointer transition-all group relative overflow-visible"
      >
        <TopMark type={item.topMark} />
        
        {/* BOYAS: Sistema único y dinámico */}
        <div className={cn(
          "w-12 h-28 mb-6 relative flex flex-col overflow-hidden shadow-2xl border border-white/10",
          item.isSpherical ? "rounded-full" : "rounded-t-full"
        )}>
          {/* Patrón de Franjas Verticales (Aguas limpias) */}
          {item.isStriped ? (
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-red-600" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-red-600" />
            </div>
          ) : (
            /* Sistema de 3 franjas horizontales (Laterales y Cardinales) */
            <>
              <div className={cn("flex-1", item.colorTop || 'bg-slate-950')} />
              <div className={cn("h-8", item.colorMiddle || 'bg-slate-950')} />
              <div className={cn("flex-1", item.colorBottom || 'bg-slate-950')} />
            </>
          )}
        </div>

        <span className="text-[8px] font-black text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2 py-0.5 rounded-md uppercase tracking-widest mb-2">
          IALA REGION A
        </span>
        
        <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        
        <div className="mt-4 space-y-1.5 text-left w-full text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
          <p><span className="text-cyan-400 font-bold">Tope:</span> {item.topMark || 'Marca Vertical'}</p>
          <p><span className="text-cyan-400 font-bold">Boya:</span> {item.buoyColor || 'Ver ficha'}</p>
          <p className="text-amber-400 font-bold truncate"><span className="text-slate-500">Luz:</span> {item.lightRitmo || 'Destellos'}</p>
        </div>
      </div>
    ))}
  </div>
)}
        {/* 4. SECCIÓN BEAUFORT: Escala Completa de Fuerza de Viento 0 a 12 */}
        {activeSubTab === 'beaufort' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead className="bg-slate-950/80 sticky top-0 z-20 backdrop-blur-md">
                  <tr className="border-b border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest text-center w-16">Fuerza</th>
                    <th className="px-6 py-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Denominación Oficial</th>
                    <th className="px-6 py-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Velocidad (Nudos)</th>
                    <th className="px-6 py-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Efectos Reales en la Mar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredData.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-cyan-500/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <td className="px-6 py-4 font-black text-center bg-slate-950/40 text-amber-400 text-sm">{item.symbol || item.id}</td>
                      <td className="px-6 py-4 text-white font-sans font-bold uppercase tracking-tight">{item.title}</td>
                      <td className="px-6 py-4 text-cyan-300 font-bold">{String((item as any).velocity || item.symbol || '0')} Kts</td>
                      <td className="px-6 py-4 text-slate-400 font-sans leading-tight text-[11px] italic">"{item.description}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. SECCIÓN RADIO: Telecomunicaciones, Alfabeto OMI y Llamadas de Emergencia */}
        {activeSubTab === 'radio' && (
          <div className="space-y-8 pb-8">
            {/* Submódulo Alfabeto Fonético */}
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <RadioTower className="w-4 h-4" /> Alfabeto Fonético Internacional (OMI / OTAN)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {alfabetoOmi.map((item) => (
                  <div key={item.l} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex items-center justify-between font-mono">
                    <span className="text-amber-400 font-black text-base">{item.l}</span>
                    <span className="text-xs text-slate-300 font-bold tracking-tight uppercase">{item.p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submódulo de Llamadas Críticas de Radio VHF */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-[2rem] shadow-xl">
                <h3 className="text-sm font-black font-mono text-red-400 flex items-center gap-2 uppercase tracking-wide">
                  🚨 MAYDAY — Peligro Grave e Inminente (Canal 16)
                </h3>
                <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-red-900/30">
                  <span className="text-red-400 font-bold">Estructura Fonética:</span> "MAYDAY, MAYDAY, MAYDAY. Aquí [Nombre del Buque] / Call Sign [Indicativo]. Posición [Coordenadas o demora]. Naturaleza del peligro: [Ej: Vía de agua descontrolada]. Cantidad de almas a bordo: [Nº tripulantes]. Dispongo de balsas salvavidas. Terminado."
                </p>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-[2rem] shadow-xl">
                <h3 className="text-sm font-black font-mono text-amber-400 flex items-center gap-2 uppercase tracking-wide">
                  ⚠️ PAN PAN — Urgencia Médica o de Navegación (Canal 16)
                </h3>
                <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-amber-900/30">
                  <span className="text-amber-400 font-bold">Estructura Fonética:</span> "PAN PAN, PAN PAN, PAN PAN. A todas las estaciones / Costera Tarifa Radio. Aquí [Nombre del Buque]. Posición [Coordenadas]. Novedad de urgencia: [Ej: Pérdida total de gobierno sin deriva peligrosa, requiere remolque]. Terminado."
                </p>
              </div>

              <div className="bg-blue-950/20 border border-blue-500/30 p-6 rounded-[2rem] shadow-xl">
                <h3 className="text-sm font-black font-mono text-blue-400 flex items-center gap-2 uppercase tracking-wide">
                  ⚓ SECURITE — Seguridad y Meteorología Avisos (Canal 16)
                </h3>
                <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-blue-900/30">
                  <span className="text-blue-400 font-bold">Estructura Fonética:</span> "SECURITE, SECURITE, SECURITE. A todos los navegantes. Aquí [Estación]. Peligro para la navegación detectado: [Ej: Avistamiento de tronco flotando a la deriva a 2 millas del puerto de Motril]. Escuchen canal 14 para desglose. Terminado."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. COMODÍN PARA OTRAS CATEGORÍAS (Prioridades, Acústicas) */}
        {!['banderas', 'cabuyería', 'balizamiento', 'beaufort', 'radio'].includes(activeSubTab) && (
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
                  className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all group shadow-xl cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em]">{item.category}</span>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    {item.symbol && (
                      <div className="px-3 py-1 bg-slate-800 rounded-lg text-cyan-400 font-mono text-sm border border-slate-700 shrink-0">
                        {item.symbol}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2 italic">
                    "{item.description}"
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Analizar detalles</span>
                    <ChevronRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Sin datos */}
        {filteredData.length === 0 && activeSubTab !== 'radio' && (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-slate-800 mb-4 opacity-30" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No se encontraron resultados para "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Detail Overlay (Modal de Consulta Táctica) */}
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
              {/* Cabecera del Modal */}
              <div className={cn("h-48 relative flex items-end p-10 shrink-0", selectedItem.color || 'bg-slate-800')}>
                <div className="absolute inset-0 bg-black/50 z-0" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 p-3 bg-black hover:bg-red-600 text-white rounded-full transition-all border-2 border-white/10 z-50 shadow-2xl"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative z-10 space-y-2 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">{selectedItem.category || activeSubTab}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{selectedItem.title}</h3>
                </div>
              </div>

              {/* Contenido Desplegable */}
              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-950 relative z-10 custom-scrollbar text-xs">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-2">
                    <div className="w-1.5 h-3 bg-cyan-500 rounded-sm" />
                    Especificación Náutica Oficial
                  </h4>
                  <p className="text-xl text-white font-bold leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Submódulo Pasos de Cabuyería */}
                {selectedItem.steps && (
                  <div className="space-y-6 border-t border-slate-900 pt-6">
                    <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <div className="w-1.5 h-3 bg-cyan-500 rounded-sm" />
                      Protocolo de Ejecución Paso a Paso
                    </h4>
                    <div className="space-y-3">
                      {selectedItem.steps.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                          <span className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-xs font-black text-cyan-400 shrink-0 border border-slate-800">
                            {i + 1}
                          </span>
                          <p className="text-slate-200 font-medium pt-1.5 leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info Extendida IALA */}
                {selectedItem.buoyColor && (
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center">
                      <span className="text-[9px] font-black text-slate-500 uppercase mb-2 block tracking-widest">Estructura Boya</span>
                      <p className="text-sm font-black text-white uppercase">{selectedItem.buoyColor}</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center">
                      <span className="text-[9px] font-black text-slate-500 uppercase mb-2 block tracking-widest">Marca de Tope</span>
                      <p className="text-sm font-black text-white uppercase">{selectedItem.topMark}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="px-8 py-4 bg-cyan-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cyan-500 transition-all shadow-lg border border-cyan-400/30 pointer-events-auto"
                  >
                    Entendido, Almirante
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