/**
 * 该文件提供整个应用共有的全局变量 !WeakMap
 */

const variables = new Map();

module.exports = {
    /**
     * 强制定义的key，不使用Symbol，考虑到渲染进程不能全局读取
     */
    KEY_NAMES: {
        LOGIN: 'login',                         // 是否已经登录
        CURRENT_WINDOW: 'current_window',       // 当前处于哪个窗口
        USER_INFO : 'user_info',
        
        REFERENCE_IM_WIN: 'reference_im_win',   // 主窗口实例
    },

    /**
     * 所处窗口的名字，考虑到工作台等其他窗口可能需要复用
     */
    VAR_WINDOW_NAMES: {     // 窗口的名字
        LOGIN: 'login',     // 登录
        IM_MAIN: 'im_main', // IM主窗口
    },

    set: (key, value)=>variables.set(key, value),
    get: key=>variables.get(key),
    keys: ()=>variables.keys(),
    getAll: ()=>variables.values()
};