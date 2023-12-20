const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    maximizable: true,
    show: false,
    title: "H5-dooring网站制作平台",
    fullscreen: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.maximize();
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.loadURL('http://h5.dooring.cn:3000/h5_plus/login');
  // mainWindow.loadURL('https://dooring.vip');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  app.commandLine.appendSwitch('--disable-http-cache');

  mainWindow.show();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    const base = {
      fullscreen: false,
      skipTaskbar: true,
      center: true,
      maximizable: true,
      autoHideMenuBar: false,//自动隐藏菜单栏
      // icon: iconPath,// 窗口图标
      parent: null ,//指定父窗口
      resizable: true,
      webPreferences: {//网页功能设置。
        webSecurity: false,//禁用同源策略
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        enableRemoteModule: true,
        contextIsolation: false
      },
    }
    const h5Win = {
      width: 1200,
      minWidth: 1200,
      minHeight: 775,
      height: 775,
      y: 60,
    }
    const otherWin = {
      width: 1200,
      minWidth: 1200,
      minHeight: 800,
      height: 800,
      y: 60,
    }
    if (details.url.indexOf('/preview') > -1) {
			return { 
				action: 'allow',//允许新窗口被创建
				overrideBrowserWindowOptions: {//允许自定义创建的窗口参数
          ...base,
					...h5Win,
				}
			}
		}
    if (details.url.indexOf('/ide') > -1) {
			return { 
				action: 'allow',//允许新窗口被创建
				overrideBrowserWindowOptions: {//允许自定义创建的窗口参数
          ...base,
					...otherWin,
				}
			}
		}
    if (details.url.indexOf('/h5_plus') > -1) {
			return { 
				action: 'allow',//允许新窗口被创建
				overrideBrowserWindowOptions: {//允许自定义创建的窗口参数
          ...base,
          width: 1500,
          height: 860
				}
			}
		}
		return { 
      action: 'allow',//允许新窗口被创建
      overrideBrowserWindowOptions: {//允许自定义创建的窗口参数
        ...base,
        ...otherWin, 
      }
    }
	})

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async ()=>{
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  console.log('before-quit')
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
