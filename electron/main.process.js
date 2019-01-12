const { BrowserWindow, ipcMain } = require('electron');
const IPC_Event = require('./IPC_EventType');

const loginProcess = require('./process/login');
const globalShortCutProcess = require('./process/globalShortcut');
const menuProcess = require('./process/menu');

module.exports = {
	init(){
		ipcMain.on(IPC_Event.LOGIN, loginProcess.loginHandler);
		
        globalShortCutProcess.init();
        menuProcess.setAppMenu();
	},
	crateWindow(config, url){
		const win = new BrowserWindow(config);
		win.loadURL(url);
		return win;
	}
};