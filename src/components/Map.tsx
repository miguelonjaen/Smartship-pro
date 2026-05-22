import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

// ... (interface SailSteerPageProps se mantiene igual)

export const SailSteerPage: React.FC<SailSteerPageProps> = ({ /* props */ }) => {
  // Aquí formateas los valores para evitar errores de renderizado
  const values = { /* ... */ };

  return (
    /* CONTENEDOR PRINCIPAL: Fondo negro y estructura base */
    <div className="relative w-full h-full bg-white text-slate-100 overflow-hidden">
      
      {/* CAPA DECORATIVA: Gradiente radial sutil para dar profundidad */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),transparent_45%)] pointer-events-none" />
      
      {/* CUADRÍCULA DE FONDO: Divide la pantalla en 4 cuadrantes con líneas blancas tenues */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-white/5 pointer-events-none">
        <div className="border-r border-b border-white/5" />
        <div className="border-b border-white/5" />
        <div className="border-r border-white/5" />
        <div />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col px-2 py-2">
        
        {/* ENCABEZADO: Etiqueta "GOBIERNO A VELA" */}
        <div className="flex-none flex items-center justify-center mb-1">
          <div className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-slate-300">
            GOBIERNO A VELA
          </div>
        </div>

        {/* ÁREA CENTRAL: Contiene la rosa de los vientos y medidores */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[420px] max-h-[420px]">
            
            {/* FONDO CIRCULAR: El círculo blanco que sirve de base al gráfico */}
            <div className="absolute inset-6 rounded-[2rem] bg-white border border-slate-300/20 shadow-[0_40px_80px_rgba(0,0,0,0.18)] overflow-hidden" />
            
            {/* GRÁFICO SVG: Dibuja los grados, líneas y arcos de colores de virada/trasluchada */}
            <svg viewBox="0 0 520 520" className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] left-6 top-6">
              {/* Círculos guía y marcas de grados (cálculo trigonométrico) */}
              <circle cx="260" cy="260" r="245" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="2" />
              {/* ... lógica de dibujo de líneas (map 36) ... */}
              {/* Arcos verde y rojo (sectores de viento) */}
              <path d="M 260 15 A 245 245 0 0 1 505 260 L 260 260 Z" fill="rgba(34,197,94,0.16)" />
              <path d="M 260 15 A 245 245 0 0 0 15 260 L 260 260 Z" fill="rgba(239,68,68,0.16)" />
            </svg>

            {/* NÚCLEO CENTRAL (ANIMADO): Rota según el rumbo (HDG) */}
            <motion.div animate={{ rotate: -(hdg ?? 0) }} ... >
              <div className="relative w-28 h-28 rounded-full bg-slate-900/95 ...">
                 {/* Texto interior TWA */}
              </div>
            </motion.div>

            {/* INDICADOR DE DIRECCIÓN DE VIENTO: Rota según el TWA */}
            <motion.div animate={{ rotate: twa ?? 0 }} className="absolute inset-6 flex items-center justify-center">
              <div className="absolute top-6 ... border-b-cyan-400" />
            </motion.div>

            {/* CENTRO: El punto blanco pequeño */}
            <div className="absolute inset-6 flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            </div>

            {/* CAJAS DE DATOS ESQUINERAS (Soportan estilo rounded-3xl) */}
            
            {/* 1. Esquina superior izquierda (BSPD) */}
            <div className="absolute top-8 left-0 w-28 p-2 ...">
              <div className="text-[8px] uppercase ...">BSPD</div>
              <div className="mt-1 text-[2rem] font-black ...">{values.sog}</div>
            </div>

            {/* 2. Esquina superior derecha (TWA) */}
            <div className="absolute top-8 right-0 w-28 p-2 ... text-right">
              <div className="text-[8px] uppercase ...">TWA</div>
              <div className="mt-1 text-[2rem] font-black ...">{values.twa}</div>
            </div>

            {/* 3. Esquina inferior izquierda (TWD) */}
            <div className="absolute bottom-8 left-0 w-28 p-2 ...">
              <div className="text-[8px] uppercase ...">TWD</div>
              <div className="mt-1 text-[2rem] font-black ...">{values.twd}</div>
            </div>

            {/* 4. Esquina inferior derecha (TWS) */}
            <div className="absolute bottom-8 right-0 w-28 p-2 ... text-right">
              <div className="text-[8px] uppercase ...">TWS</div>
              <div className="mt-1 text-[2rem] font-black ...">{values.tws}</div>
            </div>

            {/* ETIQUETA INFERIOR (HDG): Centrada en la parte baja */}
            <div className="absolute inset-x-0 bottom-14 flex items-center justify-center">
              <div className="px-1 py-1 rounded-full border border-cyan-400/40 ...">
                HDG {values.hdg}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};