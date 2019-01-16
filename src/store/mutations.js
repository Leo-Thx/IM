import { VueMutationType } from './../enum';

// store.commit({type: '', data: '')
export default {
	[VueMutationType.ROOT_SAVE_PLATFORM](state, platform){
		state.s_platform = platform;
	},
	[VueMutationType.ROOT_SAVE_OS](state, os){
		state.s_os = os;
	},
	[VueMutationType.ROOT_SAVE_LOGIN](state, status){
		state.s_login = status;
	},
	[VueMutationType.ROOT_SAVE_MODULE](state, status){
		state.s_current_module = status;
	}
}