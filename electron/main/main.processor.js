// const EventEmitter = require('events');
const { BrowserWindow, ipcMain } = require('electron');
const IPC_Event = require('../common/IPC_EventType');
const ProcessorEvent = require('./processor.event');

const login = require('./processor/login');
const globalShortCut= require('./processor/globalShortcut');
const menu = require('./processor/menu');

module.exports = {
	init(){
		ipcMain.on(IPC_Event.LOGIN, login.loginHandler);
		
        globalShortCutProcess.init();
        menuProcess.setAppMenu();

        login.event.on(ProcessorEvent.RENDER_IM_MAIN, (userInfo)=>{
            // socket
        });
    },
    
    PROCESSOR_INSTANCE: {
	    LOGIN: login,
        GLOBAL_SHORT_CUT: globalShortCut,
        MENU: menu
    }
};