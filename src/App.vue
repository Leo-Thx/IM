<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: 'App',
  created(){
    const _io = io('http://127.0.0.1:7001/');
    _io.on('connect', function(){
      console.log('链接成功');
    });
    _io.on('disconnect', function(){
      console.log('断开连级');
    });
    _io.on('res', function(){
      console.info(arguments);
    });
  }
}
</script>

<style lang="scss">
    @import "./../static/css/app";
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        border-top: 1px solid $color-grey-100;
    }
</style>
