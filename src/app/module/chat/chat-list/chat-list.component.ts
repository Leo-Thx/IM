import { Component } from "@angular/core";
import { ChatListService } from './chat-list.service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [
        './chat-list.component.scss'
    ],
    providers: [ChatListService]
})
export class ChatListComponent {
    public listArray = Array.from({length: 15}).fill(1);
    constructor(private chatlistSvc: ChatListService) {

    }
}
