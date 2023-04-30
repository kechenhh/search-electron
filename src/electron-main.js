const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path')
const { getFileList } = require('./reader.js');


let mainWindow;  // 用来保存主窗口对象的引用

// 当 Electron 完成初始化并准备创建浏览器窗口时被调用
app.on('ready', () => {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  // 加载页面文件
  if (app.isPackaged) {
    // 如果是打包好的就加载打包的 HTML 文件
    mainWindow.loadFile('dist/index.html');
  } else {
    // 如果没有打包就直接从本地服务器加载
    mainWindow.loadURL('http://localhost:9999/');
  }
  mainWindow.webContents.openDevTools()//开发者工具

  // 关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.handle('open-dirs', async (event, ...args) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '请选择文件夹',
    properties: ['openDirectory']
  })
  if (result.canceled) return null
  return result
})
//发送获取文件
ipcMain.handle('send-event', (event, msg) => {
  let getList = getFileList(msg.path, msg.searchList)
  return getList
})

