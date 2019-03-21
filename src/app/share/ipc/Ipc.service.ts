import { Injectable } from "@angular/core";
import { NgElectron, IPC_EventType } from './ipc';

/**
 * IPC服务，用来与NgElectron交互
 * 其他组件只能由此服务进行交互
 */ 
@Injectable({
    providedIn: 'root'
})
export class IpcService {
    constructor(public ngElectron: NgElectron, public ipcEvent: IPC_EventType) {
        
    }
}
