const path = require('path');
const { app, BrowserWindow } = require('electron');
const _ = require('lodash');

// 窗口配置
const WindowConfig = require('./electron/config/window.config');
const MainProcess = require('./electron/main.process');

let mainWindow = null;	// 主要窗口


app.on('ready', ()=>{
    mainWindow = MainProcess.crateWindow(
    	_.merge(_.cloneDeep(WindowConfig.login), {
			webPreferences: {
				preload: path.join(__dirname, 'electron/preload/main.preload.js')
			}
		}),
		"http://localhost:8081"
		// "dist/index.html"
	);

	mainWindow.on('ready-to-show', ()=>{
		mainWindow.show();
    });

    BrowserWindow.addDevToolsExtension(path.join(__dirname, './extension/shells/chrome'));
});


