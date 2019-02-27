// 渲染进程与主进程通讯事件类型

const REPLAY = "_reply";
module.exports = {
	LOGIN: "login",
    buildReply( type ){
	    return type + REPLAY;
    }
};