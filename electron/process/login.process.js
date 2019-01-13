const _  = require('lodash');
const ProcessBase = require('./process.base');
const ProcessEventType = require('./../Process_EventType');

const processEvent = new ProcessBase();

module.exports = {
	loginHandler(event, data){
	    // 设置全局数据
        globalVariable.set(globalVariable.KEY_NAMES.USER_INFO, _.cloneDeep(data));
        // 建立socket
        
        // 通知主进程更换窗体配置[路由跳转]
        processEvent.emit(ProcessEventType.RENDER_IM_MAIN, {});
	},
    event: processEvent
};