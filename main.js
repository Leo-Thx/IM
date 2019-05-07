const path = require('path');
const { app, BrowserWindow, Tray, Menu } = require('electron');
const _ = require('lodash');
const url = require('url');

// processor事件类型
const ProcessorEventType = require('./electron/main/processor.event');

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
			backgroundColor: "#FEFEFE",
			// skipTaskbar: true,
            webPreferences: {
                nodeIntegration: false,
                preload: path.join(__dirname, 'electron/render/main.preload.js')
			},
			// titleBarStyle: global.process.platform === 'darwin' ? 'hidden' : 'default',
			// titleBarStyle: 'hiddenInset',
			// titleBarStyle: 'hidden',
			// titleBarStyle: 'customButtonsOnHover',
			icon: path.join(app.getAppPath(), 'logo/logoIconForWin@2x.png'),
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
	
	// 可能部分情况下不需要打包该目录
    // BrowserWindow.addDevToolsExtension(path.join(__dirname, './extension/augury'));
    
    // let s = require('electron').screen
    // console.info( s.getPrimaryDisplay() );
});

app.on('window-all-closed', ()=>{
	app.exit(0);
});


app.on('gpu-process-crashed', ()=>{
	app.exit(0);
});
