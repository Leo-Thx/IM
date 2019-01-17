<template>
    <div class="im_chatmain d-flex ml-1 flex-column h-100">
        <div class="text-left pl-2 chat-title">
            <i class="zi zi_arrowLeft"></i>
            <div class="d-inline-block name ml-1">测试人员</div>
        </div>
        <div class="chat-list h-100">

        </div>
        <div class="chat-input d-flex flex-column m-1 rounded">
            <div class="toolbar d-flex ml-2 mr-2">
                <i class="iconfont im-emojisicon"></i>
                <i class="iconfont im-bell-ring"></i>
                <i class="iconfont im-fill222"></i>
                <i class="iconfont im-image"></i>
                <i class="iconfont im-cut"></i>
                <i class="iconfont im-email"></i>
                <i class="iconfont im-send text-danger ml-auto mr-1"></i>
            </div>
            <div class="send-input h-100 p-2" contenteditable="true"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
	export default {
		name: 'IM_Chat_Main'
	}
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im_chatmain{
        width: 76%;
        .chat-title{
            height: 40px; font-size: 13px;
            i{ line-height: 2.5; }
            i, div{ vertical-align: baseline; }
            box-shadow:0 5px 10px -5px $color-grey-300;
        }

        .chat-list{
            //background: $color-grey-100;
        }

        .chat-input{
            height: 18rem; font-size: .8rem;
            border: 1px solid $color-grey-200;
            .toolbar{
                color: $color-grey-600;
                border-bottom: 1px solid $color-grey-200;
                i{
                    &:hover{
                        cursor: pointer;
                        background: $color-grey-100;
                        color: $color-blue-600;
                    }
                    font-size: 1.1rem;
                    line-height: 1.1rem;
                    padding: .5rem .7rem .8rem;
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