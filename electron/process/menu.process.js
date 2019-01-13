const { Menu: MenuProcess } = require('electron');

// 应用菜单处理
module.exports = {
    setAppMenu(){
        const winName = globalVariable.get(globalVariable.KEY_NAMES.CURRENT_WINDOW);
        if( winName === globalVariable.VAR_WINDOW_NAMES.LOGIN ){    // 如果是登录窗口
            MenuProcess.setApplicationMenu(null);
        }
    }
};