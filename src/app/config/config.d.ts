import { NgElectron, IPC_EventType } from "../share/ipc/ipc";

/**
 * declare module|namespace 只有在内部 export后，成员才能访问
 * 同一个命名空间的时候做文件分割的时候，三斜线引入即可
 * 
 * 对模块不能使用 三斜线指令, 只能用 import x from ... | import x = require
 *      为了支持CommonJS和AMD的exports, TypeScript提供了export=语法， 但是仅对ts编译后可用
 * 编译器首先尝试去查找相应路径下的.ts，.tsx再或者.d.ts。 如果这些文件都找不到，编译器会查找 外部模块声明
 */


/**
 * window对象配置
 */
declare global {
    interface Window {
        readonly $NgEl: NgElectron;
        readonly $IpcEvent: IPC_EventType;
    }
}

