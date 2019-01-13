// const { ipcMain } = require('electron');
const _  = require('lodash');
const ProcessBase = require('./process.base');

const IPC_EventType = require('./../IPC_EventType');
const ProcessEventType = require('./../Process_EventType');

const processEvent = new ProcessBase();

module.exports = {
	loginHandler(event, data){
	    // 设置全局数据
        globalVariable.set(globalVariable.KEY_NAMES.USER_INFO, _.cloneDeep(data));
        // 建立socket
        
        // 更换窗体配置
        const win = globalVariable.get(globalVariable.KEY_NAMES.REFERENCE_IM_WIN);
        
        event.sender.send(IPC_EventType.buildReply(IPC_EventType.LOGIN), {
            msg: '更换成功', data
        });
        
        // 通知主进程窗体已经更换
        processEvent.emit(ProcessEventType.RENDER_IM_MAIN, {});
	},
    event: processEvent
};