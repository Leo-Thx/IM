const { globalShortcut: globalShortcutProcess, BrowserWindow } = require('electron');

module.exports = {
    init(){
        globalShortcutProcess.register("Control+Alt+I", function(){
            let win = BrowserWindow.getFocusedWindow();
            win.webContents.openDevTools();
        });
    }
};