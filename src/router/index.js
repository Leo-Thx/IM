import Vue from 'vue'
import Router from 'vue-router'

import ChatRouter from './im_chat.router';

import Login from './../login/Login.vue'
import IM_Main from './../module/main/IM_Main'

import { VueRouterNames } from './../enum';

Vue.use(Router);

export default new Router({
	routes: [{
	  	path: VueRouterNames.LOGIN.path,
	  	name: VueRouterNames.LOGIN.name,
	  	component: Login
	}, {
		path: VueRouterNames.IM_MAIN.path,
		name: VueRouterNames.IM_MAIN.name,
		component: IM_Main,
		children: ChatRouter
	}]
});
