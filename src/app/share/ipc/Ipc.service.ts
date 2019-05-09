import { Injectable, Inject } from "@angular/core";
import { NgElectron, IPC_EventType } from './ipc';
// import { NgElInjectionToken, IPCEventInjectionToken } from './ipc.config';

/**
 * IPC服务，用来与NgElectron交互
 * 其他组件只能由此服务进行交互
 */ 
// @Injectable({
//     providedIn: 'root'
// })
export class IpcService {
    private ngElectron: NgElectron;
    private ipcEvent: IPC_EventType;

    constructor() {
        this.ngElectron = window.$NgEl;
        this.ipcEvent = window.$IpcEvent;
    }

    // 退出应用
    exitApp() {
        this.ngElectron.Class.exitApp();
    }

    // showChatContext() {
    //     this.ngElectron.Class.showChatContext();
    // }

    execShortCut(){
        this.ngElectron.Class.execShortCut();
    }
}
