const { BrowserWindow, ipcMain } = require('electron');

const IPC_Event = require('../common/IPC_EventType');
const ProcessorEvent = require('./processor.event');

const login = require('./processor/login');
const globalShortCut= require('./processor/globalShortcut');
const menu = require('./processor/menu');

const socket = require('./../socket/chat');

/**
 * platform.js  根据平台进行加载 上层组件针对该接口编程
 *      window.js
 *      macos.js
 *      linux.js
 */

module.exports = {
	init(){
        // 登录
        ipcMain.on(IPC_Event.LOGIN, login.loginHandler);
        
        // 截屏
        ipcMain.on(IPC_Event.CAPTURE_SREEN, globalShortCut.captureScreen);
        ipcMain.on(IPC_Event.CAPTURE_SREEN_OK, globalShortCut.closeAllCaptureWins.bind(globalShortCut));
        ipcMain.on(IPC_Event.CAPTURE_SREEN_CLOSE, globalShortCut.closeAllCaptureWins.bind(globalShortCut));
		
        globalShortCut.init();
        menu.setAppMenu();

        // socket.init({});
        // 初始化socket
        login.event.on(ProcessorEvent.RENDER_IM_MAIN, (userInfo)=>{
            socket.init(userInfo);
        });
    },
    
    PROCESSOR_INSTANCE: {
	    LOGIN: login,
        GLOBAL_SHORT_CUT: globalShortCut,
        MENU: menu
    }
};