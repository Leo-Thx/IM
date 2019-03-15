const EventEmitter = require('events');

const prefix = 'menu-'
const menues = [
    'reset', 'save', 'close', 'ok'
];

class Menu extends EventEmitter {
    constructor(node) {
        super();
        this.node = node;

        this._menus = menues.map(menu=>prefix+menu);
        this.menues = {};

        for( let menuName of this._menus ){
            this.menues[ menuName ] = require(`./${menuName}`);
        }

        // this.$btnClose = document.getElementById('menu-close');
        // this.$btnOk = document.getElementById('menu-ok');
        // this.$btnSave = document.getElementById('menu-save');
        // this.$btnReset = document.getElementById('menu-reset');
    }
}

module.exports.Menu = Menu;
module.exports.menues = menues;
module.exports.prefix = prefix;