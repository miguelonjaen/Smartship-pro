require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 8089;

// Middleware de seguridad y utilidad
app.use(cors({ origin: '*' }));
app.use(express.json());

// 🛡️ 1. Configuración de Supabase (Llave Maestra)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Por esto (usa tu clave nueva, sin espacios):
const genAI = new GoogleGenerativeAI("AIzaSyAnUglszmg8sXIuQmfiewZiXBvbHHkLUXo");
// Y añade este log para confirmar
console.log("🔑 Clave configurada manualmente:", "AIza...");

// --- ENDPOINTS ---

// 🤖 Endpoint de Chat Seguro con Ubicación Dinámica en Tiempo Real
app.post('/api/chat', async (req, res) => {
  try {
    // 📥 Recibimos la posición en tiempo real desde el frontend
    const { prompt, systemInstruction, isJson, posicionActual } = req.body;
    if (!prompt) return res.status(400).json({ error: "Falta el mensaje" });

    // 📡 CONTEXTO DE UBICACIÓN DINÁMICO
    let reporteUbicacion = "Desconocida. El GPS del buque no ha enviado coordenadas válidas aún.";
    
    if (posicionActual && posicionActual.lat && posicionActual.lng) {
      reporteUbicacion = `Latitud: ${posicionActual.lat}, Longitud: ${posicionActual.lng}`;
      if (posicionActual.sector) {
        reporteUbicacion += ` (Sector / Zona: ${posicionActual.sector})`;
      }
    }

    const telemetriaBuque = `
      --- INFORME TÁCTICO DE BITÁCORA ---
      [Ubicación del Buque]: ${reporteUbicacion}
      [Estado de Sistemas]: Cartografía Leaflet ONLINE, Servidores Supabase PROTEGIDOS.
      [Identificación del Capitán]: El de la gorra.
      ------------------------------------
    `;

    const directivaSistemaFinal = `
      Eres IA_OFFICER, el sistema de inteligencia artificial táctico a bordo de SmartShip PRO.
      Asiste al capitán con datos concisos, profesionales y tono náutico militar.
      
      ${telemetriaBuque}
      
      INSTRUCCIÓN DE OPERACIÓN:
      Si el capitán te pide el estado del tiempo o del viento, utiliza los datos de ubicación (coordenadas o sector) provistos arriba. Simula un reporte meteorológico marítimo realista acorde a esa posición geográfica (viento en nudos, dirección, estado de la mar y ráfagas). Si la ubicación dice "Desconocida", infórmale cortésmente que necesitas que fije una posición en el mapa cartográfico primero.
      
      ${systemInstruction || "Actúa con tu protocolo estándar de asistencia al puente."}
    `;

    const configuracionModelo = { 
      model: "gemini-3-flash-preview",
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
    console.error("❌ Error en comunicación Nexus:", error.message);
    res.status(500).json({ error: "Fallo en la comunicación con la IA" });
  }
});

// 🗄️ Ejemplo de Endpoint Seguro para Base de Datos
// El frontend llamará aquí para pedir datos, y el servidor los buscará en Supabase
app.get('/api/flota', async (req, res) => {
  try {
    // Al usar la service_role key, esta consulta ignora el RLS y siempre funciona
    const { data, error } = await supabase.from('flota').select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error de Supabase:", error.message);
    res.status(500).json({ error: "Error al acceder a la base de datos" });
  }
});

// Endpoint de Salud
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => {
  console.log(`🚀 SmartShip PRO Backend ONLINE en puerto ${PORT}`);
  console.log(`🛡️  Modo Seguro: IA y Supabase encapsulados.`);

  // 👑 ENDPOINT EXCLUSIVO DEL MENÚ ALMIRANTAZGO
// Solo accesible a través de tu servidor seguro
app.get('/api/almirantazgo/usuarios', async (req, res) => {
  try {
    // Tu servidor ignora las restricciones del frontend y lee la vista directamente
    const { data, error } = await supabase
      .from('vista_administracion_usuarios')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error en Menú Almirantazgo:", error.message);
    res.status(500).json({ error: "Acceso denegado a la suite de administración." });
  }
  });

  // Ejemplo para descargar un archivo de forma segura desde el backend
app.get('/api/archivos/:nombreArchivo', async (req, res) => {
  const { nombreArchivo } = req.params;
  
  const { data, error } = await supabase.storage
    .from('tu-bucket-privado')
    .download(nombreArchivo);

  if (error) return res.status(404).json({ error: "Archivo no encontrado" });
  
  // Enviar el archivo de vuelta al frontend
  const buffer = Buffer.from(await data.arrayBuffer());
  res.send(buffer);
});
// 🛥️ ENDPOINT: Obtener Flota
app.get('/api/flota', async (req, res) => {
  try {
    const { data, error } = await supabase.from('flota').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener flota:", error.message);
    res.status(500).json({ error: "Error en el servidor central" });
  }
});

// 📦 ENDPOINT: Obtener Inventario
app.get('/api/inventario', async (req, res) => {
  try {
    const { data, error } = await supabase.from('inventario').select('*'); // Ajusta el nombre de tu tabla si es necesario
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener inventario:", error.message);
    res.status(500).json({ error: "Error en el servidor central" });
  }
});

// 👑 ENDPOINT: Menú Almirantazgo (Usuarios)
app.get('/api/almirantazgo/usuarios', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vista_administracion_usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("❌ Error en Menú Almirantazgo:", error.message);
    res.status(500).json({ error: "Error al obtener la lista de administración" });
  }
});
});