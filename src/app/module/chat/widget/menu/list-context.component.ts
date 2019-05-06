import { Component } from "@angular/core";
import { MatDialog } from '@angular/material';
import { SingleInfoDialog } from '../info/SingleInfoDialog.component';
import { ChatMsgRecordDialog } from '../record/ChatMsgRecordDialog.component';

@Component({
    selector: 'app-chatList-menu',
    template: `<div>
        <ul class="m-0 pl-0">
            <li (click)="showPerson()">查看资料</li>
            <li (click)="showMsgRecord()">消息记录</li>
            <li>发送邮件</li>
            <li>分享名片</li>
            <li>删除会话</li>
        </ul>
    </div>`,
    styleUrls: ['./list-context.scss']
})
export class ChatListContextMenu {
    constructor(
        public dialog: MatDialog){}

    showPerson(){
        const dialogRef = this.dialog.open(SingleInfoDialog, {
            width: '240px',
            hasBackdrop: false,
            panelClass: 'single-info-dialog-panelClass',
            backdropClass: 'single-info-dialog-backdropClass',
            autoFocus: false,
            disableClose: true,
            data: {name: 'data', age: 12}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    showMsgRecord(){
        const dialogRef = this.dialog.open(ChatMsgRecordDialog, {
            width: '560px',
            height: '640px',
            hasBackdrop: false,
            panelClass: 'chat-msg-record-dialog-panelClass',
            backdropClass: 'chat-msg-record-dialog-backdropClass',
            autoFocus: false,
            disableClose: true,
            data: {name: 'data', age: 12}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
