/// <reference types="node" />
import { DesktopCapturer, IpcRenderer } from 'electron';

/**
 * IPC 交互对前端的描述文件
 */
declare class NgElectron {
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
declare namespace IPC_EventType {
    const buildReply: (type: string)=>string;
    const LOGIN: string;
    const CAPTURE_SREEN: string;
} 


declare global {
    interface Window {
        readonly $NgEl: NgElectron;
    }
}

