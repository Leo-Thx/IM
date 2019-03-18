const electron = require('electron');
const { globalShortcut, BrowserWindow } = electron;
// const EventEmitter = require('events');
const path = require('path');
const url = require('url');
const IPC_EventType = require('./../../common/IPC_EventType');
// const _event = new EventEmitter;

/**
 * 主要处理各种按键
 */
const Shortcut = {
	init(){
		// 各个平台需要桥接
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
			Shortcut.closeAllCaptureWins();
		});
	},

	// 关闭所有的截屏操作
	closeAllCaptureWins() {
		let captureWins = globalVariable.get(globalVariable.KEY_NAMES.CAPTURE_IM_WIN);
		if(captureWins) {
			Reflect.ownKeys(captureWins).forEach(screenId=>{
				captureWins[ screenId ].close();
				captureWins[ screenId ] = null;
			});
		}
		globalVariable.remove(globalVariable.KEY_NAMES.CAPTURE_IM_WIN);
	},

	// 锁定非绘制截图的窗体
	isDrawScreenshot(event, payload) {
		// console.info(arguments);
		// globalVariable.set(globalVariable.KEY_NAMES.SCREEN_SHOT_WIN, payload.screeId);	// 不需存储，直接发送即可

		let captureWins = globalVariable.get(globalVariable.KEY_NAMES.CAPTURE_IM_WIN);
		if(captureWins) {
			let needToLock = Reflect.ownKeys(captureWins).filter(screenId=>String(screenId) !== String(payload.screeId));
			needToLock.forEach(screenId=>{
				let cWin = captureWins[ screenId ];
				cWin.webContents.send(IPC_EventType.CAPTURE_SCREEN_LOCK_ALL, payload);
			});
		}
	},

	// 需要处理多个屏幕只能有一个截图
	captureScreen(event){
		const elPath = globalVariable.get(globalVariable.KEY_NAMES.ELECTORN_PATH);
		let screen = electron.screen,
			captureWins = {};
		
		let primary = screen.getPrimaryDisplay();		// 获取主窗口
		let allDisplays = [ primary ];
		// console.info(primary);

		// let allDisplays = screen.getAllDisplays();	// 获取所有可用窗口
		allDisplays.forEach((display)=>{
			let screenId = display.id,
				scaleFactor = display.scaleFactor,
				captureWin = new BrowserWindow({
					webPreferences: {
						// zoomFactor: 4,
						// nodeIntegration: false,
						// preload: path.join(elPath, 'capture/capture.preload.js')
					},
					fullscreen: process.platform === 'win32' || undefined,
					x: display.bounds.x,
					y: display.bounds.y,
					width: display.bounds.width,
					height: display.bounds.height,
					transparent: true,
					frame: false,				// topBar
					skipTaskbar: true,			// 是否在任务栏显示窗体
					autoHideMenuBar: true,		// 隐藏菜单栏
					movable: false,				// 
					resizable: false,			//
					enableLargerThanScreen: true,
					hasShadow: false,

					show: false,
				});
				
			captureWin._screenId = screenId;
	
			// captureWin.setAlwaysOnTop(true, 'screen-saver');	// 置顶显示
			// captureWin.setVisibleOnAllWorkspaces(true);	// mac 
			captureWin.setFullScreenable(false);		// 不允许最大化
			
			let uri = url.format({
				protocol: 'file',
				slashes: true,
				pathname: path.join(elPath, 'capture/index.html')
			});

			captureWin.loadURL(uri);

			captureWin.on('ready-to-show', ()=>{
				captureWin.show();
				// captureWin.openDevTools();
			});

			captureWin.on('closed', () => {
				// let index = captureWins.indexOf(captureWin)
				// if (index !== -1) {
					// captureWins.splice(index, 1)
				// }
				// captureWins.forEach(win => win.close())
			});

			// 聚焦当前鼠标所在屏幕
			let { x, y } = screen.getCursorScreenPoint()
			if (x >= display.bounds.x && x <= display.bounds.x + display.bounds.width 
				&& y >= display.bounds.y && y <= display.bounds.y + display.bounds.height) {
				captureWin.focus()
			} else {
				captureWin.blur()
			}
			
			captureWins[ screenId ] = captureWin;
		});

		// Reflect.ownKeys(captureWins).forEach(screenId=>captureWins[screenId].show());

		globalVariable.set(globalVariable.KEY_NAMES.CAPTURE_IM_WIN, captureWins);
	}
};

module.exports = Shortcut;