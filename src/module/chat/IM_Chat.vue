<template>
    <div class="im-chat d-flex h-100 border-top">
        <im-chat-list></im-chat-list>
        <!--<im-chat-main></im-chat-main>-->
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
	import ImChatList from './../chat/IM_ChatList';
	import ImChatMain from './../chat/IM_ChatMain';
    export default {
    	name: 'IM_Chat',
		components:{ ImChatList, ImChatMain },
    }
</script>

<style type="text/css" lang="scss" scoped>

</style>