<template>
    <div class="im_sidebar p-2 d-flex flex-column">
        <div class="avatar-item">
            <avatar :url="url"></avatar>
        </div>
        <div class="msg-item chat-item">
            <i class="zi zi_newMsg"></i>
        </div>
        <div class="msg-item concat-item">
            <i class="zi zi_addressBook"></i>
        </div>
        <div class="msg-item music-item">
            <i class="zi zi_musicBold"></i>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Avatar from './../../components/Avatar';
    export default {
    	name: 'IM_Side_Bar',
        components: {
    		Avatar
        },
        data(){
    		return {
    			url : require('./../../../resource/user/image/avatar.jpeg')
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .im_sidebar{
        width: 7%;
        background: linear-gradient(#fff, #fff, #eee, #ddd, #ccc);
        /*background-clip: content-box;*/
        .avatar-item{
            padding: 10px;
        }
        .msg-item{ font-size: 2rem; }
        .concat-item{ font-size: 1.8rem; }
        .music-item{ @extend .concat-item }
    }
</style>