import { CommonType } from './../enum';
import loginService from './../service/login.service';

export default {
    methods: {
        sendToLogin() {
            loginService.loginHttp(this.username, this.password).then(result=>{
                this.saveLogin(CommonType.login.LOGIN); // 更新vuex
                
                if (this.s_platform === CommonType.platform.CLIENT) {   // 发送主进程进行处理
                    this.$electron.Class.login(this.username, this.password);
                }
                
            }).catch(reason=>{
                this.saveLogin(CommonType.login.NOT);
            });
        }
    }
}