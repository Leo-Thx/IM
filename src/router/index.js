import Vue from 'vue'
import Router from 'vue-router'

import Login from './../login/Login.vue'

import IM_Main from './../module/main/IM_Main'

Vue.use(Router);

export default new Router({
	routes: [{
	  	path: '/',
	  	name: 'Login',
	  	component: Login
	}, {
		path: '/im_main',
		name: 'IM_Main',
		component: IM_Main
	}]
});
