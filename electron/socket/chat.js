const socketConfig = require('./socket.config');
const io = require('socket.io-client');

/**
 * io() 调用会生成一个manager
 *  io = Manager(uri, option)   autoConnect->调用manager.open->engine.io
 *  存入 io.managers 缓存中[内部生成key = io]
 *  return io.socket()[manager.socket()]
 */
module.exports = {
    init(userInfo){
        let socket = io(socketConfig.url, {
            // path: '/socket.io',
            // reconnection: true,
            query: {
                // token: userInfo.token,      // 登录后服务器下发
                // roomId: userInfo.rooms,     // 服务器下发, 添加到对应的房间        
            },
            transports: ['websocket', 'polling']
        });
        
        socket.on('connect', function(){
            console.log('连接成功:', socket.id);
            userInfo.$socket = socket;
        });
        
        // 服务器或客户端丢失连接的原因
        socket.on('disconnect', function(reason){
            console.log('断开连接');
        });
        
        socket.on('connect_error', function(error){
            console.info('连接失败', error);
        });
        
        /**
         * reconnect, reconnect_attempt, reconnecting, reconnect_error, reconnect_failed, 
         * connect, connect_error, connect_timeout, error
         * disconnect
         */
    }
};
