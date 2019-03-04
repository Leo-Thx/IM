import { Component } from "@angular/core";
import { ChatMainService } from './chat-main.service';

@Component({
    selector: 'app-main-list',
    templateUrl: './chat-main.component.html',
    styleUrls: [
        './chat-main.component.scss'
    ],
    providers: [ ChatMainService ]
})
export class ChatMainComponent {
    constructor(private chatMainSvc: ChatMainService) {

    }
}
