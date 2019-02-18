// 一个socket可以有多个namespace，每个namespace可以有多个room，
// 每个namespace和room之间是隔离的不能互相通信，room可以加入但是namespace在连接时就要指定。
// https://www.cnblogs.com/limitcode/p/7845168.html

const io = require('socket.io');
const http = require('http');

// let server = http.createServer();
let socket = io(7001,  {
    path: '/customPath',
    serveClient: false,
    // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false
});
// console.info(socket.sockets);
// console.info(socket.origins());
// console.info(socket.of('customPath'));

const dynamicNsp = socket.of(/^\/dynamic-\d+$/).on('connect', (socket) => {
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    // broadcast to all clients in the given sub-namespace
    newNamespace.emit('hello');
    console.info(newNamespace.connected);
});