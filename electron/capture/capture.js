const { ipcRenderer, clipboard, nativeImage, remote, desktopCapturer, screen } = require('electron');
const Event = require('events');
const fs = require('fs');

const { getCurrentScreen } = require('./utils');
const Menu = require('./menu/menu');
const { bounds: { width, height }, scaleFactor } = screen.getPrimaryDisplay()

class Capture {
    constructor(){
        this.$canvas = document.getElementById('js-canvas');
        this.$bg = document.getElementById('js-bg');
        this.$sizeInfo = document.getElementById('js-size-info');
        this.$toolbar = document.getElementById('js-toolbar');

        this.$btnClose = document.getElementById('js-tool-close');
        this.$btnOk = document.getElementById('js-tool-ok');
        this.$btnSave = document.getElementById('js-tool-save');
        this.$btnReset = document.getElementById('js-tool-reset');

        // 可以操作的按钮
        this.menue = new Menu();
        // 当前窗体
        this.currentWindow = remote.getCurrentWindow();

        // 当前窗体所在的屏幕
        this.currentScreen = screen.getAllDisplays().find(item=>item.id === this.currentWindow._screenId);

        this.scaleFactor = this.currentScreen.scaleFactor;  // 缩放
        this.screenWidth = this.currentScreen.bounds.width; // 宽度
        this.screenHeight = this.currentScreen.bounds.height;   // 高度

        this.init();
    }

    async init(){   // 绘制屏幕到js-bg
        desktopCapturer.getSources({ 
            types: ['screen'],      // type有window，则display_id没有
            // thumbnailSize: this.currentScreen.size,
            thumbnailSize: {
                width: this.screenWidth * this.scaleFactor,
                height: this.screenHeight * this.scaleFactor
            },
        }, (error, sources)=>{
            let selectSource = sources.find(source=>source.display_id == this.currentScreen.id);
            this.handlestream(selectSource.thumbnail.toDataURL());
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
    }

    handlestream(url){
        this.$bg.style.backgroundImage = `url('${url}')`;
        this.$bg.style.backgroundSize = `100% 100%`;
    }

    handlestream2( stream ){
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

console.time('capture')
    new Capture();
});
