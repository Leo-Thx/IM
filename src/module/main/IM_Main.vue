<template>
    <div class="im_main d-flex h-100 border-top">
        <im-side-bar></im-side-bar>
        <im-chat-list></im-chat-list>
        <im-chat-main></im-chat-main>
    </div>
</template>

<script type="text/javascript">
    import ImSideBar from './../im/IM_SideBar';
    import ImChatList from './../im/IM_ChatList';
    import ImChatMain from './../im/IM_ChatMain';

    export default {
        name: 'IM_Main',
        components:{ ImSideBar, ImChatList, ImChatMain },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    .im_main{ overflow: hidden; }
</style>