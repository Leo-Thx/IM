import { CommonType } from './../enum';

export default {
	root_get_platform(state, getters){ return state.s_platform; },
	root_is_browser(state){ return state.s_platform === CommonType.platform.BROWSER; },
	root_get_os( state ){ return state.s_os; }
}