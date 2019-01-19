<template>
    <div class="im_chatmain d-flex flex-column h-100">
        <div class="text-left pl-2 chat-title">
            <i class="zi zi_arrowLeft"></i>
            <div class="d-inline-block name ml-1">测试人员</div>
        </div>
        <div class="chat-list p-3 h-75">
            <im-chat-message v-for="(item, index) of size" v-bind:key="index" :direction="index % 2 ? 'left': 'right'"></im-chat-message>
            <im-chat-message direction="right"></im-chat-message>
        </div>
        <div class="chat-input d-flex flex-column">
            <div class="toolbar d-flex ml-2 mr-2">
                <i class="iconfont im-emojisicon"></i>
                <i class="iconfont im-bell-ring"></i>
                <i class="iconfont im-fill222"></i>
                <i class="iconfont im-image"></i>
                <i class="iconfont im-cut"></i>
                <i class="iconfont im-email"></i>
                <i class="iconfont im-send text-danger ml-auto"></i>
            </div>
            <div class="send-input h-100 p-2" contenteditable="true"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import ImChatMessage from './IM_ChatMessageItem';
    import _ from 'lodash';
    
	export default {
		name: 'IM_Chat_Main',
        components: {ImChatMessage},
        data(){
            return {
                size: _.range(20)
            }
        }
	}
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im_chatmain{
        width: 76%;
        &:hover .chat-title{ box-shadow:0 5px 10px -5px $color-grey-400; }
        .chat-title{
            transition: all .5s;
            height: 35px; font-size: 13px;
            i{ line-height: 2.5; }
            i, div{ vertical-align: baseline; }
        }

        .chat-list{
            //background: $color-grey-50;
            flex: auto;
            overflow-y: auto;
            color: $color-grey-700;
            margin-right: 4px;
        }

        .chat-input{
            height: 200px; font-size: .8rem;
            border: 1px solid $color-grey-200;
            .toolbar{
                color: $color-grey-600;
                border-bottom: 1px solid $color-grey-200;
                i{
                    font-size: .9rem;
                    &:hover{
                        cursor: pointer;
                        background: $color-grey-100;
                        color: $color-blue-600;
                    }
                    padding: .4rem .7rem .8rem;
                    border-radius: 3px;
                }
            }
            .send-input{
                &:focus{ outline: none; }
                overflow-y: auto;
            }
        }
    }
</style>