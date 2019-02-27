// const { ipcMain } = require('electron');
const _  = require('lodash');
const ProcessBase = require('./processor.base');

const IPC_EventType = require('./../IPC_EventType');
const ProcessorEvent = require('./../processor.event');

const processorEvent = new ProcessBase();

module.exports = {
	loginHandler(event, data){
	    // 设置全局数据
        globalVariable.set(globalVariable.KEY_NAMES.USER_INFO, _.cloneDeep(data));
        
        // 更换窗体配置
        let win = globalVariable.get(globalVariable.KEY_NAMES.REFERENCE_IM_WIN);

        win.setSize(1100, 700);
        win.setResizable(false);
        win.center();

        win = null;
        
        event.sender.send(IPC_EventType.buildReply(IPC_EventType.LOGIN));
        
        // 通知主进程窗体已经更换
        processorEvent.emit(ProcessorEvent.RENDER_IM_MAIN, globalVariable.get(globalVariable.KEY_NAMES.USER_INFO));
	},
    event: processorEvent
};