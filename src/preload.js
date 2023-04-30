const { contextBridge, ipcRenderer } = require('electron');



const handleSend = async (val, callback) => {
  //接收主进程处理的数据
  let fallback = await ipcRenderer.invoke('send-event', val)
  callback(fallback)
}

const handleOpenDirs = async (callback) => {
  let fallback = await ipcRenderer.invoke('open-dirs')
  callback(fallback)
}

const handleExport = async (val) => {
  ipcRenderer.invoke('export-excel', val)
}


// 暴露方法给渲染进程
contextBridge.exposeInMainWorld('myApi', {
  handleSend,
  handleOpenDirs,
  handleExport
});