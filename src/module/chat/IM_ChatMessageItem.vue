<template>
    <div class="im-chat-message p-2 d-flex w-75 mb-2" :class="[direction]">
        <div class="avatar">
            <Avatar></Avatar>
        </div>
        <div class="content" :class="[direction==='left' ? 'ml-2': 'mr-2']">
            <div class="name">名字</div>
            <div class="message mt-1 rounded-bottom p-2" :class="[direction==='left' ? 'rounded-right': 'rounded-left']">
                我发了一段话我发了一段话我发了一段话我发了一段话我发了一段话我发了一段话
                我发了一段话我发了一段话我发了一段话我发了一段话我发了一段话我发了一段话
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Avatar from "../../components/Avatar";
    export default {
        name: 'IM_Chat_Message',
        components: {Avatar},
        props: {
            direction: {
                default: 'left', type: String
            }
        }
    }
</script>
<style type="text/css" scoped lang="scss">
    @import "./../../../static/css/custom";
    .im-chat-message{
        .avatar{ width: 40px; }
        .content{
            font-size: 12px;
            .message{
                background: $color-grey-200;
            }
        }
        &.right{
            flex-direction: row-reverse;
            margin-left: auto;
            margin-right: 0;
            .name{ text-align: right; }
            .message{
                color: #fff;
                background: $color-blue-500;
            }
        }
    }
</style>