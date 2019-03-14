const EventEmitter = require('events');

const prefix = 'menu-'
const menues = [
    'rest', 'save', 'close', 'ok'
];

class Menu extends EventEmitter {
    constructor(node) {
        this.node = node;

        this._menus = menues.map(menu=>prefix+menu);
        this.menues = [];

        for( let menuName of this._menus ){
            this.menues = require(`./`)
        }
    }
}

module.exports = Menu;
