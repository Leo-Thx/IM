import IM_Chat from './../module/chat/IM_Chat';

export default [
	{ path: '', redirect: { name: 'IM_Chat' } },
	{
		path: 'im_chat',
		name: 'IM_Chat',
		component: IM_Chat
	}
]