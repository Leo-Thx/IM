import { Component, OnInit } from "@angular/core";
import { ChatInputService } from './chat-input.service';

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: [
        './chat-input.component.scss'
    ],
    providers: [ ChatInputService ]
})
export class ChatInputComponent implements OnInit {
    constructor( private chatInputSvc: ChatInputService ) {

    }
    ngOnInit() {
        
    }
}
