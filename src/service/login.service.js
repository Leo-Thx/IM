import NetworkHttp from './network.http';
import ApiProtocol from './../config/api_protocol';

export default {
    loginHttp(account, pwd){
        return new Promise((resolve, reject)=>{
            /*NetworkHttp.post(ApiProtocol.HTTP.LOGIN, {
                account, pwd
            }).then(resolve).catch(reject);*/
            setTimeout(function(){
                resolve({
                    ret: 0,
                    msg: '',
                    token: ''
                })
            }, 1000);
        });
    }
}