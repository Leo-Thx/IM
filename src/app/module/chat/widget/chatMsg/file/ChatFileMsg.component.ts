import { Component, Input } from "@angular/core";
import { MsgFileType } from 'src/app/model/msgType/FileType';

@Component({
    template: `
    <span class="title block" [ngClass]="dirClass">你的名字</span>
    <div class="content p-1 mt-sm-1" [ngClass]="dirClass">
        文件
    </div>
    `,
    styleUrls: ['./ChatFileMsg.scss']
})
export class ChatFileMsgComponent {
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    @Input() public data: MsgFileType;

    constructor() {}
}
