const EventEmitter = require('events');

module.exports = class {
    constructor(name){
        this.name = name;
        this.event = new EventEmitter();
        this.event.setMaxListeners(0);
    }
    on(evName, listener){
        return this.event.on(evName, listener);
    }
    once(evName, listener){
        return this.event.once(evName, listener);
    }
    off(evName, listener = undefined){
        if( typeof listener == null ) this.event.removeAllListeners(evName);
        if( typeof listener === 'function' ) this.event.off(evName, listener);
    }
    emit(evName, data){
        this.event.emit(evName, data);
    }
};