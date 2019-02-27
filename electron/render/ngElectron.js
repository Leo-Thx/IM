const { ipcRenderer } = require('electron');
const IPC_Event = require('../common/IPC_EventType');

/**
 * 主要做渲染和主进程桥接，渲染进程不与主进程直接通讯
 */
module.exports.AngularElectron = new class AngularElectron{
	constructor() {
		this.Class = AngularElectron;
	}
	static init(){
		return {
			os: process.platform
		}
	}
	static login(account, pwd){
	    return new Promise((resolve)=>{
            ipcRenderer.once(IPC_Event.buildReply(IPC_Event.LOGIN), function(event, data){
                resolve(data);
            });
        
            ipcRenderer.send(IPC_Event.LOGIN, {account, pwd});
        });
    }
};