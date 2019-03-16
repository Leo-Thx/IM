const { remote, desktopCapturer, screen, ipcRenderer } = require('electron');
const IPC_EventType = require('./../common/IPC_EventType');

const { CaptureZone } = require('./capture-zone');
const { Menu } = require('./capture-menu');

// todo 未处理鼠标拖动离开屏幕

class Capture {
    constructor(){
        this.querySelector();

        this.currentWindow = remote.getCurrentWindow();
        this.currentScreen = screen.getAllDisplays().find(item=>item.id === this.currentWindow._screenId);

        this.scaleFactor = this.currentScreen.scaleFactor;      // 缩放
        this.screenWidth = this.currentScreen.bounds.width;     // 宽度
        this.screenHeight = this.currentScreen.bounds.height;   // 高度

        this.rectangle = {};

        this.init().then(()=>{        
            this.zone = new CaptureZone( this );
            this.menus = Menu.init(this, this.zone);    // 可以操作的按钮

            setTimeout(()=>this.bindEvents(), 200);

            this.zone.on('drawScreenshot', (left, top, widht, height)=>{
                this.$mask.removeEventListener('mousedown', this.onMouseDown);
            });
        });

        ipcRenderer.on(IPC_EventType.CAPTURE_SCREEN_LOCK_ALL, (event)=>{
            console.info(event);
            this.$mask.removeEventListener('mousedown', this.onMouseDown);
            this.$mask.removeEventListener('mousemove', this.onMouseMove);
            this.$mask.removeEventListener('mouseup', this.onMouseUp);
        });
    }

    querySelector(){
        this.$canvasContainer = document.getElementById('canvas-container');
        this.$canvas = document.getElementById('js-canvas');
        this.$context = this.$canvas.getContext('2d');

        this.$bg = document.getElementById('js-bg');
        this.$mask = document.getElementById('js-mask');
        // this.$sizeInfo = document.getElementById('js-size-info');
        // this.$toolbar = document.getElementById('js-toolbar');
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
        ({ pageX: this.rectangle.startX, pageY: this.rectangle.startY } = event);
        this.mousedowned = true;
        this.zone.resetOperate();
    }

    // 处理外部拉动
    onMouseMove(event){
        this.mousedowned && this.zone.calcPoint(this, {endX: event.pageX, endY: event.pageY});
    }

    // 防止直接单击导致拖动出现问题
    onMouseUp(event){
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
