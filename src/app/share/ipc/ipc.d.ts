import { DesktopCapturer, IpcRenderer } from 'electron';

/**
 * IPC 交互对前端的描述文件
 */
declare interface NgElectron {
    new(): NgElectronConstrutor;
    Class: NgElectronConstrutor;
}

declare class NgElectronConstrutor {
    constructor();
    
    init(): void;
    login(account: string, pwd: string):void;
    exitApp(): void;

    getDesktopCapturer(): DesktopCapturer;  // 获取截图功能
    getIpcRenderer(): IpcRenderer;          // 获取渲染进程IPC
}


/**
 * IPC 事件类型
 */
declare interface IPC_EventType {
    readonly buildReply: (type: string)=>string;
    readonly LOGIN: string;
    readonly CAPTURE_SREEN: string;
}
