const { IM_Platform } = require('./platform');
const { app } = require('electron');

module.exports = class MacOsPlatform extends IM_Platform {
    constructor() {
        super();
    }
    init() {}
};



// app.on('activate', (event, visible)=>{
    // console.info('activate: ', visible);
// });
