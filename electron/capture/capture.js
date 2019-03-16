const { remote, desktopCapturer, screen } = require('electron');
// const Event = require('events');
// const fs = require('fs');

const { CaptureZone } = require('./capture-zone');
const { Menu } = require('./menu/menu');

// todo 未处理鼠标拖动离开屏幕

class Capture {
    constructor(){
        this.querySelector();

        this.currentWindow = remote.getCurrentWindow();
        this.currentScreen = screen.getAllDisplays().find(item=>item.id === this.currentWindow._screenId);

        this.scaleFactor = this.currentScreen.scaleFactor;      // 缩放
        this.screenWidth = this.currentScreen.bounds.width;     // 宽度
        this.screenHeight = this.currentScreen.bounds.height;   // 高度

        this.init().then(()=>{        
            this.zone = new CaptureZone( this );
            this.menue = new Menu(this, this.zone);    // 可以操作的按钮

            setTimeout(()=>this.bindEvents(), 200);
        });
    }

    querySelector(){
        this.$canvasContainer = document.getElementById('canvas-container');
        this.$canvas = document.getElementById('js-canvas');
        this.$context = this.$canvas.getContext('2d');

        this.$bg = document.getElementById('js-bg');
        this.$mask = document.getElementById('js-mask');
        this.$sizeInfo = document.getElementById('js-size-info');
        this.$toolbar = document.getElementById('js-toolbar');

        // this.$test = document.getElementById('test');
    }

    bindEvents() {
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp   = this.onMouseUp.bind(this);

        this.$mask.addEventListener('mousedown', this.onMouseDown);
        this.$mask.addEventListener('mousemove', this.onMouseMove);
        this.$mask.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(event){
        // pageX[文档坐标], clientX[浏览器内容区域左上角，不含滚动条可工具栏], offsetX[], screenX[显示器]
        this.rectangle = {};
        ({ pageX: this.rectangle.startX, pageY: this.rectangle.startY } = event);
        this.mousedowned = true;
        // this.$test.style.left = event.pageX;
        // this.$test.style.top = event.pageY;
    }

    // 处理外部拉动
    onMouseMove(event){
        this.mousedowned && this.zone.calcPoint( this, event );
    }

    // 防止直接单击导致拖动出现问题
    onMouseUp(event){
        if( this.mousedowned ) {
            // let rectangle = this.rectangle;
            // ({ pageX: rectangle.endX, pageY: rectangle.endY } = event);

            // rectangle.width = rectangle.endX - rectangle.startX;
            // rectangle.height = rectangle.endY - rectangle.startY;

            // this.zone.drawRectangle();
        }
        
        this.mousedowned = false;
    }
    
    init(){
        return new Promise(resolve=>{
            desktopCapturer.getSources({ 
                types: ['screen'],      // type有window，则display_id没有
                // thumbnailSize: this.currentScreen.size,
                thumbnailSize: {
                    width: this.screenWidth * this.scaleFactor,
                    height: this.screenHeight * this.scaleFactor
                },
            }, (error, sources)=>{
                let selectSource = sources.find(source=>source.display_id == this.currentScreen.id),
                    url = selectSource.thumbnail.toDataURL();
    
                this.imgsrc = url;
                this.$bg.style.backgroundImage = `url('${url}')`;
                this.$bg.style.backgroundSize = `100% 100%`;
                document.body.style.opacity = 1;    // 禁用透明

                resolve();
    
                // navigator.getUserMedia({     // navigator.mediaDevices.getUserMedia
                //     audio: false,
                //     video: {
                //         mandatory: {
                //             chromeMediaSource: 'desktop',
                //             chromeMediaSourceId: selectSource.id,
                //             minWidth: 1280,
                //             maxWidth: this.currentScreen.size.width,
                //             minHeight: 720,
                //             maxHeight: this.currentScreen.size.height
                //         }
                //     }
                // }, (stream)=>{
                //     this.handlestream(stream);
                // }, error=>{
                //     console.info(error);
                // });
            });
        });
    }

    handlestream( stream ){
        let video = document.createElement('video'), self = this;
        // video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;'
        video.addEventListener('loadedmetadata', function loadedmetadata(event){
            // Set video ORIGINAL height (screenshot)
            video.style.height = video.videoHeight + 'px' // videoHeight
            video.style.width = video.videoWidth + 'px' // videoWidth

            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            self.screenshotSrc = canvas.toDataURL('image/png');

            self.$bg.style.backgroundImage = `url('${self.screenshotSrc}')`;
            // self.$bg.style.backgroundSize = `${self.screenWidth}px ${self.screenHeight}px`;

            for(let track of stream.getTracks()) track.stop();

            video.removeEventListener('loadedmetadata', loadedmetadata);
            video.remove();
            video = null;

            console.timeEnd('capture')
        });

        video.srcObject = stream;
        // document.body.appendChild(video);
    }
}

document.addEventListener('DOMContentLoaded', function(){
//     desktopCapturer.getSources({
//         types: ['screen'],
//         thumbnailSize: {
//             width: width * scaleFactor,
//             height: height * scaleFactor,
//         }
//     }, (error, sources) => {
//         let imgSrc = sources[0].thumbnail.toDataURL();
//         let nI = nativeImage.createFromDataURL(imgSrc);
//         clipboard.writeImage(nI);
//     });

    new Capture();
});
