<template>
    <div class="im_sidebar p-2 d-flex flex-column position-relative text-center">
        <div class="avatar-item">
            <avatar></avatar>
        </div>
        <div v-for="(menu, index) of $options.IM_Module" :key="index" v-if="!menu.forbidden"
             :class="[menu.class, currentModule===menu.name ? 'active' : '']" class="operation-item"
             @click.stop="changeImModule(menu.name)">
            <i class="iconfont" :class="menu.icon"></i>
        </div>
        <div class="operation-item menu-setting-item">
            <i class="iconfont im-setting1"></i>
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
            font-size: 1.2rem;
            color: $color-grey-600;
            &:hover{
                cursor: pointer;
                color: $color-blue-600;
            }
            &.active{
                color: $color-blue-a400;
            }
        }
        .menu-setting-item{
            font-size: 1.2rem;
            position: absolute;
            bottom: 2rem; left: 50%;
            transform: translateX(-50%)
        }
    }
</style>