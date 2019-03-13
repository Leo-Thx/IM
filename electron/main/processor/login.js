const IPC_EventType = require('./../../common/IPC_EventType');
const ProcessorEvent = require('./../processor.event');
const EventEmitter = require('events');

const _event = new EventEmitter();

module.exports = {
	loginHandler(event, data){
	    // 设置全局数据
        globalVariable.set(globalVariable.KEY_NAMES.USER_INFO, data);
        
        // 更换窗体配置
        let win = globalVariable.get(globalVariable.KEY_NAMES.REFERENCE_IM_WIN);

        win.setSize(1100, 700);
        win.setResizable(false);
        win.center();

        win = null;
        
        event.sender.send(IPC_EventType.buildReply(IPC_EventType.LOGIN));
        
        // 通知主进程进行相应初始化操作
        _event.emit(ProcessorEvent.RENDER_IM_MAIN, data);
	},
    event: _event
};