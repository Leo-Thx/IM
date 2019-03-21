import { DesktopCapturer, IpcRenderer } from 'electron';

/**
 * IPC 交互对前端的描述文件
 */
export declare class NgElectron {
    Class: NgElectron;
    constructor();
    static init(): void;
    static login(account: string, pwd: string):void;
    getDesktopCapturer(): DesktopCapturer;  // 获取截图功能
    getIpcRenderer(): IpcRenderer;          // 获取渲染进程IPC
}

/**
 * IPC 事件类型
 */
export declare interface IPC_EventType {
    readonly buildReply: (type: string)=>string;
    readonly LOGIN: string;
    readonly CAPTURE_SREEN: string;
}
