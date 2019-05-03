import { Component, Input } from "@angular/core";
import { ChatMainService } from './chat-main.service';
import { MsgTypeEnum, RightDrawerTypeEnum } from 'src/app/config/app.enum';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as fromGlobal from 'src/app/store/actions/global';

@Component({
    selector: 'app-chat-main',
    templateUrl: './chat-main.component.html',
    styleUrls: [
        './chat-main.component.scss'
    ],
    providers: [ ChatMainService ]
})
export class ChatMainComponent {
    @Input('chatId') public chatRoomId;

    // 消息类型
    public types = [MsgTypeEnum.TEXT, MsgTypeEnum.IMAGE, MsgTypeEnum.FILE];
    constructor(
        private chatMainSvc: ChatMainService, 
        public store: Store<fromRoot.State>) {}

    showPersonInfo(){
        this.store.dispatch(new fromGlobal.ShowRightDrawerAction({
            type: RightDrawerTypeEnum.SINGLE_INFO
        }));
    }
}
