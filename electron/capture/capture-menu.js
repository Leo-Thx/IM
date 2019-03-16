const EventEmitter = require('events');

const prefix = 'menu-'
const menues = [
    'reset', 'save', 'close', 'ok'
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
        });
    }

    menuReset(event){
        console.info('reset');
    }
    menuSave(event){
        console.info('save');
    }
    menuClose(event){
        console.info('close');
    }
    menuOk(event){
        console.info('ok');
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
module.exports.menues = menues;
module.exports.prefix = prefix;