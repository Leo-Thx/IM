export default {
	LOGIN: {	// 登录
		path: '/',
		name: 'Login'
	},
	IM_MAIN: {	// IM主界面
		path: '/im_main',
		name: 'IM_Main',
		IM_CHAT: {	// IM chat模块
			path: 'im_chat',
			name: 'IM_Chat',
			IM_DEFAULT: {	// 默认欢迎页面
				path: ''
			},
			IM_CHAT_MAIN: {	// 主界面
				path: 'im_chatMain/:id',
				name: 'IM_ChatMain'
			}
		}
	}
}