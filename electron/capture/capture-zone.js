const { clipboard, nativeImage } = require('electron');
const EventEmitter = require('events');
const Circle = require('./operate/circle');

class CaptureZone extends EventEmitter {
    constructor( capture ) {
        super();

        this.$canvas = null;    // 当前屏幕截图
        this.$ctx = null;       // 上下文对象

        this.circleOperate = Circle(capture.$canvasContainer);
        this.capture = capture; //

        this.init().then(()=>{
            Reflect.ownKeys(this.circleOperate).forEach(circleName=>{
                let circle = this.circleOperate[ circleName ];
                circle.on('e-mouseup', ()=>{
                    this.capture.onMouseUp();
                });
            });
        });
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