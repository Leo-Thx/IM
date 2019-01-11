import { VueMutationType } from './../enum';

// store.commit({type: '', data: '')
export default {
	[VueMutationType.ROOT_SAVE_PLATFORM](state, platform){
		state.platform = platform;
	},
	[VueMutationType.ROOT_SAVE_OS](state, os){
		state.os = os;
	}
}