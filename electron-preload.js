const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('smartshipAPI', {
  // Enviar comando para conectar
  connectNMEA: (portPath) => ipcRenderer.send('connect-nmea', portPath),
  
  // Escuchar datos NMEA
  onNMEAData: (callback) => ipcRenderer.on('nmea-data', (event, data) => callback(data)),
  
  // Escuchar errores
  onNMEAError: (callback) => ipcRenderer.on('nmea-error', (event, err) => callback(err))
});