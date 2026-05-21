import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  Target,
  Video,
  Bell,
  AlertTriangle,
  Zap,
  Wind,
  Box,
  LifeBuoy,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { SailSteerPage } from "./SailSteerPage";
import { RaceTimerPage } from "./RaceTimerPage";
import { DepthPage } from "./DepthPage";
import { WindAnalogPage } from "./WindAnalogPage";
import { TravelLogPage } from "./TravelLogPage";
import { EnginePage } from "./EnginePage";
import { AISPage } from "./AISPage";
import { Navigation3DPage } from "./Navigation3DPage";
import { PilotStatusPage } from "./PilotStatusPage";
import { LaylinesPage } from "./LaylinesPage";
import { WindPlotPage } from "./WindPlotPage";
import { TidePage } from "./TidePage";
import { WeatherPage } from "./WeatherPage";
import { BasicDataPage } from "./BasicDataPage";
import { GPSPage } from "./GPSPage";
import { SteeringPage } from "./SteeringPage";
import { PlotPage } from "./PlotPage";

import { InstrumentGridPage } from "./InstrumentGridPage";

interface TacticalHUDProps {
  isOpen: boolean;
  onClose: () => void;
  sog: number;
  hdg: number;
  twd: number;
  tws: number;
  twa: number;
  awa: number;
  aws: number;
  vmg: number;
  depth: number;
  depthHistory: any[];
  trip1: number;
  trip2: number;
  engineData: {
    rpm: number;
    temp: number;
    voltage: number;
    fuel: number;
    water: number;
  };
  navData: {
    btw: number;
    dtw: number;
    xte: number;
    waypointName: string;
  };
  weather?: any;
  onTabChange: (tab: any) => void;
  onMotor: () => void;
  onVela: () => void;
  onMOB: () => void;
  onToggleLights: () => void;
  onTripAction: (action: string) => void;
  lightsOn: boolean;
  mobActive: boolean;
  activeTab: string;
  isNavigating: boolean;
  initialPageIndex: number;
  onPageIndexChange: (index: number) => void;
  onRaceTimerFinished: () => void;
  shipId: string;
  weatherData?: any;
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({
  isOpen,
  onClose,
  sog,
  hdg,
  twd,
  tws,
  twa,
  awa,
  aws,
  vmg,
  depth,
  depthHistory,
  trip1,
  trip2,
  engineData,
  navData,
  onTabChange,
  onMotor,
  onVela,
  onMOB,
  onToggleLights,
  onTripAction,
  lightsOn,
  mobActive,
  activeTab,
  isNavigating,
  initialPageIndex,
  onPageIndexChange,
  onRaceTimerFinished,
  shipId,
  weatherData,
}) => {
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

  const pages = [
    {
      id: "pilot",
      title: "ESTADO PILOTO",
      component: <PilotStatusPage hdg={hdg} isNavigating={isNavigating} />,
    },
    {
      id: "sailsteer",
      title: "SAILSTEER",
      component: (
        <SailSteerPage sog={sog} hdg={hdg} twd={twd} tws={tws} twa={twa} />
      ),
    },
    {
      id: "nav3d",
      title: "NAVEGACIÓN",
      component: (
        <Navigation3DPage
          btw={navData.btw}
          dtw={navData.dtw}
          xte={navData.xte}
          hdg={hdg}
          waypointName={navData.waypointName}
          shipId={shipId}
        />
      ),
    },
    {
      id: "laylines",
      title: "LAYLINES",
      component: <LaylinesPage twa={twa} twd={twd} hdg={hdg} />,
    },
    {
      id: "windplot",
      title: "GRÁFICO VIENTO",
      component: <WindPlotPage tws={tws} twa={twa} />,
    },
    {
      id: "tide",
      title: "MAREA",
      component: <TidePage tideLevel={weatherData?.tideLevel} />,
    },
    {
      id: "weather",
      title: "METEOROLOGÍA",
      component: <WeatherPage weather={weatherData} />,
    },
    {
      id: "depth",
      title: "PROFUNDIDAD",
      component: (
        <DepthPage
          currentDepth={depth}
          depthHistory={depthHistory}
          shipId={shipId}
        />
      ),
    },
    {
      id: "basic_sd",
      title: "VEL. / PROF. BÁSICAS",
      component: (
        <BasicDataPage
          title="DATOS BÁSICOS"
          items={[
            { label: "BSPD", value: sog.toFixed(1), unit: "KT" },
            { label: "DEPTH", value: depth.toFixed(1), unit: "M" },
          ]}
        />
      ),
    },
    {
      id: "basic_wind",
      title: "VIENTO BÁSICO",
      component: (
        <BasicDataPage
          title="VIENTO BÁSICO"
          items={[
            { label: "TWA", value: Math.round(twa).toString() + "°" },
            { label: "TWS", value: tws.toFixed(1), unit: "KT" },
          ]}
        />
      ),
    },
    {
      id: "gps",
      title: "GPS",
      component: <GPSPage sog={sog} cog={hdg + 2} />,
    },
    {
      id: "analog",
      title: "VIENTO COMPUESTO",
      component: <WindAnalogPage awa={awa} tws={tws} twa={twa} />,
    },
    {
      id: "ais",
      title: "AIS",
      component: <AISPage shipId={shipId} />,
    },
    {
      id: "steering",
      title: "GOBIERNO",
      component: <SteeringPage hdg={hdg} rudderAngle={-5} />,
    },
    {
      id: "plot_simple",
      title: "GRÁFICO SIMPLE",
      component: (
        <PlotPage
          mode="simple"
          data={[
            { label: "TEMP AGUA", value: "18.4", unit: "°C", color: "#10b981" },
          ]}
        />
      ),
    },
    {
      id: "plot_dual",
      title: "GRÁFICO DUAL",
      component: (
        <PlotPage
          mode="dual"
          data={[
            {
              label: "BSPD",
              value: sog.toFixed(1),
              unit: "KT",
              color: "#3b82f6",
            },
            {
              label: "TWS",
              value: tws.toFixed(1),
              unit: "KT",
              color: "#f59e0b",
            },
          ]}
        />
      ),
    },
  ];

  const nextPage = () => {
    const nextIndex = (initialPageIndex + 1) % pages.length;
    onPageIndexChange(nextIndex);
  };
  const prevPage = () => {
    const prevIndex = (initialPageIndex - 1 + pages.length) % pages.length;
    onPageIndexChange(prevIndex);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -10, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -10, scale: 0.98 }}
          className="fixed left-[94px] top-[100px] z-[7100] w-[310px] h-auto bg-[#0a0a0a] rounded-[30px] shadow-[0_60px_100px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col pointer-events-auto select-none border-[12px] border-[#121212]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {/* Matte Bezel inner groove */}
          <div className="absolute inset-0 pointer-events-none border border-black/40 rounded-[18px] z-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />

          {/* Hardware Status Area (Top of screen) */}
          <div className="bg-black px-4 pt-3 pb-1 flex items-center justify-between z-40 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full shadow-lg transition-all duration-1000",
                  isNavigating ? "bg-[#00ffcc] animate-pulse" : "bg-slate-800",
                )}
              />
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] font-sans">
                {pages[initialPageIndex].title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="opacity-20 hover:opacity-100 transition-opacity"
            >
              <X size={12} className="text-white" />
            </button>
          </div>

          {/* Active Display Panel (OLED BLACK) */}
          <div className="bg-black aspect-[3/4] relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={initialPageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex-grow flex flex-col"
              >
                {pages[initialPageIndex].component}
              </motion.div>
            </AnimatePresence>

            {/* Pages Menu Overlay */}
            <AnimatePresence>
              {isPagesMenuOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-[60] bg-[#050505] border-r border-white/10 flex flex-col pt-10"
                >
                  <div className="px-5 mb-4">
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
                      SELECT PAGE
                    </span>
                  </div>
                  <div className="flex-grow overflow-y-auto px-2 space-y-1 custom-scrollbar">
                    {pages.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onPageIndexChange(idx);
                          setIsPagesMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 rounded text-[9px] font-black uppercase transition-all flex items-center gap-3",
                          initialPageIndex === idx
                            ? "bg-cyan-600/20 text-cyan-400 border-l-2 border-cyan-500"
                            : "text-slate-500 hover:bg-white/5",
                        )}
                      >
                        <span className="w-4 text-center opacity-30">
                          {idx + 1}
                        </span>
                        {p.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Triton 2 Hardware Physical Buttons */}
          <div className="bg-[#121212] px-3 pt-5 pb-9 flex items-center justify-center gap-2.5 border-t border-black relative">
            {/* Surface finish texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Button: PAGES */}
            <button
              onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
              className="flex flex-col items-center justify-center w-[62px] h-[44px] bg-[#1a1a1a] rounded-lg border-t border-white/10 border-b-[5px] border-black active:translate-y-[2px] active:border-b-[2px] transition-all shadow-[0_6px_12px_rgba(0,0,0,0.6)] group z-10"
            >
              <span className="text-[7px] font-black text-slate-500 group-hover:text-white transition-colors tracking-tight">
                PAGES
              </span>
              <div className="mt-1 flex flex-col gap-0.5 opacity-60 group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
                </div>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
                </div>
              </div>
            </button>

            {/* Directional Pad */}
            <div className="flex items-center gap-1 p-1 bg-[#050505] rounded-2xl border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-10">
              <button
                onClick={prevPage}
                className="w-12 h-12 flex items-center justify-center bg-[#1c1c1c] rounded-full border-t border-white/10 border-b-[5px] border-black active:translate-y-[2px] active:border-b-[2px] transition-all text-slate-500 hover:text-white shadow-xl"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextPage}
                className="w-12 h-12 flex items-center justify-center bg-[#1c1c1c] rounded-full border-t border-white/10 border-b-[5px] border-black active:translate-y-[2px] active:border-b-[2px] transition-all text-slate-500 hover:text-white shadow-xl"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Button: MENU */}
            <button className="flex flex-col items-center justify-center w-[62px] h-[44px] bg-[#1a1a1a] rounded-lg border-t border-white/10 border-b-[5px] border-black active:translate-y-[2px] active:border-b-[2px] transition-all shadow-[0_6px_12px_rgba(0,0,0,0.6)] group z-10">
              <span className="text-[7px] font-black text-slate-500 group-hover:text-white transition-colors tracking-tight">
                MENU
              </span>
              <Sun
                size={12}
                className="mt-1 text-slate-600 group-hover:text-amber-400 transition-colors"
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
