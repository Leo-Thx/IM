/**
 * 定义渲染进程与主进程通讯事件类型
 */

const REPLAY = "_reply";

module.exports = {
    // 服务器下发事件
    buildReply: type => type + REPLAY,

    
    LOGIN: 'login', // 登录窗体触发登录事件
    CAPTURE_SREEN: 'capture-screen',    // 截屏
    
    CAPTURE_SREEN_OK: 'capture-screen-ok',      // ok按钮发回
    CAPTURE_SREEN_CLOSE: 'capture-screen-close',  
};