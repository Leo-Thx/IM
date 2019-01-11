<template>
    <div class="login-container">
        <div class="background"></div>
        <div class="content container-fluid">
            <div class="row avatar p-1 mt-4 mb-4 ml-auto mr-auto">
                <img src="../../resource/user/image/avatar.jpeg"/>
            </div>

            <div class="row m-4">
                <input class="form-control" type="text" placeholder="user-name">
            </div>
            <div class="row m-4">
                <input class="form-control" type="password" placeholder="password">
            </div>
            <div class="row m-4">
                <button type="button" class="btn btn-info w-100">登录</button>
            </div>
            <div class="row m-4 operation-btn">
                <div class="offset-1 col-5 border-right border-info">
                    <button type="button" class="btn btn-link btn-sm text-info">忘记密码</button>
                </div>
                <div class="col-5">
                    <button type="button" class="btn btn-link btn-sm text-info">注册</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    export default {
        name: "login",
        created(){
            console.info(this.$electron);
        },
    }
</script>

<style scoped lang="scss">
    @keyframes breathe {
        0% {
            box-shadow:0 1px 2px rgba(255,255,255,0.1);
        }
        100% {
            box-shadow:0 1px 35px rgba(204,204,204,1);
        }
    }

    .login-container{
        height: 100%;
        .avatar{
            /* conic：锥形渐变 mask */
            width: 7rem; height: 7rem; border-radius: 50%;

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
        .content{
            position: absolute; top: 0;
            input:focus{

            }
            .operation-btn{
                .btn{ line-height: 1; padding: 0; }
            }
        }
    }
</style>
