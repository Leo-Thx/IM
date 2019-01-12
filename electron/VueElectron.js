const { ipcRenderer } = require('electron');
const IPC_Event = require('./IPC_EventType');

module.exports.VueElectron = new class VueElectron{
	constructor() {
		this.Class = VueElectron;
	}
	static init(){
		return {
			os: process.platform
		}
	}
	static login(account, pwd){
	    ipcRenderer.send(IPC_Event.LOGIN, {account, pwd});
    }
};