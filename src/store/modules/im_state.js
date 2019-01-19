import { VueMutationType } from './../../enum';

export default {
    namespaced: true,
	state: {
        im_chat_isIndex: true,      // 是否显示主页面
	},
    mutations: {
	    [VueMutationType.IM_CHAT_IS_INDEX](state, isIndex){
	        state.im_chat_isIndex = isIndex;
        }
    }
}