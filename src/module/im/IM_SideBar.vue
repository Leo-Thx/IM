<template>
    <div class="im_sidebar p-2 d-flex flex-column position-relative border-right">
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
        /*justify-content: space-between;*/
        background: linear-gradient(#fff, #fff, #eee, #ddd, #ccc);
        /*background-clip: content-box;*/
        .chat-item{ color: #ec407a; }
        .avatar-item{
            padding: 5px;
        }
        .operation-item{
            font-size: 1.8rem; margin-top: 1rem;
            &:hover{
                cursor: pointer;
                color: #ec407a;
            }
        }
        .concat-item{ font-size: 1.5rem; }
        .music-item{
            font-size: 1.5rem;
        }

        .setting-item{
            position: absolute;
            bottom: 2rem; left: 50%;
            transform: translateX(-50%)
        }
    }
</style>