/**
 * IPC 交互对前端的描述文件
 */
declare class NgElectron {
    Class: NgElectron;
    constructor();
    static init(): void;
    static login(account: string, pwd: string):void;
}
