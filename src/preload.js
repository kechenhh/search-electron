const { contextBridge, ipcRenderer } = require('electron');

// 把 ipcRenderer 暴露给渲染进程
contextBridge.exposeInMainWorld('electronApi', {
  ipcRenderer
});