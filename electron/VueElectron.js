const { ipcRenderer } = require('electron');

module.exports.VueElectron = new class VueElectron{
	constructor() {
		this.Class = VueElectron;
	}
	init(){
		return {
			os: process.platform
		}
	}
};