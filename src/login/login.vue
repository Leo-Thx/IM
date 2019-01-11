<template>
    <div class="login-container">
        <div class="background"></div>
        <div class="content container-fluid">
            <div class="row m-3">
                <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
                <input class="form-control" type="text" placeholder="Default input">
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    export default {
        name: "login",
        created(){

        }
    }
</script>

<style scoped lang="scss">
    .login-container{
        height: 100%;
        .background{
            background-image: url("./../../static/image/login/background.jpeg");
            height: 100%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            filter: blur(2rem);
        }
        .content{
            position: absolute; top: 0;
            input:focus{

            }
        }
    }
</style>
