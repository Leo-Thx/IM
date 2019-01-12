const varibles = new Map();

module.exports = {
    KEY_NAMES: {
        LOGIN: 'login', // 是否已经登录
        CURRENT_WINDOW: '',    // 当前处于哪个窗口
    },
    VAR_WINDOW_NAMES: {     // 窗口的名字
        LOGIN: 'login'
    },
    set: (key, value)=>varibles.set(key, value),
    get: key=>varibles.get(key),
    keys: ()=>varibles.keys(),
    getAll: ()=>varibles.values()
};