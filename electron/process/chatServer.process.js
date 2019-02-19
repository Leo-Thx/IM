// 一个socket可以有多个namespace，每个namespace可以有多个room，
// 每个namespace和room之间是隔离的不能互相通信，room可以加入但是namespace在连接时就要指定。
// https://www.cnblogs.com/limitcode/p/7845168.html
// https://blog.csdn.net/lijiecong/article/details/50781417

const io = require('socket.io');
const http = require('http');

// let server = http.createServer();
let serverSocket = io(7001,  {
    path: '/chat',
    serveClient: false,
    // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false
});
// console.info(socket.sockets);
// console.info(socket.origins());
// console.info(socket.of('customPath'));

// const dynamicNsp = socket.of(/^\/dynamic-\d+$/).on('connect', (socket) => {
//     const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
//     newNamespace.emit('hello');
//     console.info(newNamespace.connected);
// });

// 客户端连接的时候必须指定路径和nsp
serverSocket.of('/singleChat').on('connect', socket=>{
    let roomId = socket.handshake.query.roomId
    socket.join(roomId);

    // 会广播指定空间，指定房间的所有socket
    // serverSocket.of('/singleChat').emit('joinmsg', '一个新的成员加入');   // 广播指定名字空间
    // serverSocket.of('/singleChat').send('joinmsg', `一个新的成员加入${roomId}`); // 注意使用message监听
    // serverSocket.of('/singleChat').in(roomId).send('joinmsg', `一个新的成员加入${roomId}`);
    // serverSocket.emit('joinmsg', '一个新的成员加入');    // 发送默认名字空间
    
    // socket.emit('joinmsg', '一个新的成员加入');  // 只会发送给自己
    // socket.broadcast.emit('joinmsg', '一个新的成员加入');    // 该socket连接的nsp下所有的房间，非自己
    // socket.broadcast.in(roomId).emit('joinmsg', `加入${roomId}:`+socket.id); // 指定空间 房间非自己
});