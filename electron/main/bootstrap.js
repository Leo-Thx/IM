const { ipcMain } = require('electron');

const IPC_Event = require('../common/IPC_EventType');
const ProcessorEvent = require('./processor.event');

const login = require('./processor/login');
const shortcut= require('./processor/shortcut');
const menu = require('./processor/menu');
const { platform } = require('./platform/platform');

const socket = require('../socket/chat');


const MainBootstrap = {
    init(){
        // 初始化平台代码
        platform._init();

        // 应用本身事件监听 --- start -----
        ipcMain.on(IPC_Event.EXIT_APP, platform.exitApp);
        // ----------------- end  ------

        // 登录
        ipcMain.on(IPC_Event.LOGIN, login.loginHandler);
        
        shortcut.init(platform);    // 初始部分键盘监听处理
        // 截屏处理 -------- start ---------
        ipcMain.on(IPC_Event.CAPTURE_SCREEN, shortcut.captureScreen);
        ipcMain.on(IPC_Event.CAPTURE_SCREEN_OK, shortcut.closeAllCaptureWins);
        ipcMain.on(IPC_Event.CAPTURE_SCREEN_CLOSE, shortcut.closeAllCaptureWins);
        ipcMain.on(IPC_Event.CAPTURE_SCREEN_DRAWED, shortcut.lockAllCaptureWins);
        // --------- end ----------
        
        menu.setAppMenu();

        // socket.init({});
        // 初始化socket
        login.event.on(ProcessorEvent.RENDER_IM_MAIN, (userInfo)=>{
            socket.init(userInfo);
        });
    },
    
    PROCESSOR_INSTANCE: {
	    LOGIN: login,
        SHORT_CUT: shortcut,
        MENU: menu,
        PLATFORM: platform
    }
};

module.exports = MainBootstrap;