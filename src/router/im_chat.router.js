import { VueRouterNames } from './../enum';

import IM_Chat from './../module/chat/IM_Chat';
import IM_ChatIndex from './../module/chat/IM_ChatIndex';
import IM_ChatMain from './../module/chat/IM_ChatMain';

const { IM_CHAT, IM_CHAT: {IM_DEFAULT: IM_DEFAULT, IM_CHAT_MAIN} } = VueRouterNames.IM_MAIN;

export default [
	{ path: '', redirect: { name: 'IM_Chat' }},
	{
		path: IM_CHAT.path,
		name: IM_CHAT.name,
		component: IM_Chat,
		children: [{
			path: IM_DEFAULT.path,
			component: IM_ChatIndex
		}, {
			path: IM_CHAT_MAIN.path,
			name: IM_CHAT_MAIN.name,
			component: IM_ChatMain
		}]
	}
]