const { globalShortcut, BrowserWindow } = require('electron');

module.exports = {
    init(){
        globalShortcut.register("Control+Alt+I", function(){
            let win = BrowserWindow.getFocusedWindow();
            win.webContents.openDevTools();
        });
    }
};