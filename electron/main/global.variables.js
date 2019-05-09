/**
 * 该文件提供整个应用共有的全局变量 !WeakMap
 * 除main.js 之外，其他js不予许加载该文件
 */

const variables = new Map();

module.exports = {
    /**
     * 强制定义的key，不使用Symbol，考虑到渲染进程不能全局读取
     */
    KEY_NAMES: {
        LOGIN: 'login',                         // 是否已经登录
        WINDOW_CURRENT: 'current_window',       // 当前处于哪个窗口
        USER_INFO : 'user_info',
        
        REFERENCE_IM_WIN: 'reference_im_win',   // 主窗口实例
        CAPTURE_IM_WIN: 'capture_im_win',       // 截屏窗体实例[一个对象]

        PATH_ROOT:  'root_path',                // 根路径   [考虑加密之后]
        PATH_ELECTORN:  'electron_path',        // electron目录

        APP_PLATFORM: 'app_platform',           // 当前应用所用平台
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
    remove: key=>variables.delete(key),
    keys: ()=>variables.keys(),
    getAll: ()=>variables.values(),
};