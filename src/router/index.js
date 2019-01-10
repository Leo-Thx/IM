import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from './../login/login.vue'

Vue.use(Router);

export default new Router({
	routes: [{
	  	path: '/',
	  	name: 'Login',
	  	component: Login
	}, {
		path: '/main',
		name: 'Main',
		component: HelloWorld
	}]
});
