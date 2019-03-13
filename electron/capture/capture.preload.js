const { ipcRenderer, clipboard, nativeImage, remote, desktopCapturer, screen } = require('electron')
const Event = require('events')
const fs = require('fs')

const { bounds: { width, height }, scaleFactor } = screen.getPrimaryDisplay()

document.addEventListener('DOMContendLoaded', function(){
    const $canvas = document.getElementById('js-canvas')
    const $bg = document.getElementById('js-bg')
    const $sizeInfo = document.getElementById('js-size-info')
    const $toolbar = document.getElementById('js-toolbar')

    const $btnClose = document.getElementById('js-tool-close')
    const $btnOk = document.getElementById('js-tool-ok')
    const $btnSave = document.getElementById('js-tool-save')
    const $btnReset = document.getElementById('js-tool-reset')

    desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
            width: width * scaleFactor,
            height: height * scaleFactor,
        }
    }, (error, sources) => {
        let imgSrc = sources[0].thumbnail.toDataURL()
        // let capture = new CaptureRenderer($canvas, $bg, imgSrc, scaleFactor)
        let nI = nativeImage.createFromDataURL(imgSrc);
        clipboard.writeImage(nI);
    });
});