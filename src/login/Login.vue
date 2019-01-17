<template>
    <div class="login-container position-relative">
        <!--<div class="background"></div>-->
        <div class="position-absolute w-100 first-level"></div>

        <div class="content container-fluid h-100">
            <div class="row avatar p-1 mt-4 mb-4 ml-auto mr-auto">
                <img src="../../resource/user/image/avatar.jpeg"/>
            </div>
            <div class="row m-4 mt-5">
                <input class="form-control" v-model="username" type="text" placeholder="帐号">
            </div>
            <div class="row m-4">
                <input class="form-control" v-model="password" type="password" placeholder="密码">
            </div>
            <div class="operation-container mt-5">
                <div class="row m-4">
                    <button type="button" class="btn btn-info w-100" @click.stop="login">登录</button>
                </div>
                <div class="row m-4 operation-btn">
                    <div class="offset-1 col-5 border-info">
                        <button type="button" class="btn btn-link btn-sm text-info">忘记密码</button>
                    </div>
                    <div class="offset-1 col-5">
                        <button type="button" class="btn btn-link btn-sm text-info">注册</button>
                    </div>
                </div>
            </div>
        </div>

        <transition name="fade">
            <loading v-if="isLogin === $options.login.ING"></loading>
        </transition>
        
        <transition name="fade">
            <message-short-tip v-if="loginError" type="info" msg="登录失败"></message-short-tip>
        </transition>
        
    </div>

</template>

<script type="text/javascript">
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import { VueMutationType, CommonType } from './../enum';

    import Loading from './../components/Loading';
    import MessageShortTip from './../components/MessageShortTip';
    
    import LoginInterface from './../mixin/login.interface';
    
    export default {
        name: "login",
        mixins: [LoginInterface],
        components: { Loading, MessageShortTip },
        computed: {
            ...mapState({
                isLogin: 's_login'
            }),
            ...mapGetters({
                s_platform: 'root_get_platform'
            })
        },
        login: _.cloneDeep(CommonType.login),
        data(){
        	return {
        	    username: '',
                password: '',
                loginError: false
            }
        },
        methods: {
        	login(){
                this.saveLogin(CommonType.login.ING);
                this.sendToLogin().then(()=>{
                    this.$nextTick(()=>{
						this.$router.push('im_main');
                    });
                });
            },
            ...mapMutations({
                saveLogin: VueMutationType.ROOT_SAVE_LOGIN
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../static/css/_custom";
    @keyframes breathe {
        0% {
            box-shadow:0 1px 2px rgba(255,255,255,0.1);
        }
        100% {
            box-shadow:0 1px 35px rgba(189,189,189,1);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .login-container{
        height: 100%; overflow: hidden;
        .avatar{
            /* conic：锥形渐变 mask */
            width: 5rem; height: 5rem; border-radius: 50%;

            animation-timing-function:ease-in-out;
            animation-name:breathe;
            animation-duration:2700ms;
            animation-iteration-count:infinite;
            animation-direction:alternate;

            img{ width: 100%; border-radius: 50%;}
        }
        .background{
            background: url("./../../static/image/login/background.jpeg") no-repeat;
            height: 100%;
            background-size: 100% 100%;
            filter: blur(2rem);
        }
        .first-level{
            height: 30%;
            z-index: -1;
            background: linear-gradient(to right, #fff, #fff, $color-grey-50, $color-grey-300);
            transform: rotate(-19.5deg) scaleX(1.5);
            top: -85px;
        }
        .content{
            position: absolute; top: 0;
            input{ font-size: 13px; }
            .operation-btn{
                .btn{ line-height: 1; padding: 0; }
            }
            .operation-container{
                bottom: 1rem;
            }
        }
    }
</style>
