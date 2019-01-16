<template>
    <div class="im_sidebar p-2 d-flex flex-column position-relative border-right text-center">
        <div class="avatar-item">
            <avatar></avatar>
        </div>
        <div class="operation-item chat-item">
            <i class="zi zi_newMsg"></i>
        </div>
        <div class="operation-item concat-item">
            <i class="zi zi_addressBook"></i>
        </div>
        <div class="operation-item music-item">
            <i class="zi zi_musicBold"></i>
        </div>

        <div class="operation-item email-item">
            <i class="zi zi_at"></i>
        </div>

        <div class="operation-item setting-item">
            <i class="zi zi_tmWhmcs"></i>
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
    		return {}
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .im_sidebar{
        width: 6%;
        background: linear-gradient(#fff, #fff, #eee, #ddd, #ccc);
        .operation-item{
            margin-top: 1rem;
            &:hover{
                cursor: pointer;
                color: #ec407a;
            }
            &.active{
                color: #ec407a;
            }
        }
        .chat-item{ font-size: 1.8rem; }
        .concat-item{ font-size: 1.5rem; }
        .music-item{ font-size: 1.5rem; }
        .email-item{ font-size: 1.5rem; }
        .setting-item{
            font-size: 1.8rem;
            position: absolute;
            bottom: 2rem; left: 50%;
            transform: translateX(-50%)
        }
    }
</style>