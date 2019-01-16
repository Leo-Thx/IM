<template>
    <div class="im-chat d-flex h-100 border-top">
        <im-chat-index v-if="isIndex"></im-chat-index>

        <template v-else>
            <im-chat-list v-on:toChat="enterToChat"></im-chat-list>
            <im-chat-main></im-chat-main>
        </template>

    </div>
</template>

<script type="text/javascript">
    // 首页显示
    import ImChatIndex from './../chat/IM_ChatIndex';
    // 左侧列表
	import ImChatList from './../chat/IM_ChatList';
	// 聊天主界面
	import ImChatMain from './../chat/IM_ChatMain';

    export default {
    	name: 'IM_Chat',
		components:{ ImChatIndex, ImChatList, ImChatMain },
        data(){
    		return {
    			isIndex: true
            }
        },
        methods: {
    		enterToChat(chatId){
                this.isIndex = false;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im-chat{
        background: #fff;
    }
</style>