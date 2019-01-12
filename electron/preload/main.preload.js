const { VueElectron } = require("./../VueElectron");
const { remote } = require("electron");

// remote.require加载主进程中已经加载的模块，路径相对于主进程
const globalVariable = remote.getGlobal('globalVariable');

Reflect.defineProperty(window, "VueElectron", {
	value: VueElectron
});

document.addEventListener('DOMContentLoaded', function(){
    console.info(globalVariable.get(globalVariable.KEY_NAMES.LOGIN));
});