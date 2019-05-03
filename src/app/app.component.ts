import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NetworkService } from './share/network/network.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';

import * as fromMovie from './store/reducers/movie';
import * as moveAction from './store/actions/movie';

import { Store } from '@ngrx/store';
import { GlobalService } from './share/global/global.service';

// ContentChild, ContentChildren    // 投影
// ViewChild, ViewChildren          // 视图
// ElementRef, TemplateRef          // 元素、ng-tmpl元素

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'IM';
    public currentClasses = {
        'pt-3': false
    }
    public bodyClick$: Observable<MouseEvent>;
    constructor(
        public service: NetworkService, 
        public router: Router,
        public globalSvc: GlobalService,
        public activatedRouter: ActivatedRoute,
        public store: Store<{effect: fromMovie.Movie[]}>) {
            
        // 查看文档进行过滤
       this.router.events.subscribe((event)=>{
            if( event instanceof NavigationEnd ){
                this.currentClasses['pt-3'] = false;
                if( event.urlAfterRedirects !== '/login' ) this.currentClasses['pt-3'] = true;;
            }
       });
    }

    movies$: Observable<fromMovie.Movie[]> = this.store.select('effect')
    ngOnInit() {
        // this.service.getMovies().subscribe(value=>{
        //     console.info(value);
        // });

        // 远程获取的结果
        this.movies$.subscribe(value=>{
            console.info(value);
        });

        this.store.dispatch(new moveAction.getAllAction());

        this.bodyClick$ = fromEvent(document.body, 'click') as Observable<MouseEvent>;
        this.bodyClick$.subscribe((event)=>{
            this.globalSvc.dispatchBodyClick(event);
            // console.info(event);
        });
    }


    @ViewChild('video') videoEl: ElementRef;

    ngAfterViewInit() {
        // console.info(this.videoEl);
    }

    onClick(){
        // let ipcRenderer = window.$NgEl.getIpcRenderer();
        // ipcRenderer.send('capture-screen');
    }

    onClick1(){
        // let descktopCap: DesktopCapturer = window.$NgEl.getDesktopCapturer();
        // descktopCap.getSources({
        //     types: ['window', 'screen'], // 屏幕或窗口
        //     thumbnailSize: {
        //         width:1, height: 1
        //     }
        // }, (error, sources)=>{
        //     let music = sources.find(item=>item.name === '网易云音乐');
        //     navigator.mediaDevices.getUserMedia({
        //         audio: false,
        //         video: {
        //             mandatory: {
        //               chromeMediaSource: 'desktop',
        //               chromeMediaSourceId: music.id,
        //               minWidth: 1280,
        //               maxWidth: 1280,
        //               minHeight: 720,
        //               maxHeight: 720
        //             }
        //           } as MediaTrackConstraints
        //     }).then((stream)=>{
        //         this.handlestream(stream);
        //     }).catch(error=>{
        //         console.info(error);
        //     });
        // });
    }
    handlestream( stream ){
        const video = this.videoEl.nativeElement;
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
    }
}
