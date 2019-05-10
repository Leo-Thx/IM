const path = require('path');
const { app, BrowserWindow, Tray, Menu } = require('electron');
const _ = require('lodash');
const url = require('url');

// processor事件类型
// const ProcessorEventType = require('./electron/main/processor.event');

// 主进程处理器
const MainBootstrap = require('./electron/main/bootstrap');

/* 定义部分全局变量 */
const globalVariable = global["globalVariable"] = require('./electron/main/global.variables');

// 设置是否已经登录
globalVariable.set(globalVariable.KEY_NAMES.LOGIN, true);
// 设置当前正处于哪个窗体
globalVariable.set(globalVariable.KEY_NAMES.WINDOW_CURRENT, globalVariable.VAR_WINDOW_NAMES.LOGIN);
// 设置项目根路径
globalVariable.set(globalVariable.KEY_NAMES.PATH_ROOT, app.getAppPath());
// 设置electron服务路径
globalVariable.set(globalVariable.KEY_NAMES.PATH_ELECTORN, path.join(app.getAppPath(), 'electron'));
// 设置应用所在的平台
globalVariable.set(globalVariable.KEY_NAMES.APP_PLATFORM, global.process.platform);


let mainWindow = null;	// 主要窗口

// todo 处理mac下菜单，处理渲染进程缩放

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
            show: false,
			width: 1080, height: 720,
			title: '',
			frame: false,
			useContentSize: true,
			backgroundColor: "#FFFFFF",
			// skipTaskbar: true,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'electron/render/main.preload.js')
			},
			// titleBarStyle: global.process.platform === 'darwin' ? 'hidden' : 'default',
			// titleBarStyle: 'hiddenInset',
			// titleBarStyle: 'hidden',
			// // titleBarStyle: 'customButtonsOnHover',
			resizable: false,
			maximizable: false
        }
	);
	// mainWindow = new BrowserWindow(browserStyle);

	var uri = url.format({
		protocol: 'file',
		slashes: true,
		pathname: require('path').join(__dirname, 'dist/IM/index.html')
	});
	var uri = 'http://localhost:4200';

    mainWindow.loadURL(uri);

	mainWindow.on('ready-to-show', (event)=>{
		mainWindow.show();
		// mainWindow.webContents.openDevTools();
	});

	/*mainWindow.webContents.on('dom-ready', function(event){
		mainWindow.show();
	});*/
 
	globalVariable.set(globalVariable.KEY_NAMES.REFERENCE_IM_WIN, mainWindow);  // 设置主要窗体实例
	
	MainBootstrap.init(); // 初始化进程处理
	
	// MainBootstrap.PROCESSOR_INSTANCE.PLATFORM.setProgressBar(mainWindow, 1);
    
    // let s = require('electron').screen
	// console.info( s.getPrimaryDisplay() );
	

	// electron.powerMonitor.on('suspend', () => {
	// 	if (mainWindow) {
	// 		mainWindow.webContents.send('appSleep')
	// 	}
	// });
	// electron.powerMonitor.on('resume', () => {
	// 	if (mainWindow) {
	// 		mainWindow.webContents.send('appWake')
	// 	}
	// });
});

app.on('window-all-closed', ()=>{
	app.exit(0);
});


app.on('gpu-process-crashed', ()=>{
	app.exit(0);
});



//多开选项，目前不能多开
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
	app.exit(0)
} else {
	app.on('second-instance', (event, commandLine, workingDirectory) => {
		// if (mainWindow) {
		// 	if (mainWindow.isMinimized()) mainWindow.restore()
		// 	mainWindow.focus()
		// }
	})
}

app.on('activate', function () {
	// mainWindow.show()
});
app.on('before-quit', (e) => {
	app.exit(0)
});


// let downloadList = {};
// session.defaultSession.on("will-download", (event, item, webContents) => {
// 	downloadList[item.getStartTime()] = {
// 		name: item.getFilename(),
// 		receivedBytes: item.getReceivedBytes(),
// 		total: item.getTotalBytes(),
// 		path: item.getSavePath(),
// 		url: item.getURL(),
// 		mime: item.getMimeType(),
// 		status: item.getState(),
// 		startTime: item.getStartTime(),
// 		lastModified: item.getLastModifiedTime(),
// 		item: item
// 	}
// 	if (borwserWindow) {
// 		borwserWindow.webContents.send('downloadStart', downloadList[item.getStartTime()]);
// 	}
// 	console.log('开始下载')
// 	item.on("updated", (event, state) => {
// 		if (state === "interrupted") {
// 			console.log("Download is interrupted but can be resumed");
// 		} else if (state === "progressing") {
// 			if (item.isPaused()) {
// 				downloadList[item.getStartTime()].status = 'pause';
// 				console.log("Download is paused");
// 			} else {
// 				downloadList[item.getStartTime()].status = item.getState();
// 				console.log(`Received bytes: ${item.getReceivedBytes()}`);
// 			}
// 		}

// 		downloadList[item.getStartTime()].receivedBytes = item.getReceivedBytes();
// 		if (borwserWindow) {
// 			borwserWindow.webContents.send('downloadProgress', downloadList[item.getStartTime()]);
// 		}
// 	});

// 	item.once("done", (event, state) => {
// 		if (state === "completed") {
// 			console.log("Download successfully");
// 		} else {
// 			console.log(`Download failed: ${state}`);
// 		}
// 		downloadList[item.getStartTime()].path = item.getSavePath();
// 		downloadList[item.getStartTime()].status = item.getState();
// 		if (borwserWindow) {
// 			borwserWindow.webContents.send('downloadEnd', downloadList[item.getStartTime()]);
// 		}
// 	});
// });
// ipcMain.on('downloadPause', (e, arg) => {
// 	console.log('暂停任务')
// 	downloadList[arg].item.pause()
// })
// ipcMain.on('downloadResume', (e, arg) => {
// 	console.log('恢复任务')
// 	downloadList[arg].item.resume()
// })
// ipcMain.on('downloadCancel', (e, arg) => {
// 	console.log('取消任务')
// 	downloadList[arg].item.cancel()
// })

// defaultSession是整个应用的session
// ipcMain.on('setCookie', (e, arg) => {
//     console.log('this is ====>', arg)
//     const cookie = { url: arg.url || 'http://huolala.cn', domain: arg.domain || ".huolala.cn", name: arg.name, value: arg.value }
//     session.defaultSession.cookies.set(cookie, (error) => {
//     	if (error) console.error(error)
//     })
// })

 //禁止链接跳转
// mainWindow.webContents.on('will-navigate', (e, url) => {
// 	e.preventDefault()
// });
// mainWindow.webContents.on('new-window', (e, url) => {
// 	e.preventDefault();
// });

function createMenu() {
	let template = [{
		label: '编辑',
		submenu: [{
			label: '撤销',
			accelerator: 'CmdOrCtrl+Z',
			role: 'undo'
		}, {
			label: '重做',
			accelerator: 'Shift+CmdOrCtrl+Z',
			role: 'redo'
		}, {
			type: 'separator'
		}, {
			label: '剪切',
			accelerator: 'CmdOrCtrl+X',
			role: 'cut'
		}, {
			label: '复制',
			accelerator: 'CmdOrCtrl+C',
			role: 'copy'
		}, {
			label: '粘贴',
			accelerator: 'CmdOrCtrl+V',
			role: 'paste'
		}, {
			label: '全选',
			accelerator: 'CmdOrCtrl+A',
			role: 'selectall'
		}, {
			label: '打开开发者工具',
			role: 'toggledevtools'
		},]
	}, {
		label: '查看',
		submenu: [{
			label: '切换全屏',
			accelerator: (function () {
				if (global.process.platform === 'darwin') {
					return 'Ctrl+Command+F'
				} else {
					return 'F11'
				}
			})(),
			click: function (item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
				}
			}
		}, {
			type: 'separator'
		}, {
			label: '最小化',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		}, {
			label: '关闭',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		}, {
			label: '退出应用',
			accelerator: 'CmdOrCtrl+Q',
			role: 'quit'
		}]
	}, {
		label: '帮助',
		submenu: [{
			label: '下载新版本',
			click: function (item, focusedWindow) {
				shell.openExternal('http://xxx.cn/download.html')
			}
		}],
	}]
	let menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}


function shakeHandler() {
	let [ox, oy] = mainWindow.getPosition();
	let dindex = 0,
		dir = 1,
		dtimer = null;
	mainWindow.restore();
	mainWindow.focus();
	dtimer = setInterval(function () {
		dindex++;
		if (dindex > 25) {
			clearInterval(dtimer);
		}
		mainWindow.setPosition(ox + dir * 5, oy);
		dir *= -1;
	}, 20);
}


async function newInform(arg) {
	if (!mainWindow.isFocused() || mainWindow.isMinimized() || arg.type == 7) {
		if (global.process.platform == 'win32') {
			mainWindow.flashFrame(true)
		}
		if (global.process.platform == 'darwin') {
			let msg = {};
			msg.id = arg.id;
			msg.name = arg.name;
			msg.index = arg.index;
			msg.msg = arg.msg;
			msg.toType = arg.toType;
			msg.duration = 5000;
			// 系统消息不显示推送
			if (parseInt(arg.type) == 5) {
				return
			}
			// 自己发的消息不显示消息推送
			if (parseInt(arg.from) == parseInt(this.$store.state.userInfo.uid)) {
				return
			}
			if (msg.toType == 3) {
				let e = await this.$store.state.getUserInfo(arg.from);
				msg.name = msg.name;
				ipcRenderer.send('Notification', msg);
			} else {
				ipcRenderer.send('Notification', msg);
			}
		}
	}
}

// 考虑阿里云icon使用远程
function sign (obj, secret) {
	var newObj = {},
		newKey = Object.keys(obj).sort(),
		newKeyLength = newKey.length;
	for (var i = 0; i < newKeyLength; i++) {
		newObj[newKey[i]] = obj[newKey[i]];
	}
	let text = secret;
	for (var item in newObj) {
		text += item + newObj[item];
	}
	text += secret;
	return (crypto.createHash('md5').update(text).digest('hex')).toUpperCase();
}