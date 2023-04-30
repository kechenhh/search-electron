const { contextBridge, ipcRenderer } = require('electron');

const handleSend = async (val) => {
  console.log(val)
  //接收主进程处理的数据
  let fallback = await ipcRenderer.invoke('send-event', val)
  console.log(fallback)
}


// 暴露方法给渲染进程
contextBridge.exposeInMainWorld('myApi', {
  handleSend
});