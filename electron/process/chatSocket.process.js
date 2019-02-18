const io = require('socket.io-client');
/**
 * io() 调用会生成一个manager
 *  io = Manager(uri, option)   autoConnect->调用manager.open->engine.io
 *  存入 io.managers 缓存中[内部生成key = io]
 *  return io.socket()[manager.socket()]
 */
const socket = io('http://127.0.0.1:7001/custom', {
    query: {
        token: '000token123wqe'
    },
    // reconnection: false, 
    transports: ['websocket']
    // path: '/customPath'
});

// const manager = new io.Manager('http://127.0.0.1:7001?token=111token123wqe', {autoConnect: false});
// const socket = manager.socket('/custom');
// manager.open();


socket.on('connect', function(){
    console.log('连接成功', socket.id);
    socket.emit('server', "发送一条消息");
    setTimeout(function(){
        // socket.send('socket.send', 1, true, false, function(){
        //     console.info(arguments);
        // });
    }, 2000);
});

// 服务器或客户端丢失连接的原因
socket.on('disconnect', function(reason){
    console.log('断开连接');
});

// 自定义事件
socket.on('server', function(){
    console.info(arguments);
});
socket.on('res', function(){
    console.info(arguments);
});

// socket.close();
socket.on('connect_error', function(error){
    console.info('连接失败', error);
});

/**
 * reconnect, reconnect_attempt, reconnecting, reconnect_error, reconnect_failed, 
 * connect, connect_error, connect_timeout, error
 * disconnect
 */

