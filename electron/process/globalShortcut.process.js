const { globalShortcut, BrowserWindow } = require('electron');

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
				win.webContents.openDevTools();
			});
		}
    }
};