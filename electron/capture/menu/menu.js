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
    }
}

module.exports = Menu;
