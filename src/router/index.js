import Vue from 'vue'
import Router from 'vue-router'

import Login from './../login/Login.vue'
import IM_Main from './../module/main/IM_Main'

import IM_Chat from './../module/chat/IM_Chat';
import IM_Contacts from './../module/concats/IM_Contacts';
import IM_Email from './../module/email/IM_Email';
import IM_Music from './../module/music/IM_Music';


const ChatRouter = [{
	path: '', redirect: { name: 'IM_Chat' }
	}, {
		path: 'im_chat',
		name: 'IM_Chat',
		component: IM_Chat
	}
];
const ContactsRouter = [{
	path: 'im_contacts',
	name: 'IM_Contacts',
	component: IM_Contacts
}];

const EmailRouter = [{
	path: 'im_email',
	name: 'IM_Email',
	component: IM_Email
}];

const MusicRouter = [{
	path: 'im_music',
	name: 'IM_Music',
	component: IM_Music
}];

Vue.use(Router);

export default new Router({
	routes: [{
	  	path: '/',
	  	name: 'Login',
	  	component: Login
	}, {
		path: '/im_main',
		name: 'IM_Main',
		component: IM_Main,
		children : [...ChatRouter, ...ContactsRouter, ...EmailRouter, ...MusicRouter]
	}]
});
