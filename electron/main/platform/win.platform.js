const { IM_Platform } = require('./platform');

module.exports = class WinPlatform extends IM_Platform {
    constructor() {
        super();
    }

    init() {}
};

module.exports.Keys = {
    DevTools: 'Control+Alt+I'
};
