/**
 * 定义渲染进程与主进程通讯事件类型
 */

const REPLAY = "_reply";

module.exports = {
    LOGIN: "login", // 登录窗体触发登录事件
    buildReply: type => type + REPLAY
};