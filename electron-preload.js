const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('smartshipAPI', {
  // 1. Canal para obtener la ruta por defecto
  getDefaultChartsPath: () => ipcRenderer.invoke('get-default-charts-path'),
  
  // 2. Canal para abrir el diálogo de selección de carpeta
  selectChartsDirectory: () => ipcRenderer.invoke('select-charts-directory'),
  
  // 3. Canal para listar los archivos de la carpeta
  listChartsFiles: (folderPath) => ipcRenderer.invoke('list-charts-files', folderPath),
  
  // Tus otros canales (como el del puerto serie) que ya tuvieras abajo...
  connectNMEA: (portPath) => ipcRenderer.send('connect-nmea', portPath),
  onNMEAData: (callback) => ipcRenderer.on('nmea-data', (event, data) => callback(data)),
  onNMEAError: (callback) => ipcRenderer.on('nmea-error', (event, error) => callback(error))
});