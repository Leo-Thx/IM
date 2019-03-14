import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NetworkService } from './share/network/network.service';
import { DesktopCapturer } from 'electron';

// ContentChild, ContentChildren    // 投影
// ViewChild, ViewChildren          // 视图
// ElementRef, TemplateRef          // 元素、ng-tmpl元素

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'IM';
    constructor(public service: NetworkService) {
        // console.log(service);
        // console.warn(this.deskSvc);

        // let descktopCap: DesktopCapturer = window.$NgEl.getDesktopCapturer();
        // descktopCap.getSources({
		// 	types: ['screen'],
		// 	thumbnailSize: { width:1, height: 1 }
		// }, (error, sources)=>{
		// 	console.info(sources);
		// })
    }
    @ViewChild('video') videoEl: ElementRef;

    ngAfterViewInit() {
        // console.info(this.videoEl);
    }

    onClick(){
        let ipcRenderer = window.$NgEl.getIpcRenderer();
        ipcRenderer.send('capture-screen');
    }

    onClick1(){
        let descktopCap: DesktopCapturer = window.$NgEl.getDesktopCapturer();
        descktopCap.getSources({
            types: ['window', 'screen'], // 屏幕或窗口
            thumbnailSize: {
                width:1, height: 1
            }
        }, (error, sources)=>{
            let music = sources.find(item=>item.name === '网易云音乐');
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                      chromeMediaSource: 'desktop',
                      chromeMediaSourceId: music.id,
                      minWidth: 1280,
                      maxWidth: 1280,
                      minHeight: 720,
                      maxHeight: 720
                    }
                  } as MediaTrackConstraints
            }).then((stream)=>{
                this.handlestream(stream);
            }).catch(error=>{
                console.info(error);
            });
        });
    }
    handlestream( stream ){
        const video = this.videoEl.nativeElement;
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
    }
}
