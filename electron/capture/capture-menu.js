const { clipboard, nativeImage, ipcRenderer } = require('electron');
const EventEmitter = require('events');
const IPC_EventType = require('./../common/IPC_EventType');

const prefix = 'menu-'
const menues = [
    // 'reset', 
    'save', 'close', 'ok'
];

class Menu extends EventEmitter {
    constructor(menuName, capture, zone) {
        super();

        this.capture = capture;
        this.zone = zone;
        this.name = menuName;

        this.$node = document.getElementById(`${menuName}`);

        let methodName = menuName.replace(/-(\w)/, (mstr, $1)=>$1.toUpperCase());
        this.$node.addEventListener('click', (event)=>{
            this[ methodName ](event);

            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }

    menuReset(event){
        console.info('reset');
    }

    menuSave(event){
        console.info('save');   // 执行下载

        this.zone.drawRectangle();
        
        let url = this.capture.$canvas.toDataURL(),
            a = document.createElement('a'),
            mEvent = new MouseEvent('click');

        a.download = 'photo';
        a.href = url;
        a.dispatchEvent(mEvent);
    }

    menuClose(event){
        console.info('close');
        ipcRenderer.send(IPC_EventType.CAPTURE_SCREEN_CLOSE, {});
    }
    menuOk(event){
        console.info('ok');

        this.zone.drawRectangle();
        
        // 由于存在分辨比率问题，这里只做一个临时方案
        let ni = nativeImage.createFromDataURL(this.capture.$canvas.toDataURL());
        clipboard.writeImage(ni);

        ipcRenderer.send(IPC_EventType.CAPTURE_SCREEN_OK, {});
    }

    static init( capture, zone ) {
        let menus = menues.map(menu=>prefix+menu),
            result = {};

        for( let menuName of menus ){
            result[ menuName ] = new Menu(menuName, capture, zone);
        }

        // this.$btnClose = document.getElementById('menu-close');
        // this.$btnOk = document.getElementById('menu-ok');
        // this.$btnSave = document.getElementById('menu-save');
        // this.$btnReset = document.getElementById('menu-reset');

        return result;
    }
}

module.exports.Menu = Menu;
module.exports.MenuEnum = menues;
module.exports.MenuPrefix = prefix;