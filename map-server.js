require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 8089;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Gemini - Con manejo seguro de falta de clave
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("✅ Clave de Gemini cargada correctamente");
  } catch (e) {
    console.warn("⚠️ Error al inicializar Gemini:", e.message);
  }
} else {
  console.warn("⚠️ GEMINI_API_KEY no está configurada - AI será limitada");
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(503).json({ error: "Servicio de IA no disponible" });
    }

    const { prompt, systemInstruction, isJson, posicionActual } = req.body;
    if (!prompt) return res.status(400).json({ error: "Falta el mensaje" });

    let reporteUbicacion = "Desconocida";
    if (posicionActual && posicionActual.lat && posicionActual.lng) {
      reporteUbicacion = `Latitud: ${posicionActual.lat}, Longitud: ${posicionActual.lng}`;
      if (posicionActual.sector) {
        reporteUbicacion += ` (Sector: ${posicionActual.sector})`;
      }
    }

    const directivaSistemaFinal = `
      Eres IA_OFFICER, el sistema de inteligencia artificial táctico de SmartShip PRO.
      Ubicación del Buque: ${reporteUbicacion}
      ${systemInstruction || "Actúa con tu protocolo estándar de asistencia al puente."}
    `;

    const configuracionModelo = {
      model: "gemini-1.5-flash",
      systemInstruction: directivaSistemaFinal
    };

    if (isJson) {
      configuracionModelo.generationConfig = { responseMimeType: "application/json" };
    }

    const model = genAI.getGenerativeModel(configuracionModelo);
    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ text: response.text() });
  } catch (error) {
    console.error("❌ Error en /api/chat:", error.message);
    res.status(500).json({ error: "Error en comunicación con IA" });
  }
});

// Fleet endpoint
app.get('/api/flota', async (req, res) => {
  try {
    const { data, error } = await supabase.from('flota').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error en /api/flota:", error.message);
    res.status(500).json({ error: "Error al obtener flota" });
  }
});

// Inventory endpoint
app.get('/api/inventario', async (req, res) => {
  try {
    const { data, error } = await supabase.from('inventario').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error en /api/inventario:", error.message);
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});

// Admin menu endpoint
app.get('/api/almirantazgo/usuarios', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vista_administracion_usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error en /api/almirantazgo/usuarios:", error.message);
    res.status(500).json({ error: "Error en la suite de administración" });
  }
});

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SmartShip Backend ONLINE en puerto ${PORT}`);
  console.log(`🛡️  Modo Seguro: IA y Supabase encapsulados`);
});