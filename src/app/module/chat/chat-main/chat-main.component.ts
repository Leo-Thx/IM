import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { ChatMainService } from './chat-main.service';
import { MsgTypeEnum, RightDrawerTypeEnum } from 'src/app/config/app.enum';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as fromGlobal from 'src/app/store/actions/global';
import { IpcService } from 'src/app/share/ipc/Ipc.service';

@Component({
    selector: 'app-chat-main',
    templateUrl: './chat-main.component.html',
    styleUrls: [
        './chat-main.component.scss'
    ],
    providers: [ ChatMainService ]
})
export class ChatMainComponent {
    @Input('chatTo') public chatTo;

    // 消息类型
    public types = [MsgTypeEnum.TEXT, MsgTypeEnum.IMAGE, MsgTypeEnum.FILE];
    constructor(
        private chatMainSvc: ChatMainService, 
        public ipcSvc: IpcService,
        public store: Store<fromRoot.State>) {}

    showRightDrawerInfo(){
        this.store.dispatch(new fromGlobal.ShowRightDrawerAction({
            type: this.chatTo.isGroup ? RightDrawerTypeEnum.GROUP_INFO : RightDrawerTypeEnum.SINGLE_INFO,
            data: this.chatTo
        }));
    }

    // 截图
    shortCut(){
        this.ipcSvc.execShortCut();
    }
}
