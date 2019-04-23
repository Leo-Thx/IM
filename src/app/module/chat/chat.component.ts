import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class ChatComponent implements OnInit, OnDestroy{
    public showInitView: boolean = true;
    public viewChatId$: Observable<number>;
    public chatIdSub: Subscription;
    public chatId: number;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private chatSvc: ChatService,
        private store: Store<fromRoot.State>) {
        
    }

    ngOnInit() {
        this.viewChatId$ = this.store.select(fromRoot.getChatId);
        this.chatIdSub = this.viewChatId$.subscribe(value=>{
            this.showInitView = value === -1;
            // this.chatId = value;
        });
    }

    ngOnDestroy() {
        this.chatIdSub.unsubscribe();
    }
}
