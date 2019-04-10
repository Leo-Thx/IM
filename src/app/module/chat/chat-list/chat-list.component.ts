import { Component, ViewChildren, QueryList, Input } from "@angular/core";
import { ChatListService } from './chat-list.service';
import { MatListItem } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/ngrx/reducers';
import * as chat from 'src/app/ngrx/actions/chat';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [
        './chat-list.component.scss'
    ],
    providers: [ChatListService]
})
export class ChatListComponent{
    @Input('chatId') chatRoomId;

    public listArray = Array.from({length: 5}).fill(1);
    public messages = Array.from({length: 1}).fill({from:'from', subject:'subject', content:'content'});

    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;

    constructor(
        private chatlistSvc: ChatListService,
        private store: Store<fromRoot.State>) {}

    toChatItem(item, index, $event){
        console.info(item, index, event);
        this.store.dispatch(new chat.ToChatAction({
            chatId: index
        }))
    }
}
