const { ipcRenderer, remote } = require('electron');
const EventEmitter = require('events');
const { Circle, EventType } = require('./circle-operate');
const IPC_EventType = require('./../common/IPC_EventType');

class CaptureZone extends EventEmitter {
    constructor( capture ) {
        super();

        this.$canvas = null;    // 当前屏幕截图
        this.$ctx = null;       // 上下文对象

        this.circleOperate = Circle(capture.$canvasContainer, this, capture);
        this.capture = capture; //

        // this.onMouseDown = this.onMouseDown.bind(this);
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
                    this.capture.mousedowned = true;
                    this.operate = operate; // 记录操作的按钮
                    this.moveCapture = false;
                });
            });

            let canvasContainer = this.capture.$canvasContainer;
            canvasContainer.addEventListener('mousemove', this.onMouseMove);
            canvasContainer.addEventListener('mouseup', this.onMouseUp);
            canvasContainer.addEventListener('mousedown', this.onMouseDown);
        });
    }

    // 在平移的时候会出现跟手问题，建议在最后生成图片的时候进行截图生成
     // 处理往内部拉动
    onMouseMove(event){
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

    onMouseDown(event) {
        this.moveCapture = true;
        this.moveX = event.pageX;
        this.moveY = event.pageY;
    }

    onMouseUp(event){
        this.capture.mousedowned = false;
        this.moveCapture = false;
        this.operate = null;
        
        console.info(' Zone.mouseUp ');

        if( !this.isDrawScreenshot ){
            this.emit('drawScreenshot');
            this.isDrawScreenshot = true;

            Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
                let circle = this.circleOperate[ circleName ];
                circle.node.style.display = 'block';
            });

            this.$toolbar.style.display = 'block';

            // 通知主进程锁定其他窗口
            ipcRenderer.send(IPC_EventType.CAPTURE_SCREEN_DRAWED, {
                screeId: remote.getCurrentWindow()._screenId
            });
        }
    }

    resetOperate(){
        this.operate = null;
        this.moveCapture = false;
    }

    async init() {
        this.$canvas = document.createElement('canvas');
        this.$ctx = this.$canvas.getContext('2d');
        // this.$initCanvas = document.getElementById('init-canvas');
        // this.$initCanvas.append(this.$canvas);

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

    drawRectangle() {   
        let canvasContainer = this.capture.$canvasContainer,
            canvas = this.capture.$canvas,
            context = this.capture.$context,
            { rectangle: {startX, startY, width, height}, scaleFactor, screenWidth, screenHeight } = this.capture;
        
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

        canvasContainer.style.left = `${startX}px`;
        canvasContainer.style.top = `${startY}px`;
        canvasContainer.style.display = 'block';

        this.$sizeInfo.style.display = 'block';
        this.$sizeInfo.textContent = `${width} * ${height}`;
        this.$sizeInfo.style.left = `${startX}px`;
        this.$sizeInfo.style.top = `${startY - 30}px`;

        context.putImageData(imageData, 0, 0);
        
        
        this.$toolbar.style.right = `${screenWidth - startX - width}px`;
        this.$toolbar.style.top = `${startY + height + 5}px`;

        if( this.isDrawScreenshot ){    // 如果已经绘制，主要处理超出边界的情况
            let tbHeight = this.$toolbar.offsetHeight;
            if( startY + height + tbHeight + 5 > screenHeight ) this.$toolbar.style.top = `${startY + height - 5 - tbHeight}px`;
        }
    }
}

module.exports.CaptureZone = CaptureZone;