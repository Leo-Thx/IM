const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const _ = require('lodash');

// processor事件类型
// const ProcessorEventType = require('./electron/main/processor.event');

// 主进程处理器
const MainProcessor = require('./electron/main/main.processor');

/* 定义部分全局变量 */
const globalVariable = global["globalVariable"] = require('./electron/main/global.variables');

// 设置是否已经登录
globalVariable.set(globalVariable.KEY_NAMES.LOGIN, true);
// 设置当前正处于哪个窗体
globalVariable.set(globalVariable.KEY_NAMES.CURRENT_WINDOW, globalVariable.VAR_WINDOW_NAMES.LOGIN);
// 设置项目根路径
globalVariable.set(globalVariable.KEY_NAMES.ROOT_PATH, path.join(__dirname));
// 设置electron服务路径
globalVariable.set(globalVariable.KEY_NAMES.ELECTORN_PATH, path.join(__dirname, 'electron'));

let mainWindow = null;	// 主要窗口

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
            show: false,
            // width: 350, height: 500,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'electron/render/main.preload.js')
            }
        }
	);

    let uri = 'http://localhost:4200';
	// let uri = url.format({
	// 	protocol: 'file',
	// 	slashes: true,
	// 	pathname: require('path').join(__dirname, 'dist/IM/index.html')
	// });

    mainWindow.loadURL(uri);

	mainWindow.on('ready-to-show', (event)=>{
		mainWindow.show();
		// mainWindow.webContents.openDevTools();
	});

	/*mainWindow.webContents.on('dom-ready', function(event){
		mainWindow.show();
	});*/
 
	globalVariable.set(globalVariable.KEY_NAMES.REFERENCE_IM_WIN, mainWindow);  // 设置主要窗体实例
	
    MainProcessor.init(); // 初始化进程处理
	
	// 可能部分情况下不需要打包该目录
	BrowserWindow.addDevToolsExtension(path.join(__dirname, './extension/augury'));
});

app.on('window-all-closed', ()=>{
	app.exit(0);
});


app.on('gpu-process-crashed', ()=>{
	app.exit(0);
});