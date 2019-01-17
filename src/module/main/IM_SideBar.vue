<template>
    <div class="im_sidebar p-2 d-flex flex-column position-relative text-center">
        <div class="avatar-item">
            <avatar></avatar>
        </div>
        <div class="operation-item chat-item" :class="{'active': currentModule===$options.IM_Module.CHAT}"
             @click.stop="changeImModule($options.IM_Module.CHAT)">
            <i class="zi zi_newMsg"></i>
        </div>
        <div class="operation-item concat-item" :class="{'active': currentModule===$options.IM_Module.CONTACTS}"
             @click.stop="changeImModule($options.IM_Module.CONTACTS)">
            <i class="zi zi_addressBook"></i>
        </div>

        <div class="operation-item email-item" :class="{'active': currentModule===$options.IM_Module.EMAIL}"
             @click.stop="changeImModule($options.IM_Module.EMAIL)">
            <i class="zi zi_at"></i>
        </div>

        <div class="operation-item music-item" :class="{'active': currentModule===$options.IM_Module.MUSIC}"
             @click.stop="changeImModule($options.IM_Module.MUSIC)">
            <i class="zi zi_musicBold"></i>
        </div>

        <div class="operation-item setting-item">
            <i class="zi zi_tmWhmcs"></i>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { VueMutationType, CommonType } from './../../enum';
    import { mapMutations, mapState } from 'vuex';

    import _ from 'lodash';
    import Avatar from './../../components/Avatar';

    export default {
    	name: 'IM_Side_Bar',
        components: { Avatar },
        computed: {
            ...mapState({
                currentModule: 's_current_module'
            })
        },
        IM_Module: _.cloneDeep(CommonType.im_module),
        data(){
    		return {}
        },
        methods: {
            ...mapMutations({
                saveCurrentModule: VueMutationType.ROOT_SAVE_MODULE
            }),
			changeImModule(type){
                this.saveCurrentModule(type);
				this.$router.push(`im_${type}`);
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im_sidebar{
        width: 6%;
        box-shadow: -1px 0 5px 3px $color-grey-300;
        .avatar-item{ padding: 3px; }
        .operation-item{
            margin-top: 1rem;
            color: $color-grey-600;
            &:hover{
                cursor: pointer;
                color: $color-blue-600;
            }
            &.active{
                color: $color-blue-a400;
            }
        }
        .chat-item{ font-size: 1.5rem; }
        .concat-item{ font-size: 1.2rem; }
        .music-item{ font-size: 1.2rem; }
        .email-item{ font-size: 1.2rem; }
        .setting-item{
            font-size: 1.5rem;
            position: absolute;
            bottom: 2rem; left: 50%;
            transform: translateX(-50%)
        }
    }
</style>