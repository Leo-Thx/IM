import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef, TemplateRef, ApplicationRef, ComponentFactoryResolver, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: [
        './chat.component.scss'
    ]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{
    public showInitView: boolean = true;
    public viewChatId$: Observable<number>;
    public chatIdSub: Subscription;
    public chatId: number;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private chatSvc: ChatService,
        private store: Store<fromRoot.State>,
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
        // console.info(this.portal);
        // console.info(this.elementRef);
        // console.info(this.viewContainerRef);
        // console.info(this.appRef);
    }

    // @ViewChild('tpl') tplRef: TemplateRef<any>;
    ngAfterViewInit() {
        // this.viewContainerRef.createEmbeddedView(this.tplRef);
    }

    ngOnDestroy() {
        this.chatIdSub.unsubscribe();
    }
}
