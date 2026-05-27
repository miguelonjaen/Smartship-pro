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
  onNMEAData: (callback) => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on('vessel-telemetry', listener);
    return () => ipcRenderer.removeListener('vessel-telemetry', listener);
  },
  onNMEAError: (callback) => {
    const listener = (event, error) => callback(error);
    ipcRenderer.on('nmea-error', listener);
    return () => ipcRenderer.removeListener('nmea-error', listener);
  },
  on: (channel, callback) => {
    const allowedChannels = ['vessel-telemetry', 'nmea-error', 'nmea-raw'];
    if (!allowedChannels.includes(channel)) return () => {};

    const listener = (event, data) => callback(data);
    ipcRenderer.on(channel, listener);
    return () => ipcRenderer.removeListener(channel, listener);
  }
});
