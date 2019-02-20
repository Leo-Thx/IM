// 一个socket可以有多个namespace，每个namespace可以有多个room，
// 每个namespace和room之间是隔离的不能互相通信，room可以加入但是namespace在连接时就要指定。
// https://www.cnblogs.com/limitcode/p/7845168.html
// https://blog.csdn.net/lijiecong/article/details/50781417

/**
 * Server.js: 
 *  1. parentNsps[Map]{fn: ParentNamespace}: server.of函数调用 为正则或函数 所产生的多个字命名空间[动态命名空间]
 *  2. nsps[Object]{name: Namespace}: 解析后的名字空间
 *  3. _adapter: 存储传入的适配器或默认的适配器adapter[socket.io-adapter]
 *  3. sockets[of('/')]: 处理默认名字空间 并进行connect监听
 *      - new Namespace(server, '/')
 *  4. 根据情况调用attatch|listen: 创建httpServer服务器 this.httpServer
 *      - initEngine this.eio = engine.attach(srv, opts);
 */
/**
 * Namespace.js
 * 1. name, server, sockets = {}, connected = {}... 
 * 2. 初始化适配器 initAdapter() 每个nsp都有自己单独的适配器
 *      - this.adapter = new (this.server.adapter())(this); 获取server._adapter进行构造调用
 */
/**
 * Adapter.js
 * 1. sids[{socket.id: {}}], this.nsp 初始化时的名字空间, rooms = {};
 * 2. addAll
 *      this.sids[id] = this.sids[id] || {};
        this.sids[id][room] = true;
        this.rooms[room] = this.rooms[room] || Room();  // 新建一个房间
        this.rooms[room].add(id);   // 房间添加socket.id
 */
/**
 * client.js 当server有客户端连接时，初始化客户端代理 new Client(this, conn);
 * 1. server, conn, id=conn.id, sockets={}, rooms={}
 * 2. client.connect('/')
 *      - client.doConnect(name, query) // 连接client到一个名字空间
 *      - this.server.of(name).add(client, query, callback)
 *          - nsp.add 新建一个socket nsp.sockets[id] = socket 并触发socket.onconnect, 派发nsp connect、connection事件
 *          - client.sockets[id] = socket
 */
/**
 * socket.js function(nsp, client, query)
 *  1. nsp, server, adapter, id[nsp.name+#+client.id], rooms={}, handshake
 *  2. onconnect(): 
 *      - this.nsp.connected[this.id] = this;   名字空间上存储自身
 *      - this.join(this.id)  加入一个房间
 *          this.adapter.addAll(this.id)
 *          this.rooms[this.id] = this.id
 * 
 */

const io = require('socket.io');
const http = require('http');

// let server = http.createServer();
let serverSocket = io(7001,  {
    path: '/singleChat',
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
serverSocket.of('/chat').on('connect', socket=>{
    let roomId = socket.handshake.query.roomId
    socket.join(roomId);

    let defaultNsp = serverSocket.of('/');
    console.info(defaultNsp);

    // 会广播指定空间，指定房间的所有socket
    // serverSocket.of('/singleChat').emit('joinmsg', '一个新的成员加入');   // 广播指定名字空间
    // serverSocket.of('/singleChat').send('joinmsg', `一个新的成员加入${roomId}`); // 注意使用message监听
    // serverSocket.of('/singleChat').in(roomId).send('joinmsg', `一个新的成员加入${roomId}`);
    // serverSocket.emit('joinmsg', '一个新的成员加入');    // 发送默认名字空间
    
    // socket.emit('joinmsg', '一个新的成员加入');  // 只会发送给自己
    // socket.broadcast.emit('joinmsg', '一个新的成员加入');    // 该socket连接的nsp下所有的房间，非自己
    // socket.broadcast.in(roomId).emit('joinmsg', `加入${roomId}:`+socket.id); // 指定空间 房间非自己
});