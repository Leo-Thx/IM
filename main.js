const path = require('path');
const { app, BrowserWindow } = require('electron');
const _ = require('lodash');

// process事件类型
const ProcessEventType = require('./electron/Process_EventType');
// 窗口配置
const WindowConfig = require('./electron/config/window.config');
// 进程监听
const MainProcess = require('./electron/main.process');
/* 定义部分全局变量 */
const globalVariable = global["globalVariable"] = require('./electron/config/global.variables');
globalVariable.set(globalVariable.KEY_NAMES.LOGIN, true);
globalVariable.set(globalVariable.KEY_NAMES.CURRENT_WINDOW, globalVariable.VAR_WINDOW_NAMES.LOGIN);   //


let mainWindow = null;	// 主要窗口

app.on('ready', ()=>{
    MainProcess.init();
    
    mainWindow = MainProcess.crateWindow(
    	_.merge(_.cloneDeep(WindowConfig.login), {
			webPreferences: {
				preload: path.join(__dirname, 'electron/preload/main.preload.js')
			}
		}),
		"http://localhost:8080"
		// "dist/index.html"
	);

	mainWindow.on('ready-to-show', ()=>{
	    mainWindow.show();
	});
 
	BrowserWindow.addDevToolsExtension(path.join(__dirname, './extension/shells/chrome'));
});


// 渲染IM_Render界面
MainProcess.PROCESS_NAMES.LOGIN.event.on(ProcessEventType.RENDER_IM_MAIN, function(){
    
});

