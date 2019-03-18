const { remote, desktopCapturer, screen, ipcRenderer } = require('electron');
const IPC_EventType = require('../common/IPC_EventType');

const { CaptureZone } = require('./capture-zone');
const { Menu } = require('./capture-menu');

// todo 未处理鼠标拖动离开屏幕

/**
 * 借鉴：
 *  1. 拖动选区时 隐藏底部操作按钮，但不动之后在进行显示
 *  2. 使用普通div控制选取跟随鼠标拖动，在具体的确认之后在生成截图
 *  3. 对截图进行自定义绘制之后，不在允许进行拖动，但是可以放大或缩小
 *  4. 处理鼠标反向拉动问题
 */

class Capture {
    constructor(){
        this.querySelector();

        this.currentWindow  = remote.getCurrentWindow();
        this.currentScreen  = screen.getAllDisplays().find(item=>item.id === this.currentWindow._screenId);

        this.scaleFactor    = this.currentScreen.scaleFactor;       // 缩放
        this.screenWidth    = this.currentScreen.bounds.width;      // 宽度
        this.screenHeight   = this.currentScreen.bounds.height;     // 高度

        this.mousedowned    = false;    // 标志已经开始处理
        this.isRenderFence  = false;    // 标志是否已经渲染四个遮罩

        /**
         * startX, startY, endX, endY, width, height
         */
        this.rectangle      = {};

        this.init().then(()=>{        
            this.zone = new CaptureZone( this );
            this.menus = Menu.init(this, this.zone);    // 可以操作的按钮

            setTimeout(()=>this.bindEvents(), 200);

            // this.zone.on('drawScreenshot', ()=>{
            //     this.$maskMain.removeEventListener('mousedown', this.onMouseDown);
            // });
        });

        // ipcRenderer.on(IPC_EventType.CAPTURE_SCREEN_LOCK_ALL, (event)=>{
        //     this.$maskMain.removeEventListener('mousedown', this.onMouseDown);
        //     this.$maskMain.removeEventListener('mousemove', this.onMouseMove);
        //     this.$maskMain.removeEventListener('mouseup', this.onMouseUp);
        // });
    }

    querySelector(){
        // 截屏呈现
        this.$canvasContainer   = document.getElementById('canvas-container');
        this.$canvas            = document.getElementById('js-canvas');
        this.$context           = this.$canvas.getContext('2d');
        this.$bg                = document.getElementById('js-bg');

        // 背景遮罩 上下横满，左右填充
        this.$maskMain      = document.getElementById('js-mask-main');
        this.$maskTop       = document.getElementById('js-mask-top');
        this.$maskRight     = document.getElementById('js-mask-right');
        this.$maskBottom    = document.getElementById('js-mask-bottom');
        this.$maskLeft      = document.getElementById('js-mask-left');
    }

    bindEvents() {
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp   = this.onMouseUp.bind(this);

        // body负责监听拖动和鼠标初始化选区
        this.$maskMain.addEventListener('mousedown', this.onMouseDown);
        // document.body.addEventListener('mousedown', this.onMouseDown);
        // this.$maskMain.addEventListener('mousemove', this.onMouseMove);
        document.body.addEventListener('mousemove', this.onMouseMove);
        // this.$maskMain.addEventListener('mouseup', this.onMouseUp);
        document.body.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(event){ // 当选区生成之后，该回调需要取消
        // pageX[文档坐标], clientX[浏览器内容区域左上角，不含滚动条可工具栏], offsetX[], screenX[显示器]
        ({ pageX: this.rectangle.startX, pageY: this.rectangle.startY } = event);
        this.mousedowned = true;    // 标志已经开始处理
        // this.zone.resetOperate();
    }

    // 处理外部拉动
    onMouseMove(event){
        if( this.mousedowned ) {    // 鼠标按下，直接计算宽高并进行遮罩和选区处理   ------[待处理反向拉动]
            window.requestAnimationFrame(()=>{
                let { pageX, pageY } = event;
                // 渲染围栏
                this.renderMaskFence('block');
    
                // 计算围栏位置和大小
                this.calcPointMaskFence( event );

                let { startX, startY } = this.rectangle;
                this.zone.calcSizeInfo(pageX - startX, pageY - startY, startX, startY);
            });
        }
    }

    // 渲染四个围栏
    renderMaskFence( type = 'block' ){
        if( this.isRenderFence === false ){
            this.isRenderFence = true;

            this.$maskMain.style.display = 'none';
            this.$canvasContainer.style.display = 'block';

            this.$maskTop.style.display = type;
            this.$maskRight.style.display = type;
            this.$maskBottom.style.display = type;
            this.$maskLeft.style.display = type;
        }
    }

    calcPointMaskFence( event ) {   // 计算四个围栏的宽高和位置
        let { rectangle, screenWidth, screenHeight } = this,
            { startX, startY } = rectangle,
            { pageX, pageY } = event;

        // top: height
        this.$maskTop.style.height = `${startY}px`;

        // right: top right width height
        this.$maskRight.style.top = `${startY}px`;
        this.$maskRight.style.left = `${pageX}px`;
        this.$maskRight.style.width = `${screenWidth - pageX}px`;
        this.$maskRight.style.height = `${pageY - startY}px`;

        // bottom: height
        this.$maskBottom.style.height = `${screenHeight - pageY}px`;

        // left: top width height
        this.$maskLeft.style.top = `${startY}px`;
        this.$maskLeft.style.width = `${startX}px`;
        this.$maskLeft.style.height = `${screenHeight - (screenHeight - pageY) - startY}px`;
    }

    // 防止直接单击导致拖动出现问题
    onMouseUp(event){
        this.mousedowned = false;
        let zone = this.zone, { pageX, pageY } = event;

        if( zone.isDrawScreenshot === false ){
            this.$maskMain.removeEventListener('mousedown', this.onMouseDown);
            zone.isDrawScreenshot = true;   // 标志已经绘制选区

            this.rectangle.endX = pageX;
            this.rectangle.endY = pageY;
            this.rectangle.width = pageX - this.rectangle.startX;
            this.rectangle.height = pageY - this.rectangle.startY;

            zone.drawCanvasZone();   // 绘制选区，但是不进行真正的Canvas绘制
            
            // 通知主进程锁定其他窗口
            ipcRenderer.send(IPC_EventType.CAPTURE_SCREEN_DRAWED, {
                screeId: remote.getCurrentWindow()._screenId
            });
        }
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
                this.$bg.style.backgroundSize = `${this.screenWidth}px ${this.screenHeight}px`;
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
});

new Capture();