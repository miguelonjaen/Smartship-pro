/**
 * Advanced Gemini API caller - Protocolo Nexus
 * Ahora redirige las peticiones a tu servidor local seguro (puerto 8089)
 */

export interface GeminiResponse {
  text: string;
  functionCalls?: any[];
}

export async function callGemini(
  prompt: string, 
  systemInstruction?: string, 
  isJson?: boolean,
  tools?: any[], // Ajustado para mantener compatibilidad
  posicionActual?: { lat: number; lng: number; sector?: string } // 👈 ¡NUEVO PARAMETRO TÁCTICO!
): Promise<GeminiResponse | any> {
  
  try {
    console.log(`📡 ESTABLECIENDO ENLACE NEXUS SEGURIZADO...`);

    // Hacemos el POST a tu propio servidor (Backend Seguro)
    const response = await fetch('http://localhost:8089/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt, 
        systemInstruction, 
        isJson, 
        tools,
        posicionActual // 👈 Le enviamos la posición en tiempo real al backend
      })
    });

    if (!response.ok) throw new Error("Error de conexión con el backend");

    const data = await response.json();
    return isJson ? JSON.parse(data.text) : data;

  } catch (error: any) {
    console.error("❌ FALLO DE COMUNICACIÓN NEXUS:", error.message);
    return isJson 
      ? { status: "ready", message: "Modo de contingencia activo." }
      : "Error de enlace táctico. Operando en sistemas redundantes...";
  }
}