/**
 * Advanced Gemini API caller - Protocolo Nexus
 * Usa Google Generative AI directamente (sin dependencia de servidor local)
 */

export interface GeminiResponse {
  text: string;
  functionCalls?: any[];
}

const TIMEOUT_MS = 15000;
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const DEFAULT_GEMINI_API_VERSION = "v1beta";

const getGeminiConfig = () => ({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  model: import.meta.env.VITE_GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
  apiVersion: import.meta.env.VITE_GEMINI_API_VERSION || DEFAULT_GEMINI_API_VERSION,
});

/**
 * Llamada directa a Gemini API (recomendado)
 */
async function callGeminiDirect(
  prompt: string,
  systemInstruction?: string,
  isJson?: boolean,
  tools?: any[]
): Promise<GeminiResponse> {
  const { apiKey, model, apiVersion } = getGeminiConfig();
  
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY no configurada en .env");
  }

  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const requestBody: any = {
      systemInstruction: systemInstruction ? {
        parts: [{ text: systemInstruction }]
      } : undefined,
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    if (isJson) {
      requestBody.generationConfig = {
        responseMimeType: "application/json"
      };
    }

    // Incluir herramientas si existen
    if (tools && tools.length > 0) {
      requestBody.tools = [{
        functionDeclarations: tools
      }];
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content;
    
    if (!content) {
      throw new Error("No content in Gemini response");
    }

    const text = content.parts?.[0]?.text || '';
    
    // Extraer llamadas a funciones si existen
    const functionCalls = content.parts
      ?.filter((p: any) => p.functionCall)
      .map((p: any) => ({
        name: p.functionCall.name,
        args: p.functionCall.args
      })) || [];

    return {
      text,
      functionCalls: functionCalls.length > 0 ? functionCalls : undefined
    };

  } finally {
    clearTimeout(timeoutId);
  }
}

export async function callGemini(
  prompt: string, 
  systemInstruction?: string, 
  isJson?: boolean,
  tools?: any[],
  posicionActual?: { lat: number; lng: number; sector?: string }
): Promise<GeminiResponse | any> {
  
  try {
    console.log(`📡 Llamando a Gemini API...`);

    const result = await callGeminiDirect(prompt, systemInstruction, isJson, tools);
    console.log('✅ Respuesta recibida de Gemini');
    return result;

  } catch (error: any) {
    console.error("❌ Error en callGemini:", error.message);
    
    // Fallback graceful
    if (isJson) {
      return { 
        status: "offline",
        text: "Sistema de IA no disponible",
        message: "Navegación en modo manual."
      };
    }
    
    return {
      text: "Modo offline - Navegando con sistemas redundantes.",
      functionCalls: []
    };
  }
}
