const io = require('socket.io-client');
/**
 * io() 调用会生成一个manager
 *  io = Manager(uri, option)   autoConnect->调用manager.open->engine.io
 *  存入 io.managers 缓存中[内部生成key = io]
 *  return io.socket()[manager.socket()]
 */
const socket = io('http://localhost:7001/chat', {
    query: {
        token: '000token123wqe',
        roomId: 'first1'
    },
    // reconnection: false, 
    transports: ['websocket', 'polling'],
    // path: '/singleChat'
});

// const manager = new io.Manager('http://127.0.0.1:7001?token=111token123wqe', {autoConnect: false});
// const socket = manager.socket('/custom');
// manager.open();


socket.on('connect', function(){
    console.log('连接成功:', socket.id);
    setTimeout(()=>{
        socket.send('测试');
    }, 5000);
});

// 服务器或客户端丢失连接的原因
socket.on('disconnect', function(reason){
    console.log('断开连接');
});

// 自定义事件
socket.on('joinmsg', function(){
    console.info(arguments);
});
socket.on('message', function(){
    console.info('message', arguments);
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