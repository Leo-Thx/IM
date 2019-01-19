<template>
    <div class="im-chat-list d-flex flex-column">
        <div class="search p-1 text-center">
            <div class="input-group">
                <i class="iconfont im-search ml-1 position-absolute"></i>
                <input type="text" class="w-100 p-1 pl-4 pr-4 rounded" name="search" placeholder="Search">
            </div>
        </div>

        <ul class="m-0 p-0 mt-1">
            <li v-for="(item, index) of size" v-bind:key="index" :class="{'active':!index}" class="pl-2" @click="chatTo(item, index)">
                <div class="row m-0 pl-2 pr-1 pt-3 pb-3 chat-item">
                    <div class="col-2">
                        <avatar></avatar>
                    </div>
                    <div class="col-10 pl-2 d-flex flex-column justify-content-around">
                        <div class="row m-0">
                            <div class="col-8 uname">测试</div>
                            <div class="col-4 msg-time text-right">2018/12/34</div>
                        </div>
                        <div class="umessage">我发送了{{item}}条消息我发送了</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
    import Avatar from './../../components/Avatar';
	export default {
		name: 'IM_Chat_List',
        components: {
			Avatar
        },
		data(){
			return {
				size: _.range(20)
            }
		},
        methods: {
			chatTo(item){
                this.$emit('toChat', {
                	chatId: item
                });
            }
        }
	}
</script>

<style type="text/css" lang="scss" scoped>
    @import "./../../../static/css/custom";
    .im-chat-list{
        width: 24%;
        font-size: 11px;
        //background: linear-gradient(#fff, #fff, #FAFAFA);
        /*box-shadow: 0 0 0 0 #fff inset, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset;*/
        // box-shadow:5px 7px 10px -4px $color-grey-500, 5px 7px 10px -4px  $color-grey-500;
        //box-shadow:5px 0 8px -5px $color-grey-400;
        //border-right: 1px solid $color-grey-200;
        //background: $color-grey-50;
        ul{
            /*height: calc(100% - 45px);*/
            flex: auto;
            overflow-x: hidden;
            overflow-y: auto;
            li{
                list-style: none;
                &:hover{
                    cursor: pointer;
                    //background: $color-grey-100;
                }
                &.active{ background: $color-grey-100; }
                .chat-item{ border-bottom: 1px solid $color-grey-100; }
                .chat-item div{ padding: 0; }
                .uname{ font-size: 13px; }
                .umessage{
                    color: #666;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .msg-time{ font-size: 10px; color: #999; }
            }
        }

        .search{
            height: 35px;
            border-bottom: 1px solid $color-grey-100;
            .input-group{
                width: 80%; margin: 0 auto;
                i{ font-size: 1.1rem; }
            }
            input{
                background: $color-grey-100;
                border: 1px solid $color-grey-200;
                &:focus{
                    outline: none;
                }
            }
        }
        &:hover{
            .search{
                //box-shadow: 0 10px 10px -4px $color-grey-200;
            }
        }
    }
</style>