process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "SmartShip Pro",
    backgroundColor: '#020617',
    webPreferences: {
      // Usamos path.resolve para asegurar que la ruta sea correcta
      preload: path.join(__dirname, 'electron-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
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

  // --- BUSCAR ACTUALIZACIONES AL INICIAR ---
  autoUpdater.checkForUpdatesAndNotify();
}

// --- LÓGICA DE PUERTO SERIE (NMEA) ---
ipcMain.on('connect-nmea', (event, portPath) => {
  if (!SerialPort) {
    event.reply('nmea-error', "Librería serialport no cargada");
    return;
  }

  try {
    const port = new SerialPort({
      path: portPath,
      baudRate: 4800,
      autoOpen: true
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    parser.on('data', (line) => {
      if (mainWindow) mainWindow.webContents.send('nmea-data', line);
    });

    port.on('error', (err) => {
      if (mainWindow) mainWindow.webContents.send('nmea-error', `Error de puerto: ${err.message}`);
    });

    console.log(`Conectado a puerto NMEA: ${portPath}`);
  } catch (error) {
    if (mainWindow) mainWindow.webContents.send('nmea-error', `Fallo al abrir puerto: ${error.message}`);
  }
});

// Inicialización de la App
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});