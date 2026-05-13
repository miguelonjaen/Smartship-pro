import React from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Polyline, 
  useMapEvents,
  Popup,
  LayersControl,
  ZoomControl
} from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Zap, Wind } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';

interface MapProps {
  center: [number, number];
  zoom: number;
  weather: any;
  fleet: any[];
  selectedShipId: string | null;
  currentPath: [number, number][];
  plannedPath: [number, number][];
  isTravesiaActive: boolean;
  isEngineOn: boolean;
  onMapClick: (lat: number, lng: number) => void;
  getShipEmoji: (tipo?: string) => string;
}

export const Map: React.FC<MapProps> = ({
  center,
  zoom,
  weather,
  fleet,
  selectedShipId,
  currentPath,
  plannedPath,
  isTravesiaActive,
  isEngineOn,
  onMapClick,
  getShipEmoji
}) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => onMapClick(e.latlng.lat, e.latlng.lng)
    });
    return null;
  };

  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full z-0" zoomControl={false}>
      <ZoomControl position="bottomright" />
      {weather && <WeatherWidget weather={weather} />}
      
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satélite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Cartas Náuticas CM93">
          <TileLayer 
            url="http://localhost:8080/tiles/{z}/{x}/{y}.png" 
            attribution="Cartografía Vectorial CM93 - Servidor Externo"
            minZoom={3}
            maxZoom={18}
            tms={true}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MapClickHandler />

      {fleet.map(ship => (
        <Marker 
          key={ship.id}
          position={[ship.lat || 36.8, ship.lng || -2.4]} 
          icon={L.divIcon({
            className: 'ship-icon',
            html: `<div class="w-10 h-10 ${selectedShipId === ship.id ? 'bg-cyan-600 ring-4 ring-cyan-400/30' : 'bg-slate-900'} rounded-xl flex items-center justify-center border-2 border-cyan-500/50 shadow-lg">
              <span class="text-lg">${getShipEmoji(ship.tipo_barco)}</span>
            </div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          })}
        />
      ))}

      {currentPath && currentPath.length > 0 && (
        <Polyline positions={currentPath} color="#3b82f6" weight={3} opacity={0.6}>
          <Popup>Estela de Navegación</Popup>
        </Polyline>
      )}

      {plannedPath && plannedPath.length > 0 && (
        <Polyline positions={plannedPath} color="#00FFFF" weight={6} opacity={0.9}>
          <Popup>Ruta Planificada por IA</Popup>
        </Polyline>
      )}

      {isTravesiaActive && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[6000]">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-cyan-600/90 backdrop-blur-md border border-cyan-400/50 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            {isEngineOn ? <Zap className="w-3 h-3 text-white" /> : <Wind className="w-3 h-3 text-white" />}
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">En Navegación</span>
          </motion.div>
        </div>
      )}
    </MapContainer>
  );
};
