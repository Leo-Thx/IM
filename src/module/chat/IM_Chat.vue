<template>
    <div class="im-chat-container d-flex h-100">
        <im-chat-list v-on:toChat="enterToChat"></im-chat-list>
        
        <template v-if="isIndex">
            <im-chat-index></im-chat-index>
        </template>
    
        <template v-else>
            <im-chat-main></im-chat-main>
        </template>
    </div>
</template>

<script type="text/javascript">
    import { VueMutationType } from './../../enum';
    
    import { mapState, mapMutations } from 'vuex';
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
    		return {}
        },
        computed: {
            ...mapState({
                isIndex: state => state.imChat.im_chat_isIndex
            })
        },
        methods: {
    		enterToChat(chatId){
                this.saveIndex(false);
            },
            ...mapMutations('imChat', {
                saveIndex: VueMutationType.IM_CHAT_IS_INDEX
            })
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im-chat-container{
    
    }
</style>