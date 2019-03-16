const { clipboard, nativeImage } = require('electron');
const EventEmitter = require('events');
const { Circle, EventType } = require('./operate/circle');

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

        this.circleMoused = false;   // 标志鼠标是否按下

        this.init().then(()=>{
            Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
                let circle = this.circleOperate[ circleName ];

                // 操作点弹起
                circle.on(EventType.MouseUp, this.onMouseUp);

                // 操作点按下 目前暂时只处理右下角
                circle.on(EventType.MouseDown, ({operate})=>{
                    this.capture.mousedowned = true;
                    this.operate = operate; // 记录操作的按钮
                    this.circleMoused = true;
                });
            });

            // 处理往内部拉动
            let canvasContainer = this.capture.$canvasContainer;
            canvasContainer.addEventListener('mousemove', this.onMouseMove);
            canvasContainer.addEventListener('mouseup', this.onMouseUp);
        });
    }

    onMouseMove(event){
        if( this.capture.mousedowned ) {
            this.calcPoint( this.capture, event );
            
        } else {    // 进行普通的平移

        }
    }

    onMouseUp(event){
        this.capture.mousedowned = false;
        this.operate = null;
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

    calcPoint( capture, event ){
        let rectangle = capture.rectangle;
        ({ pageX: rectangle.endX, pageY: rectangle.endY } = event);

        rectangle.width = rectangle.endX - rectangle.startX;
        rectangle.height = rectangle.endY - rectangle.startY;

        this.drawRectangle();
    }

    drawRectangle() {   
        let canvasContainer = this.capture.$canvasContainer,
            canvas = this.capture.$canvas,
            context = this.capture.$context,
            { rectangle: {startX, startY, width, height}, scaleFactor } = this.capture;
        
        let imageData = this.$ctx.getImageData(startX * scaleFactor, startY * scaleFactor, width * scaleFactor, height * scaleFactor);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;

        canvasContainer.style.left = `${startX}px`;
        canvasContainer.style.top = `${startY}px`;
        canvasContainer.style.display = 'block';

        context.putImageData(imageData, 0, 0);
    }
}

module.exports.CaptureZone = CaptureZone;