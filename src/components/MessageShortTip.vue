<template>
    <div class="message-short-tip text-center pt-3">
        <div class="pl-3 pr-3 pt-1 pb-1 btn-danger">
            <i class="zi zi_bell"></i>
            <span class="ml-2 mr-2">{{msg}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
    // default, success, info, warning, danger
    export default {
        name: 'MessageShortTip',
        props: {
            type: String,
            msg: String,
            placement: {
                type: String, default: 'center'
            },
            icon: String
        }
    }
</script>

<style scoped lang="scss">
    .message-short-tip{
        position: absolute;
        top: 0; left: 0; width: 100%;
        font-size: 13px;
        >div{
            display: inline-block;
            border-radius: 3px;
        }
    }
</style>