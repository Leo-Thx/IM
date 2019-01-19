import Vue from 'vue'
import Router from 'vue-router'

import Login from './../login/Login.vue'
import IM_Main from './../module/main/IM_Main'

import IM_Chat from './../module/chat/IM_Chat';
import IM_Contact from './../module/concat/IM_Contact';
import IM_Email from './../module/email/IM_Email';
import IM_Music from './../module/music/IM_Music';
import IM_Folder from './../module/folder/IM_Folder';
import IM_Calendar from './../module/calendar/IM_Calendar';


const ChatRouter = [{
	path: '', redirect: { name: 'IM_Chat' }
	}, {
		path: 'im_chat',
		name: 'IM_Chat',
		component: IM_Chat
	}
];
const ContactsRouter = [{
	path: 'im_contact',
	name: 'IM_Contact',
	component: IM_Contact
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

const FolderRouter = [{
    path: 'im_folder',
    name: 'IM_Folder',
    component: IM_Folder
}];

const CalendarRouter = [{
    path: 'im_calendar',
    name: 'IM_Calendar',
    component: IM_Calendar
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
		children : [...ChatRouter, ...ContactsRouter, ...EmailRouter, ...MusicRouter, ...FolderRouter, ...CalendarRouter]
	}]
});
