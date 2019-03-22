const { Notification, BrowserWindow, app } = require('electron');

/**
 * 不使用鸭子类型校验 强制接口实现
 * platform.js  根据平台进行加载 上层组件针对该接口编程
 *      window.js
 *      macos.js
 *      linux.js
 */
class IM_Platform {
    constructor () {}

    // 初始化
    _init() {
        this.os = globalVariable.get(globalVariable.KEY_NAMES.APP_PLATFORM);
        this.osPlatformConstructor = IM_Platform;   // 默认给自己 防止报错

        if( this.os === 'darwin' ) this.osPlatformConstructor = require('./macos.platform');
        else if( this.os === 'win32' ) this.osPlatformConstructor =  require('./win.platform');
        
        this.osPlatform = new this.osPlatformConstructor();
        if( this.osPlatform ) this.osPlatform.init();

    }

    init() {}

    // 提供一些抽象函数 供子类实现


    // win, percent: 小数
    setProgressBar( win, percent ) {
        if( win instanceof BrowserWindow ) {
            win.setProgressBar( percent );
        }
    }
    
    // 未保证兼容性，用渲染进程HTML5通知代替
    showMainNotification(){
        let noti = new Notification({
            title: '侧二十',
            subtitle: '二级',
            body: '正文',
            silent: true,
            hasReply: true,
            replyPlaceholder: 'placeholder',
            closeButtonText: '关闭222',
            actions: [{
                type: 'button',
                text: '文字1'
            }, {
                type: 'button',
                text: '文字2'
            }]
        });
        noti.on('show', ()=>console.info('show'));
        noti.on('click', ()=>{
            console.info('click');
        });
        noti.on('close', ()=>{
            console.info('close');
        })
        noti.on('reply', (e, str)=>{
            console.info('reply : ' + str);
        });
        noti.on('action', (e, index)=>{
            console.info('action: '+ index)
        })

        noti.show();
    }
};


const platform = new IM_Platform();

module.exports.IM_Platform = IM_Platform;
module.exports.platform = platform;

