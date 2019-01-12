// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import { mapMutations, mapGetters } from 'vuex';

import { VueMutationType, CommonType } from './enum';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
	store,
  	components: { App },
  	template: '<App/>',
	computed: {
		...mapGetters({
			'isBrowser': 'root_is_browser'
		})
	},
	methods: {
		...mapMutations({
			"savePlatform": VueMutationType.ROOT_SAVE_PLATFORM,
			"saveOS": VueMutationType.ROOT_SAVE_OS
		})
	},
	created(){
		let platform = CommonType.platform.BROWSER;
		if( window.VueElectron ){
			platform = CommonType.platform.CLIENT;
			Vue.prototype.$electron = window.VueElectron;

			const result = this.$electron.Class.init();
			this.saveOS(result.os);
		}
		this.savePlatform(platform);
	}
});
