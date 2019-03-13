const electron = require('electron');
const { globalShortcut, BrowserWindow } = electron;
const EventEmitter = require('events');
const path = require('path');

let captureWin = null;
const _event = new EventEmitter;

/**
 * 主要处理各种按键
 */
module.exports = {
	init(){
		const macDevTools = 'Command+Option+I',
		winDevTools = 'Control+Alt+I';

		let devToolsKey = winDevTools;

		if( process.platform === "darwin" ){
			devToolsKey = macDevTools;
		}

		if( globalShortcut.isRegistered(devToolsKey) ){
			console.info('already registered');
		} else {
			globalShortcut.register(devToolsKey, function(){
				let win = BrowserWindow.getFocusedWindow();
				win && win.webContents.openDevTools();
			});
		}

		globalShortcut.register('Esc', ()=>{
            if(captureWin) {
                captureWin.close();
                captureWin = null;
            }
        });
	},

	captureScreen(event){
		let screen = electron.screen;

		// screen.getAllDisplays();	// 获取所有可用窗口
		let primary = screen.getPrimaryDisplay();		// 获取主窗口
		// console.info(primary);
		captureWin = new BrowserWindow({
			fullscreen: process.platform === 'win32' || undefined,
			x: 0,
			y: 0,
			width: primary.size.width,
			height: primary.size.height,
			show: false,
			// transparent: true,
			frame: false,				// topBar
			skipTaskbar: true,			// 是否在任务栏显示窗体
			autoHideMenuBar: true,		// 隐藏菜单栏
			movable: false,
			resizable: false,
			enableLargerThanScreen: true,
			hasShadow: false,
		});

		captureWin.setAlwaysOnTop(true, 'screen-saver');	// 置顶显示
		captureWin.setVisibleOnAllWorkspaces(true);	// mac 
		captureWin.setFullScreenable(false);		// 不允许最大化
		
		captureWin.loadFile(path.join(__dirname, '../../capture.html'));
		captureWin.on('ready-to-show', ()=>{
			captureWin.show();
			// captureWin.openDevTools();
		});
	}
};