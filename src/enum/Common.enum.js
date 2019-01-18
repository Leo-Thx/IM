export default {
	platform: {
		BROWSER: 'browser',	// 浏览器
		CLIENT: 'client',	// 客户端
        ANDROID: 'android',
        IOS: 'ios'
	},
	os: {
		MAC: 'darwin',		//
		WIN: 'win32',		//
	},
	login: {
		NOT: -1,	// 未登录
		ING: 0,		// 登录中
		LOGIN: 1	// 已登录
	},

	im_module:	{	// sidebar所处的模块
		CHAT: {
			name: 'chat',
			class: 'menu-chat-item',
			icon: 'im-message'
		},
		CONTACT: {
			name: 'contact',
			class: 'menu-contact-item',
			icon: 'im-usergroup'
		},
		EMAIL: {
			name: 'email',
			class: 'menu-emil-item',
			icon: 'im-Email-Folder'
		},
		MUSIC: {
			name: 'music',
			class: 'menu-music-item',
			icon: 'im-icon-test'
		},
		FOLDER: {
			name: 'folder',
			class: 'menu-folder-item',
			icon: 'im-folder'
		},
		CALENDAR: {
			name: 'calendar',
			class: 'menu-calendar-item',
			icon: 'im-Calendar'
		},
	}
}