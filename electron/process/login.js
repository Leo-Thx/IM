const _  = require('lodash');
const IPC_Event = require('./../IPC_EventType');

module.exports = {
	loginHandler(event, data){
        globalVariable.set(globalVariable.KEY_NAMES.USER_INFO, _.cloneDeep(data));
	}
};