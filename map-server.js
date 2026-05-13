import express from 'express';
import cors from 'cors';
import MBTiles from '@mapbox/mbtiles';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Habilitar CORS para que la app React pueda pedir las teselas
app.use(cors());

// Ruta al archivo mbtiles
const mbtilesPath = path.join(__dirname, 'cartas_privadas.mbtiles');

new MBTiles(mbtilesPath, (err, mbtiles) => {
  if (err) {
    console.error('⚠️ Error al cargar el archivo mbtiles. Asegúrate de que "cartas_privadas.mbtiles" existe en la raíz del proyecto.');
    console.error(err.message);
  } else {
    console.log('✅ Archivo MBTiles cargado correctamente.');
  }

  // Endpoint para servir las teselas
  app.get('/tiles/:z/:x/:y.png', (req, res) => {
    const { z, x, y } = req.params;
    
    if (!mbtiles) {
      return res.status(500).send('Base de datos MBTiles no cargada');
    }

    mbtiles.getTile(z, x, y, (err, tile, headers) => {
      if (err) {
        // Enviar una imagen transparente o 404 si la tesela no existe
        res.status(404).send('Tile not found');
      } else {
        res.set(headers);
        res.send(tile);
      }
    });
  });

  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.listen(PORT, () => {
    console.log(`🚀 Servidor de Cartas CM93 corriendo en http://localhost:${PORT}`);
    console.log(`📂 Sirviendo teselas desde: ${mbtilesPath}`);
    console.log(`🔗 Endpoint de teselas: http://localhost:${PORT}/tiles/{z}/{x}/{y}.png`);
  });
});
