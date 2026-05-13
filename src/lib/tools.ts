import { FunctionDeclaration, Type } from "@google/genai";

export const NAV_TOOLS: FunctionDeclaration[] = [
  {
    name: "set_navigation_target",
    description: "Establece un destino en el mapa para calcular la ruta (derrota).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "Nombre del puerto o destino (ej: 'Puerto Banús', 'Gibraltar').",
        },
        lat: {
          type: Type.NUMBER,
          description: "Latitud del destino.",
        },
        lng: {
          type: Type.NUMBER,
          description: "Longitud del destino.",
        },
      },
      required: ["name", "lat", "lng"],
    },
  },
  {
    name: "start_travesia",
    description: "Inicia oficialmente una travesía (zarpar). Activa el protocolo de despacho y bitácora.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        assisted: {
          type: Type.BOOLEAN,
          description: "Si es true, la travesía se registra como 'asistida' por IA.",
        },
      },
    },
  },
  {
    name: "end_travesia",
    description: "Finaliza la travesía actual (arribar a puerto).",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "activate_mob",
    description: "Activa la alerta de Hombre al Agua (MOB) de emergencia.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  }
];
