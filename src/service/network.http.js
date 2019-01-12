// Fetch API
import axios from 'axios';

// axios(config);
// axios(url, [config]);

// 所有支持请求的方法的别名，在使用别名方法时， url、method、data 这些属性都不必在配置中指定。
// 	axios.request(config)
// 	axios.get(url[, config])
// 	axios.delete(url[, config])
// 	axios.head(url[, config])
// 	axios.post(url[, data[, config]])
// 	axios.put(url[, data[, config]])
// 	axios.patch(url[, data[, config]])

axios.defaults.baseURL = '';

const myInterceptor = axios.interceptors.request.use(function(config){}, function(error){});
const myInterceptor2 = axios.interceptors.response.use(response=>{}, error=>{});

axios.interceptors.request.eject(myInterceptor);
axios.interceptors.response.eject(myInterceptor2);


const NetworkHttp = {
	http() {
		const instance = axios.create({});
		instance.request({});
	},
	get(url, config) {
		return axios.get(url, config);
	},
	post() {

	},
	put() {

	},
	delete() {

	}
};

export default NetworkHttp ;
export { NetworkHttp as NetWorkMixin } ;