const { ipcRenderer, remote } = require('electron');
const EventEmitter = require('events');
const { Circle, EventType } = require('./circle-operate');
const IPC_EventType = require('./../common/IPC_EventType');

/**
 * 选区：选中区域 + operate + menu
 */
class CaptureZone extends EventEmitter {
    constructor( capture ) {
        super();

        this.$canvas = null;    // 当前屏幕截图
        this.$ctx = null;       // 上下文对象

        this.circleOperate = Circle(capture.$canvasContainer, this, capture);
        this.capture = capture; //

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp   = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.moveCapture = false;   // 记录是否在选取内进行移动
        this.isDrawScreenshot = false;    // 是否已经绘制选区

        this.$sizeInfo = document.getElementById('js-size-info');
        this.$toolbar = document.getElementById('js-toolbar');

        // this.rectangleSize = {};

        this.init().then(()=>{
            Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
                let circle = this.circleOperate[ circleName ];

                // 操作点弹起
                circle.on(EventType.MouseUp, this.onMouseUp);

                // 操作点按下
                circle.on(EventType.MouseDown, ({operate})=>{
                    // this.capture.mousedowned = true;
                    this.operate = operate; // 记录操作的按钮
                    this.moveCapture = false;   // 取消移动
                });
            });

            // let canvasContainer = this.capture.$canvasContainer;
            // canvasContainer.addEventListener('mousemove', this.onMouseMove);
            // canvasContainer.addEventListener('mouseup', this.onMouseUp);
            // canvasContainer.addEventListener('mousedown', this.onMouseDown);
        });
    }

    // 在平移的时候会出现跟手问题，建议在最后生成图片的时候进行截图生成
    // 处理往内部拉动
    onMouseMove(event){
        if( this.operate != null ) {    // operate放大或缩小
            let canvasContainer = this.capture.$canvasContainer,
                { pageX: endX, pageY: endY } = event,       // 鼠标所在位置
                { rectangle: {startX, startY, width, height} } = this.capture;

            // 1. 对应的operate进行操作即可
                // 计算围栏
                // 计算canvasContainer
            this.operate.calcRectangle(event);
            // 2. 隐藏toolbar
            this.$toolbar.style.display = 'none';

            this.calcSizeInfo(width, height, startX, startY);   // 计算最终大小
        }
    }

    onMouseMove1(event){
        if( this.capture.mousedowned ) {
            this.calcPoint( this.capture, {endX: event.pageX, endY: event.pageY} );

        } else if( this.moveCapture ){    // 进行普通的平移
            let {moveX, moveY} = this,
                {pageX, pageY} = event,
                rectangle = this.capture.rectangle;

            let movedX = pageX - moveX, movedY = pageY - moveY;

            //// 跑出去的半个操作点 + 2px的左右边框 unused
            let newX = rectangle.startX + movedX,
                newY = rectangle.startY + movedY,
                {screenWidth, screenHeight} = this.capture;

                
            if( newX + rectangle.width >= screenWidth ) return false;
            if( newY + rectangle.height >= screenHeight ) return false;
            if( newX <= 0 ) return false;
            if( newY <= 0 ) return false;

            // console.info(rectangle);
            rectangle.startX += movedX;
            rectangle.startY += movedY;

            rectangle.endX += movedX;
            rectangle.endY += movedY;

            // rectangle.width = rectangle.endX - rectangle.startX;
            // rectangle.height = rectangle.endY - rectangle.startY;

            this.moveX = pageX;
            this.moveY = pageY;

            this.drawRectangle();
        }
    }

    onMouseDown(event) {    // 选区挪动
        this.moveCapture = true;    // 开始挪动
        this.moveX = event.pageX;
        this.moveY = event.pageY;
    }

    onMouseUp(event){
        this.capture.mousedowned = false;
        this.moveCapture = false;
        this.operate = null;
        
        console.info(' Zone.mouseUp ');

        // if( !this.isDrawScreenshot ){
        //     this.emit('drawScreenshot');
        //     this.isDrawScreenshot = true;

        //     Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
        //         let circle = this.circleOperate[ circleName ];
        //         circle.node.style.display = 'block';
        //     });

        //     this.$toolbar.style.display = 'block';

        //     // 通知主进程锁定其他窗口
        //     ipcRenderer.send(IPC_EventType.CAPTURE_SCREEN_DRAWED, {
        //         screeId: remote.getCurrentWindow()._screenId
        //     });
        // }
    }

    resetOperate(){
        this.operate = null;
        this.moveCapture = false;
    }

    async init() {
        this.$canvas = document.createElement('canvas');
        this.$ctx = this.$canvas.getContext('2d');

        let image = await new Promise(resolve=>{
            let image = new Image;
            image.src = this.capture.imgsrc;
            image.onload = ()=>resolve(image);
        });

        this.$canvas.width = image.width || image.naturalWidth;
        this.$canvas.height = image.height || image.naturalHeight;
        this.$ctx.drawImage(image, 0, 0);

        // console.info(image.width, image.height);
        // let ni = nativeImage.createFromDataURL(this.$canvas.toDataURL());
        // clipboard.writeImage(ni);
    }

    calcPoint( capture, point ){
        let rectangle = capture.rectangle;

        // 如果是circle已经按下
        if( this.operate ) {
            this.operate.calcRectangle(rectangle, point);
        } else {
            ({ endX: rectangle.endX, endY: rectangle.endY } = point);
        }

        rectangle.width = rectangle.endX - rectangle.startX;
        rectangle.height = rectangle.endY - rectangle.startY;

        this.drawRectangle();
    }

    // 计算大小信息 // 自己判断位置
    calcSizeInfo(width, height, startX, startY){
        this.$sizeInfo.style.display = 'block';
        this.$sizeInfo.textContent = `${width} * ${height}`;
        this.$sizeInfo.style.left = `${startX}px`;
        this.$sizeInfo.style.top = `${startY - 30}px`;
    }

    // 按钮位置和大小
    calcToolbar(){
        let { rectangle: {startX, startY, width, height}, screenWidth } = this.capture;
        this.$toolbar.style.right = `${screenWidth - startX - width}px`;
        this.$toolbar.style.top = `${startY + height + 5}px`;

        this.$toolbar.style.display = 'block';
    }

    drawCanvasZone(){   // 绘制选区，不进行图片绘制
        let canvasContainer = this.capture.$canvasContainer,
            { rectangle: {startX, startY, width, height} } = this.capture;

        canvasContainer.style.left = `${startX}px`;
        canvasContainer.style.top = `${startY}px`;
        canvasContainer.style.width = `${width}px`;
        canvasContainer.style.height = `${height}px`;

        this.calcSizeInfo(width, height, startX, startY);   // 计算最终大小
        this.calcToolbar();

        Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
            let circle = this.circleOperate[ circleName ];
            circle.node.style.display = 'block';
        });

        // 绑定鼠标移动事件
        document.body.addEventListener('mousemove', this.onMouseMove);
        document.body.addEventListener('mouseup', this.onMouseUp);
    }

    drawRectangle() {   // 真正需要绘制的位置
        let canvas = this.capture.$canvas,
            context = this.capture.$context,
            { rectangle: {startX, startY, width, height}, scaleFactor } = this.capture;
        
        // 未追踪 出现 后面两个参数是NaN
        let imageData = this.$ctx.getImageData(
            Math.floor( startX * scaleFactor ), 
            Math.floor( startY * scaleFactor ), 
            Math.floor( width * scaleFactor ),
            Math.floor( height * scaleFactor )
        );

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;

        context.putImageData(imageData, 0, 0);
    }
}

module.exports.CaptureZone = CaptureZone;