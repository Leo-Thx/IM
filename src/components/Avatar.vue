<template>
    <div class="avatar rounded-circle">
        <img :src="url" @error="imgError"/>
    </div>
</template>

<script type="text/javascript">
    export default {
    	name: 'Avatar',
        props: {
    		url: String
        },
        methods: {
    		imgError(){

            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .avatar {
        width: 100%;
        margin: 0 auto;
        box-shadow: 0 0 0 3px #ccc;
        overflow: hidden;
        img{ width: 100%; }
    }
</style>