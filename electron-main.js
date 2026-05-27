process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// 🛠️ Corrección: Se añade 'dialog' a las importaciones de electron
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// Importación dinámica para evitar errores si no están instalados
let SerialPort;
let ReadlineParser;
try {
  const serialport = require('serialport');
  SerialPort = serialport.SerialPort;
  ReadlineParser = require('@serialport/parser-readline').ReadlineParser;
} catch (e) {
  console.error("Librerías de puerto serie no encontradas");
}

let mainWindow;

// ========================================================
// 🔄 CONFIGURACIÓN DE AUTO-UPDATE
// ========================================================
function setupAutoUpdater() {
  // Configuración de electron-log para debug
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  
  // Configuración explícita del feed de GitHub (opcional, pero recomendado)
  // Si el repo es privado, necesitas GITHUB_TOKEN en variables de entorno
  if (process.env.GITHUB_TOKEN) {
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'miguelonjaen',
      repo: 'Smartship-pro',
      token: process.env.GITHUB_TOKEN
    });
  }

  // Event: Se encontró una actualización disponible
  autoUpdater.on('update-available', (info) => {
    log.info('🔄 Actualización disponible:', info.version);
    if (mainWindow) {
      mainWindow.webContents.send('update-available', {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes
      });
    }
  });

  // Event: Descargando actualización
  autoUpdater.on('download-progress', (progressObj) => {
    log.info(`⬇️ Descargando: ${progressObj.percent.toFixed(2)}%`);
    if (mainWindow) {
      mainWindow.webContents.send('download-progress', {
        percent: progressObj.percent,
        bytesPerSecond: progressObj.bytesPerSecond,
        transferred: progressObj.transferred,
        total: progressObj.total
      });
    }
  });

  // Event: Actualización descargada y lista para instalar
  autoUpdater.on('update-downloaded', (info) => {
    log.info('✅ Actualización descargada, lista para instalar:', info.version);
    if (mainWindow) {
      mainWindow.webContents.send('update-downloaded', {
        version: info.version,
        message: '¡Actualización descargada! Reinicia la app para instalar.'
      });
    }
  });

  // Event: Error en la búsqueda de actualizaciones
  autoUpdater.on('error', (error) => {
    log.error('❌ Error de auto-update:', error);
    if (mainWindow) {
      mainWindow.webContents.send('update-error', {
        message: error.message || 'Error desconocido en auto-update'
      });
    }
  });

  // Event: Actualización no disponible
  autoUpdater.on('update-not-available', (info) => {
    log.info('✅ La aplicación está actualizada:', info.version);
    if (mainWindow) {
      mainWindow.webContents.send('update-not-available', {
        version: info.version,
        message: 'Ya tienes la última versión'
      });
    }
  });
}

// ========================================================
// 🖥️ IPC HANDLERS PARA AUTO-UPDATE
// ========================================================

// Buscar actualizaciones manualmente
ipcMain.handle('check-for-updates', async () => {
  try {
    log.info('🔍 Usuario solicitó búsqueda de actualizaciones');
    const result = await autoUpdater.checkForUpdates();
    return {
      success: true,
      updateAvailable: result.updateInfo !== null,
      version: result.updateInfo?.version
    };
  } catch (error) {
    log.error('Error al buscar actualizaciones:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Instalar actualización (cuando ya está descargada)
ipcMain.handle('install-update', async () => {
  log.info('📥 Instalando actualización...');
  autoUpdater.quitAndInstall();
});

// Obtener versión actual
ipcMain.handle('get-app-version', async () => {
  return app.getVersion();
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: `SmartShip Pro ${packageJson.version}`,
    backgroundColor: '#020617',
    webPreferences: {
      // Usamos path.resolve para asegurar que la ruta sea correcta
      preload: path.join(__dirname, 'electron-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  // DETECCIÓN ROBUSTA DE MODO DESARROLLO
  // Si app.isPackaged es falso, estamos ejecutando en desarrollo (npm run electron:start)
  const isDev = !app.isPackaged;

  if (isDev) {
    // En desarrollo cargamos la URL de Vite
    mainWindow.loadURL('http://localhost:3000').catch(() => {
      console.log("Vite aún no está listo, reintentando en 2 segundos...");
      setTimeout(() => mainWindow.loadURL('http://localhost:3000'), 2000);
    });
    
    // Opcional: abre las herramientas de desarrollo automáticamente
    // mainWindow.webContents.openDevTools();
  } else {
    // En producción cargamos el archivo de la carpeta dist
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // --- BUSCAR ACTUALIZACIONES AL INICIAR (SOLO EN PRODUCCIÓN) ---
  if (!isDev) {
    // Esperar a que la ventana esté lista antes de buscar actualizaciones
    mainWindow.webContents.on('did-finish-load', () => {
      log.info('🖥️ Ventana cargada, buscando actualizaciones...');
      autoUpdater.checkForUpdates();
    });
  }
}

// ========================================================
// 🛰️ NMEA PARSER CORE (GPRMC, IIMWV, SDDPT)
// ========================================================
function validateNMEAChecksum(line) {
  const sentence = String(line || '').trim();
  if (!sentence.startsWith('$') && !sentence.startsWith('!')) return { valid: false, reason: 'missing-start' };

  const starIndex = sentence.indexOf('*');
  if (starIndex === -1) return { valid: false, reason: 'missing-checksum' };

  const payload = sentence.slice(1, starIndex);
  const expected = sentence.slice(starIndex + 1, starIndex + 3).toUpperCase();
  if (!/^[0-9A-F]{2}$/.test(expected)) return { valid: false, reason: 'invalid-checksum-format' };

  let checksum = 0;
  for (let i = 0; i < payload.length; i += 1) checksum ^= payload.charCodeAt(i);

  const actual = checksum.toString(16).toUpperCase().padStart(2, '0');
  return { valid: actual === expected, reason: actual === expected ? 'ok' : 'checksum-mismatch:' + actual };
}

function numberOrZero(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseNMEASentence(line) {
  const sentence = String(line || '').trim();
  if (!sentence.startsWith('$') && !sentence.startsWith('!')) return null;

  const checksum = validateNMEAChecksum(sentence);
  if (!checksum.valid) {
    return { type: 'NMEA_INVALID', raw: sentence, reason: checksum.reason, timestamp: Date.now() };
  }

  const body = sentence.slice(0, sentence.indexOf('*'));
  const parts = body.split(',');
  const type = parts[0].substring(3); // RMC, GGA, VTG, MWV, DPT, DBT

  try {
    switch (type) {
      case 'RMC':
        if (parts[2] !== 'A') return null;
        return {
          type: 'GPS',
          lat: convertToDecimal(parts[3], parts[4]),
          lng: convertToDecimal(parts[5], parts[6]),
          sog: numberOrZero(parts[7]),
          cog: numberOrZero(parts[8]),
          quality: 'valid',
          sentence: 'RMC',
          timestamp: Date.now()
        };

      case 'GGA':
        if (numberOrZero(parts[6]) <= 0) return null;
        return {
          type: 'GPS',
          lat: convertToDecimal(parts[2], parts[3]),
          lng: convertToDecimal(parts[4], parts[5]),
          fixQuality: numberOrZero(parts[6]),
          satellites: numberOrZero(parts[7]),
          hdop: numberOrZero(parts[8]),
          quality: 'valid',
          sentence: 'GGA',
          timestamp: Date.now()
        };

      case 'VTG':
        return {
          type: 'GPS',
          cog: numberOrZero(parts[1]),
          sog: numberOrZero(parts[5]),
          quality: 'valid',
          sentence: 'VTG',
          timestamp: Date.now()
        };

      case 'MWV':
        return {
          type: 'WIND',
          angle: numberOrZero(parts[1]),
          reference: parts[2],
          speed: parts[4] === 'M' ? numberOrZero(parts[3]) * 1.94384 : numberOrZero(parts[3]),
          unit: 'N',
          quality: parts[5] === 'V' ? 'invalid' : 'valid',
          sentence: 'MWV',
          timestamp: Date.now()
        };

      case 'DPT':
        return {
          type: 'DEPTH',
          depth: numberOrZero(parts[1]) + numberOrZero(parts[2]),
          quality: 'valid',
          sentence: 'DPT',
          timestamp: Date.now()
        };

      case 'DBT':
        return {
          type: 'DEPTH',
          depth: numberOrZero(parts[3]),
          quality: 'valid',
          sentence: 'DBT',
          timestamp: Date.now()
        };

      default:
        return null;
    }
  } catch (e) {
    return { type: 'NMEA_INVALID', raw: sentence, reason: e.message || 'parse-error', timestamp: Date.now() };
  }
}

function convertToDecimal(coord, direction) {
  if (!coord || !direction || coord.indexOf('.') === -1) return 0;
  try {
    const dotPos = coord.indexOf('.');
    const degrees = parseFloat(coord.substring(0, dotPos - 2)) || 0;
    const minutes = parseFloat(coord.substring(dotPos - 2)) || 0;
    let decimal = degrees + (minutes / 60);
    if (direction === 'S' || direction === 'W') decimal *= -1;
    return isNaN(decimal) ? 0 : decimal;
  } catch (e) {
    return 0;
  }
}

// --- LÓGICA DE PUERTO SERIE (NMEA) ---
let activePort = null;
ipcMain.on('connect-nmea', (event, portPath) => {
  if (!SerialPort) {
    event.reply('nmea-error', "Librería serialport no cargada");
    return;
  }

  if (activePort && activePort.isOpen) {
    activePort.close();
  }

  log.info(`⚓ Intentando atraque en puerto serie: ${portPath}`);

  try {
    activePort = new SerialPort({
      path: portPath,
      baudRate: 4800,
      autoOpen: true
    });

    const parser = activePort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    parser.on('data', (line) => {
      const parsedData = parseNMEASentence(line);
      if (mainWindow) {
        // Enviamos la línea bruta para debug y el objeto parseado para navegación
        mainWindow.webContents.send('nmea-raw', line);
        if (parsedData) {
          mainWindow.webContents.send('vessel-telemetry', parsedData);
        }
      }
    });

    activePort.on('error', (err) => {
      if (mainWindow) mainWindow.webContents.send('nmea-error', `Error de puerto: ${err.message}`);
    });

    activePort.on('close', () => {
      log.warn("🔌 Puerto serie cerrado");
      if (mainWindow) mainWindow.webContents.send('nmea-error', "Puerto desconectado");
    });

    console.log(`Conectado a puerto NMEA: ${portPath}`);
  } catch (error) {
    if (mainWindow) mainWindow.webContents.send('nmea-error', `Fallo al abrir puerto: ${error.message}`);
  }
});

// ========================================================
// 📁 CANALES IPC ÚNICOS PARA EL REPOSITORIO DE CARTAS NÁUTICAS
// ========================================================

// 1. Obtener o crear la carpeta por defecto en Documentos (SOLO UNO)
ipcMain.handle('get-default-charts-path', () => {
  const defaultPath = path.join(app.getPath('documents'), 'SmartShip_Cartas');
  if (!fs.existsSync(defaultPath)) {
    fs.mkdirSync(defaultPath, { recursive: true });
  }
  return defaultPath;
});

// 2. Abrir ventana de Windows para que el usuario elija su propia carpeta
ipcMain.handle('select-charts-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    title: 'Seleccionar Repositorio de Cartas Náuticas PRO'
  });
  if (result.canceled) {
    return null;
  } else {
    return result.filePaths[0];
  }
});

// 3. Listar los archivos de mapas agrupados en un solo manejador limpio (SOLO UNO)
// 📦 Busca esta función en tu backend de Electron (main.js)
// En tu backend (main.js) busca el handler de 'list-charts-files'
ipcMain.handle('list-charts-files', async (event, args) => {
  try {
    // Comprobamos si React nos envió la ruta directamente como un texto, o metida dentro de un objeto
    let folderPath = "";
    if (typeof args === 'string') {
      folderPath = args;
    } else if (args && typeof args === 'object' && args.path) {
      folderPath = args.path;
    } else if (args && typeof args === 'object' && args.folderPath) {
      folderPath = args.folderPath;
    }

    console.log("=========================================");
    console.log("🚨 EL BACKEND HA RECIBIDO LA RUTA:", folderPath);
    console.log("=========================================");

    if (!folderPath) {
      console.log("❌ Error: La ruta recibida está vacía o es undefined.");
      return [];
    }

    // Limpiamos la ruta de espacios y normalizamos barras de Windows
    const normalizedPath = path.resolve(folderPath.trim());

    if (!fs.existsSync(normalizedPath)) {
      console.log("❌ La ruta no existe en el disco duro:", normalizedPath);
      return [];
    }

    // Leemos la carpeta de forma nativa
    const todosLosArchivos = fs.readdirSync(normalizedPath);
    console.log("-> Archivos brutos encontrados por Node:", todosLosArchivos);

    // Filtramos ignorando mayúsculas/minúsculas para .mbtiles y .geojson
    const cartasValidadas = todosLosArchivos.filter(file => {
      const nombreMinuscula = file.toLowerCase();
      return nombreMinuscula.endsWith('.mbtiles') || nombreMinuscula.endsWith('.geojson');
    });

    console.log("✅ CARTAS ENCONTRADAS Y ENVIADAS A REACT:", cartasValidadas);
    return cartasValidadas;

  } catch (error) {
    console.error("❌ Error grave en el backend leyendo la carpeta:", error);
    return [];
  }
});

// Inicialización de la App
app.whenReady().then(() => {
  setupAutoUpdater();  // 🔄 Configurar auto-update antes de crear ventana
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
