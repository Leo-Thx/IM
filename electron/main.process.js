const { BrowserWindow, ipcMain } = require('electron');
const IPC_Event = require('./IPC_EventType');

const loginProcess = require('./process/login');

module.exports = {
	init(){
		ipcMain.on(IPC_Event.LOGIN, loginProcess.loginHandler);
	},
	crateWindow(config, url){
		const win = new BrowserWindow(config);
		win.loadURL(url);
		return win;
	}
};