const { IM_Platform } = require('./platform');

module.exports = class WinPlatform extends IM_Platform {
    constructor(parent) {
        super();
        this.parent = parent;
    }

    init() {
        // let {tray} = this.parent;

        // tray.custom = '1234';
        // tray.displayBalloon({
        //     icon: 'icon',
        //     title: '这是标题',
        //     content: '这是内容'
        // });
        // // windows下，当消息收到系统侧边栏之后，就不会再次触发
        // tray.on('balloon-show', function(){
        //     console.info('balloon-show');
        // });
        // tray.on('balloon-click', function(e){
        //     console.info('balloon-click', e);
        // });
        // tray.on('balloon-closed', function(){
        //     console.info('balloon-closed');
        // });
    }
};

module.exports.Keys = {
    DevTools: 'Control+Alt+I'
};
