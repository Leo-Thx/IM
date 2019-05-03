import { Component, ViewChildren, QueryList, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, Injector, Output, EventEmitter } from "@angular/core";
import { ChatListService } from './chat-list.service';
import { MatListItem } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as chat from 'src/app/store/actions/chat';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, TemplatePortalDirective, CdkPortalOutlet, CdkPortal } from '@angular/cdk/portal';
import { ChatListContextMenu } from '../widget/menu/list-context.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [
        './chat-list.component.scss'
    ],
    providers: [ChatListService]
})
export class ChatListComponent implements OnInit {
    @Input('chatId') chatRoomId;

    public listArray = Array.from({length: 25}).fill(1);
    public messages = Array.from({length: 1}).fill({from:'from', subject:'subject', content:'content'});

    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;
    @ViewChild('listContainer') public listContainer: HTMLDivElement;

    public menuPortal: ComponentPortal<ChatListContextMenu>;

    // Portal: ComponentPortal, TemplatePortal[:CdkPortal]  [具体需要显示的内容]
    // [I]PortalOutlet: BasePortalOutlet[:CdkPortalOutlet, DomPortalOutlet] [内容插入的位置]

    // @ViewChild('tmplPortal') tmplPortal: TemplatePortal<any>;
    // @ViewChildren(TemplatePortalDirective) tmplPortals: QueryList<TemplatePortal<any>>;

    // 应该时候从某个元素里面读取读取其他的其他的
    // @ViewChild('virtualContainer', {read: ViewContainerRef}) virtualContainer: ViewContainerRef;
    @ViewChild('menuOutlet', {read: ViewContainerRef}) menuViewRef: ViewContainerRef;
    // @ViewChild('menuOutlet', {read: NgComponentOutlet}) menuOutlet: NgComponentOutlet;
    public listContextMenu: ChatListContextMenu;

    constructor(
        private chatlistSvc: ChatListService,
        private store: Store<fromRoot.State>,
        private overlay: Overlay,
        private vcRef: ViewContainerRef,
        private injector: Injector,
        private componentFactoryResover: ComponentFactoryResolver) {
            
        }

    ngOnInit() {}

    toChatItem(item, index, $event){
        this.store.dispatch(new chat.ToChatAction({
            chatId: index
        }));
    }

    @Output('contextEvent') menuEvent = new EventEmitter();
    handleContextMenu($event: MouseEvent){
        this.menuEvent.emit($event);

        $event.preventDefault();
        $event.stopPropagation();
        return false;
    }
}
