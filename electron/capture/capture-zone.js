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

        this.init().then(()=>{
            Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
                let circle = this.circleOperate[ circleName ];

                // 操作点弹起
                circle.on(EventType.MouseUp, this.onMouseUp);

                // 操作点按下
                circle.on(EventType.MouseDown, ({operate})=>{
                    this.operate = operate; // 记录操作的按钮
                    this.moveCapture = false;   // 取消移动
                });
            });

            let canvasContainer = capture.$canvasContainer;
            // canvasContainer.addEventListener('mousemove', this.onMouseMove);
            // canvasContainer.addEventListener('mouseup', this.onMouseUp);
            canvasContainer.addEventListener('mousedown', this.onMouseDown);
        });
    }

    // 在平移的时候会出现跟手问题，建议在最后生成图片的时候进行截图生成
    // 处理往内部拉动
    onMouseMove(event){
        if( this.operate != null ) {    // operate放大或缩小
            let { rectangle: {startX, startY, width, height} } = this.capture;
            // 1. 对应的operate进行操作即可
                // 计算围栏
                // 计算canvasContainer
            this.operate.calcRectangle(event);
            // 2. 隐藏toolbar
            this.calcToolbar();
            // 计算最终大小
            this.calcSizeInfo(width, height, startX, startY);

        } else if( this.moveCapture === true ) {
            this.calcToolbar();

            let {moveX, moveY} = this,
                {pageX, pageY} = event,
                { rectangle, $canvasContainer } = this.capture,
                movedX = pageX - moveX, 
                movedY = pageY - moveY;

            let newX = rectangle.startX + movedX,
                newY = rectangle.startY + movedY,
                {screenWidth, screenHeight} = this.capture;

            if( newX + rectangle.width >= screenWidth ) newX = screenWidth - rectangle.width;
            if( newY + rectangle.height >= screenHeight ) newY = screenHeight - rectangle.height;
            
            if( newX <= 0 ) newX = 0;
            if( newY <= 0 ) newY = 0;

            rectangle.startX = newX;
            rectangle.startY = newY;

            rectangle.endX = newX + rectangle.width;
            rectangle.endY = newY + rectangle.height;

            this.moveX = pageX;
            this.moveY = pageY;

            // rectangle.height = rectangle.endY - rectangle.startY;
            // rectangle.width = rectangle.endX - rectangle.startX;
            
            this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});
            this.calcSizeInfo(rectangle.width, rectangle.height, rectangle.startX, rectangle.startY);

            $canvasContainer.style.left = `${rectangle.startX}px`;
            $canvasContainer.style.top = `${rectangle.startY}px`;
            $canvasContainer.style.width = `${rectangle.width}px`;
            $canvasContainer.style.height = `${rectangle.height}px`;
        }
    }

    onMouseDown(event) {    // 选区挪动
        this.moveCapture = true;    // 开始挪动
        this.moveX = event.pageX;
        this.moveY = event.pageY;
    }

    onMouseUp(event){
        this.moveCapture = false;
        this.operate = null;
        this.calcToolbar( true );
        console.info(' Zone.mouseUp ');
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

    // 计算大小信息 // 自己判断位置
    calcSizeInfo(){
        let { width, height, startX, startY } = this.capture.rectangle;
        this.$sizeInfo.style.display = 'block';
        this.$sizeInfo.textContent = `${width} * ${height}`;
        this.$sizeInfo.style.left = `${startX}px`;
        this.$sizeInfo.style.top = `${startY - 30}px`;

        if( startY <= 30 ) this.$sizeInfo.style.top = '5px';
    }

    // 按钮位置和大小
    calcToolbar(show = false){
        let { rectangle: {startX, startY, width, height}, screenWidth, screenHeight } = this.capture;

        this.$toolbar.style.right = `${screenWidth - startX - width}px`;
        this.$toolbar.style.top = `${startY + height + 5}px`;

        this.$toolbar.style.display = show ? 'block' : 'none';
        if( startY + height + 40 >=  screenHeight ) this.$toolbar.style.top = `${startY + height - 40}px`;
    }

    drawCanvasZone(){   // 绘制选区，不进行图片绘制
        let canvasContainer = this.capture.$canvasContainer,
            { rectangle: {startX, startY, width, height} } = this.capture;

        canvasContainer.style.left = `${startX}px`;
        canvasContainer.style.top = `${startY}px`;
        canvasContainer.style.width = `${width}px`;
        canvasContainer.style.height = `${height}px`;

        this.calcSizeInfo(width, height, startX, startY);   // 计算最终大小
        this.calcToolbar( true );

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