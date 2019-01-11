import { CommonType } from './../enum';

export default {
	root_get_platform(state, getters){ return state.platform; },
	root_is_browser(state){ return state.platform === CommonType.platform.BROWSER; },
	root_get_os( state ){ return state.os; }
}