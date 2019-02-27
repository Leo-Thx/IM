// const EventEmitter = require('events');
const { BrowserWindow, ipcMain } = require('electron');
const IPC_Event = require('./IPC_EventType');

const loginProcess = require('./process/login.process');
const globalShortCutProcess = require('./process/globalShortcut.process');
const menuProcess = require('./process/menu.process');
// const chatSocketProcess = require('./process/chatSocket.process');

module.exports = {
	init(){
		ipcMain.on(IPC_Event.LOGIN, loginProcess.loginHandler);
		
        globalShortCutProcess.init();
        menuProcess.setAppMenu();
	},
    PROCESS_NAMES: {
	    LOGIN: loginProcess,
        GLOBAL_SHORT_CUT: globalShortCutProcess,
        MENU: menuProcess,
        // CHAT_SOCKET: chatSocketProcess
    }
};