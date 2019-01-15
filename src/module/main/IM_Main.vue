<template>
    <div class="im_main d-flex h-100 border-top">
        <im-side-bar></im-side-bar>
        <router-view></router-view>
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
    .im_main{ overflow: hidden; }
</style>