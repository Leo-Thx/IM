import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef, TemplateRef, ApplicationRef, ComponentFactoryResolver, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Store, createSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as fromGlobal from 'src/app/store/reducers/global';
import { Observable, Subscription } from 'rxjs';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChatListContextMenu } from './widget/menu/list-context.component';
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { GlobalService } from 'src/app/share/global/global.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: [
        './chat.component.scss'
    ]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{
    // 显示初始界面
    protected showInitView: boolean = true;

    // 聊天id
    protected viewChatId$: Observable<number>;
    protected chatIdSub: Subscription;
    protected chatId: number;

    // 页面缩放
    protected devicePixelRatio$: Observable<number>;
    protected devicePixelRatioSub: Subscription;
    protected devicePixelRatio: number = 1;

    // 聊天列表菜单处理
    private showChatContext: boolean = false;
    private menuPosition: {
        left?: string;
        top?: string
    } = {};
    
    // body点击时导致要关闭弹层，除了body自身产生事件之外，可独立关闭
    private bodyClickSubscription: Subscription;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private chatSvc: ChatService,
        private store: Store<fromRoot.State>,
        private ipcSvc: IpcService,
        private globalSvc: GlobalService,
        private overlay: Overlay,
        private elementRef: ElementRef,
        private appRef: ApplicationRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.viewChatId$ = this.store.select(fromRoot.getChatId);
        this.chatIdSub = this.viewChatId$.subscribe(value=>{
            this.showInitView = value === -1;
            this.chatId = value;
        });

        this.devicePixelRatio$ = this.store.select(fromRoot.getPixelRatio);
        this.devicePixelRatioSub = this.devicePixelRatio$.subscribe(value=>this.devicePixelRatio = value);

        // console.info(this.elementRef);
        // console.info(this.viewContainerRef);
        // console.info(this.appRef);

        // 位置策略
        // const strategy = this.overlay.position()
        //     .flexibleConnectedTo(this.elementRef)
        //     .withPositions([{
        //         originX: 'center',
        //         originY: 'bottom',
        //         overlayX: 'center',
        //         overlayY: 'top',
        //         offsetX: 0,
        //         offsetY: 0
        //     }]);

        // strategy.withLockedPosition(true);
        
        // const config = new OverlayConfig({positionStrategy: strategy});

        // // 滑动策略
        // config.scrollStrategy = this.overlay.scrollStrategies.reposition();
        // config.hasBackdrop = true;

        // const overlayRef = this.overlay.create(config);
        // overlayRef.backdropClick().subscribe(()=>overlayRef.dispose());
        
        // overlayRef.attach(new ComponentPortal(ListContextMenu, this.viewContainerRef));
        
        this.bodyClickSubscription = this.globalSvc.subscribeBodyClick(event=>{
            this.showChatContext = false;
        });
    }

    // @ViewChild('tpl') tplRef: TemplateRef<any>;
    ngAfterViewInit() {
        // this.viewContainerRef.createEmbeddedView(this.tplRef);
    }

    ngOnDestroy() {
        this.chatIdSub.unsubscribe();
        this.bodyClickSubscription.unsubscribe();
        this.devicePixelRatioSub.unsubscribe();
    }

    handleChatListContenxt($event: MouseEvent) {
        // 计算位置
        const {clientX, clientY} = $event;
        this.showChatContext = true;
        // this.ipcSvc.showChatContext();

        let left = (clientX-72),
            top = (clientY-24),
            documentClientHeight = document.documentElement.clientHeight;

        // this.menuPosition.left = (clientX/this.devicePixelRatio) + 'px';
        // this.menuPosition.top = (clientY/this.devicePixelRatio) + 'px';
        
        // 如果底部高度不够156
        if( documentClientHeight - top < 156 ) {
            top = top - 156;
        }

        // 减去左侧sidebar宽度 顶部appbar高度
        this.menuPosition.left = left + 'px';
        this.menuPosition.top = top + 'px';
    }
}
