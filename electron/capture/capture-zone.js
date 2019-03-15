const { clipboard, nativeImage } = require('electron');

class CaptureZone {
    constructor( capture ) {
        this.capture = capture;
        this.init();
    }

    async init() {
        this.$canvas = document.createElement('canvas');
        this.$ctx = this.$canvas.getContext('2d');

        let image = await new Promise(resolve=>{
            let image = new Image;
            image.src = this.capture.imgsrc;
            image.onload = function(){
                resolve(image);
            };
        });

        this.$canvas.width = image.width;
        this.$canvas.height = image.height;

        this.$ctx.drawImage(image, 0, 0);

        // let ni = nativeImage.createFromDataURL(this.$canvas.toDataURL());
        // clipboard.writeImage(ni);
    }

    drawRectangle() {   
        
    }
}

module.exports.CaptureZone = CaptureZone;