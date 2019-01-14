<template>
    <div class="im_chatlist border-right">
        <ul class="m-0 p-0">
            <li v-for="(item, index) of size" v-bind:key="index" class="border-bottom">
                <div class="row m-0 pl-2 pr-1 pt-3 pb-3 chat-item">
                    <div class="col-2">
                        <avatar></avatar>
                    </div>
                    <div class="col-10 pl-2 text-left d-flex flex-column justify-content-around">
                        <div class="row m-0">
                            <div class="col-8 uname">测试</div>
                            <div class="col-4 msg-time text-right mdui-text-color-green">2018/12/34</div>
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
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
    .im_chatlist{
        width: 24%;
        font-size: 11px;
        overflow-x: hidden;
        overflow-y: auto;
        li{
            list-style: none;
            &:hover{
                cursor: pointer;
                background: #eee;
            }
        }

        .chat-item div{ padding: 0; }
        .uname{
            font-size: 13px;
        }
        .umessage{
            color: #666;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .msg-time{
            font-size: 10px;
            color: #999;
        }
    }
</style>