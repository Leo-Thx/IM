import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: [
        './chat.component.scss'
    ]
})
export class ChatComponent {
    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private chatSvc: ChatService) {

    }
}
