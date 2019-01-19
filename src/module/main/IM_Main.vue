<template>
    <div class="im_main d-flex h-100 border-top">
        <im-side-bar></im-side-bar>
        <div class="main-container d-flex flex-column w-100">
            <router-view></router-view>
            <div class="music d-flex">
                <i class="iconfont im-Previoustrack"></i>
                <i class="iconfont im-Play"></i>
                <i class="iconfont im-Pause"></i>
                <i class="iconfont im-Nexttrack"></i>
                <i class="iconfont im-volume"></i>
                <i class="iconfont im-playlist ml-auto mr-0"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import ImSideBar from './IM_SideBar';
    import ImChat from './../chat/IM_Chat';

    export default {
        name: 'IM_Main',
        components:{ ImSideBar, ImChat },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    @import "./../../../static/css/custom";
    @import "~bootstrap/scss/bootstrap-grid";
    .im_main{
        overflow: hidden;
        .music{
            height: 30px; font-size: 1.2rem; line-height: 1;
            border-top: 1px solid $color-grey-200;
            i{
                @extend .p-1, .pl-2, .pr-2;
                border-radius: 3px;
                &:hover{
                    background: $color-grey-100;
                    color: $color-blue-600;
                    cursor: pointer;
                }
            }
        }
    }
</style>