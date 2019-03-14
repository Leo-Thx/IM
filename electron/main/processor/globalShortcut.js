const electron = require('electron');
const { globalShortcut, BrowserWindow } = electron;
// const EventEmitter = require('events');
const path = require('path');
// const _event = new EventEmitter;

/**
 * 主要处理各种按键
 */
module.exports = {
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
			let captureWins = globalVariable.get(globalVariable.KEY_NAMES.CAPTURE_IM_WIN);
            if(captureWins) {
                Reflect.ownKeys(captureWins).forEach(screenId=>{
					captureWins[ screenId ].close();
					captureWins[ screenId ] = null;
				});
			}
			globalVariable.remove(globalVariable.KEY_NAMES.CAPTURE_IM_WIN);
		});
	},

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
						// zoomFactor: 1 / scaleFactor,
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
					// skipTaskbar: true,			// 是否在任务栏显示窗体
					// autoHideMenuBar: true,		// 隐藏菜单栏
					movable: false,				// 
					resizable: false,			//
					enableLargerThanScreen: true,
					hasShadow: false,
				});

			captureWin._screenId = screenId;
	
			captureWin.setAlwaysOnTop(true, 'screen-saver');	// 置顶显示
			captureWin.setVisibleOnAllWorkspaces(true);	// mac 
			captureWin.setFullScreenable(false);		// 不允许最大化
			
			captureWin.loadFile(path.join(elPath, 'capture/capture.html'));
			// captureWin.on('ready-to-show', ()=>{
				// captureWin.show();
				// captureWin.openDevTools();
			// });

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