const { AngularElectron } = require("./ngElectron");
const { remote } = require("electron");
const IPC_EventType = require('./../common/IPC_EventType');

// remote.require加载主进程中已经加载的模块，路径相对于主进程
const globalVariable = remote.getGlobal('globalVariable');

Reflect.defineProperty(window, "$NgEl", {
	value: AngularElectron
});

Reflect.defineProperty(window, '$IpcEvent', {
    value: IPC_EventType
})

document.addEventListener('DOMContentLoaded', function(){
    // console.info(globalVariable.get(globalVariable.KEY_NAMES.REFERENCE_IM_WIN));
});