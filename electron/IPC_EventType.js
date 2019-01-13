// vue-cli编译进行处理，但是非必须情况，严格区分CommonJS和ES6模块

// 渲染进程与主进程通讯事件类型

const REPLAY = "_reply";
module.exports = {
	LOGIN: "login",
    buildReply( type ){
	    return type + REPLAY;
    }
};