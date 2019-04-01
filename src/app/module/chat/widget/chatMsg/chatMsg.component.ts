import { Component, Input, Optional, OnChanges, SimpleChanges } from "@angular/core";
import { MsgTypeEnum } from 'src/app/config/app.enum';
import { BaseMsgType } from 'src/app/model/msgType/BaseMsgType';

@Component({
    selector: 'app-chat-msg',
    templateUrl: './chatMsg.component.html',
    styleUrls: [
        './chatMsg.component.scss'
    ]
})
export class ChatMsgComponent <T extends BaseMsgType> implements OnChanges{
    // 类型
    @Input('type') public type: MsgTypeEnum;

    // 具体的数据
    @Input('data') public msgInstance: T & BaseMsgType;

    // 方向：左或右
    @Input('direction') public direction: string;   

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        
    }

    currentMsgClass(){
        return {
            left: this.direction === 'left',
            right: this.direction === 'right'
        }
    }
}
