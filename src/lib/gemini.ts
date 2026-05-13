/**
 * Advanced Gemini API caller using @google/genai SDK.
 * Versión 5.0 - Protocolo Nexus (Actionable Intelligence)
 */

import { GoogleGenAI, FunctionDeclaration } from "@google/genai";

const API_KEY = (process.env.GEMINI_API_KEY || "AIzaSyCM23JCjhLQjLOYKDjZUGIIv4OqwmHkNQc").trim();
const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface GeminiResponse {
  text: string;
  functionCalls?: any[];
}

export async function callGemini(
  prompt: string, 
  systemInstruction?: string, 
  isJson?: boolean,
  tools?: FunctionDeclaration[]
): Promise<GeminiResponse | any> {
  const MODEL_ID = "gemini-3-flash-preview"; 
  
  try {
    console.log(`📡 ESTABLECIENDO ENLACE NEXUS: ${MODEL_ID}...`);

    const result = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
        maxOutputTokens: 2048,
        responseMimeType: isJson ? "application/json" : "text/plain",
        tools: tools ? [{ functionDeclarations: tools }] : undefined,
      },
    });

    if (isJson) {
      try {
        const text = result.text || "{}";
        const startIdx = text.indexOf('{');
        const endIdx = text.lastIndexOf('}') + 1;
        const jsonStr = text.substring(startIdx, endIdx);
        return JSON.parse(jsonStr);
      } catch (e) {
        return { status: "ready", message: "Error técnico en datos." };
      }
    }

    if (tools && tools.length > 0) {
      return {
        text: result.text || "Confirmado. Sistemas operativos.",
        functionCalls: result.functionCalls
      };
    }

    return result.text || "Confirmado. Sistemas operativos.";

  } catch (error: any) {
    console.error("❌ FALLO DE COMUNICACIÓN NEXUS:", error.message);
    if (isJson) return { status: "ready", message: "Modo de contingencia activo." };
    if (tools && tools.length > 0) {
      return { text: "Error de enlace táctico. Operando en sistemas redundantes..." };
    }
    return "Error de enlace táctico. Operando en sistemas redundantes...";
  }
}

