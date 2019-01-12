const varibles = new Map();

module.exports = {
    KEY_NAMES: {
        LOGIN: Symbol('login'), // 是否已经登录
        CURRENT_WINDOW: Symbol('current_window'),    // 当前处于哪个窗口
        USER_INFO : Symbol('user_info')
    },
    VAR_WINDOW_NAMES: {     // 窗口的名字
        LOGIN: 'login'
    },
    set: (key, value)=>varibles.set(key, value),
    get: key=>varibles.get(key),
    keys: ()=>varibles.keys(),
    getAll: ()=>varibles.values()
};