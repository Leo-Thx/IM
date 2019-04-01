import { Component } from "@angular/core";
import { ChatMainService } from './chat-main.service';
import { MsgTypeEnum } from 'src/app/config/app.enum';

@Component({
    selector: 'app-chat-main',
    templateUrl: './chat-main.component.html',
    styleUrls: [
        './chat-main.component.scss'
    ],
    providers: [ ChatMainService ]
})
export class ChatMainComponent {
    // 消息类型
    public msgTypeEnum: MsgTypeEnum;
    public types = [MsgTypeEnum.TEXT, MsgTypeEnum.EMOJI, MsgTypeEnum.IMAGE, MsgTypeEnum.FILE];

    constructor(private chatMainSvc: ChatMainService) {
        this.msgTypeEnum = MsgTypeEnum.TEXT;
    }
}
