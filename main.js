const path = require('path');
const { app, BrowserWindow } = require('electron');

app.on('ready', ()=>{
    const window = new BrowserWindow({
        show: false,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, 'electron/preload/main.preload.js')
		}
    });

    window.loadURL("http://localhost:8081");
    // window.loadFile("dist/index.html");
    // window.loadURL("http://www.baidu.com");

    window.on('ready-to-show', ()=>{
        window.show();
    });

    BrowserWindow.addDevToolsExtension(path.resolve('./extension/shells/chrome'));
});
