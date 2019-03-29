/**
 * 定义渲染进程与主进程通讯事件类型
 */

const REPLAY = "_reply";

module.exports = {
    // 服务器下发事件
    buildReply: type => type + REPLAY,

    
    LOGIN: 'login', // 登录窗体触发登录事件

    // 截图部分
    CAPTURE_SCREEN: 'capture-screen',                   // 截屏事件发出，开启多窗口
    CAPTURE_SCREEN_OK: 'capture-screen-ok',             // ok按钮发回
    CAPTURE_SCREEN_CLOSE: 'capture-screen-close',       // 直接关闭
    CAPTURE_SCREEN_DRAWED: 'capture-screen-drawed',     // 已经绘制，通知主进程锁屏[render->main]
    CAPTURE_SCREEN_LOCK_ALL: 'capture-screen-lock-all', // main->render 窗体锁定
    CAPTURE_SCREEN_RESET: 'capture-screen-reset',       // 激活所有被锁定的窗口[未完成] [render->main]
    CAPTURE_SCREEN_UNLOCK: 'capture-screen-unlock',     // 解锁[main->render]
    // CAPUTRE_SCREEN_INIT_COMPLETE: 'capture-screen-init-complete',       // 渲染进程初始化完成[生成背景较慢，防止未初始化时误操作]

    // AppTopBar操作事件
    EXIT_APP: 'exit-app',   // 退出应用
};