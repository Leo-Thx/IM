/**
 * 定义渲染进程与主进程通讯事件类型
 */

const REPLAY = "_reply";

module.exports = {
    // 服务器下发事件
    buildReply: type => type + REPLAY,

    
    LOGIN: 'login', // 登录窗体触发登录事件

    CAPTURE_SCREEN: 'capture-screen',            // 截屏事件发出，开启多窗口
    CAPTURE_SCREEN_OK: 'capture-screen-ok',      // ok按钮发回
    CAPTURE_SCREEN_CLOSE: 'capture-screen-close',  // 直接关闭
    CAPTURE_SCREEN_DRAWED: 'capture-screen-drawed',  // 已经绘制，主要处理多屏幕时另外屏幕还能操作[render->main]
    CAPTURE_SCREEN_LOCK_ALL: 'capture-screen-lock-all', // main->render 窗体锁定
    CAPTURE_SCREEN_RESET: 'capture-screen-reset',    // 激活所有被锁定的窗口
};