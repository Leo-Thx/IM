const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const _ = require('lodash');

// process事件类型
const ProcessEventType = require('./electron/Process_EventType');

// 进程监听
const MainProcess = require('./electron/main.process');
/* 定义部分全局变量 */
const globalVariable = global["globalVariable"] = require('./electron/config/global.variables');
globalVariable.set(globalVariable.KEY_NAMES.LOGIN, true);
globalVariable.set(globalVariable.KEY_NAMES.CURRENT_WINDOW, globalVariable.VAR_WINDOW_NAMES.LOGIN);   //


let mainWindow = null;	// 主要窗口

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
            show: false,
            width: 350, height: 500,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'electron/preload/main.preload.js')
            }
        }
	);

    let uri = 'http://localhost:8082';
	/*let uri = url.format({
		protocol: 'file',
		slashes: true,
		pathname: require('path').join(__dirname, 'dist/index.html')
	});*/

    mainWindow.loadURL(uri);

	mainWindow.on('ready-to-show', (event)=>{
	    mainWindow.show();
	});

	/*mainWindow.webContents.on('dom-ready', function(event){
		mainWindow.show();
	});*/
 
	globalVariable.set(globalVariable.KEY_NAMES.REFERENCE_IM_WIN, mainWindow);  // 设置主要窗体实例
	
    MainProcess.init(); // 初始化process
    
	BrowserWindow.addDevToolsExtension(path.join(__dirname, './extension/shells/chrome'));
});
