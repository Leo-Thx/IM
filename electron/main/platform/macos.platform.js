const { IM_Platform } = require('./platform');
const { app } = require('electron');

module.exports = class MacOsPlatform extends IM_Platform {
    constructor(parent) {
        super();
        this.parent = parent;
    }
    init() {}
};

module.exports.Keys = {
    DevTools: 'Command+Option+I'
};


// app.on('activate', (event, visible)=>{
    // console.info('activate: ', visible);
// });
